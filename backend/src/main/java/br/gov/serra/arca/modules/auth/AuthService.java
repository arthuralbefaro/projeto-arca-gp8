package br.gov.serra.arca.modules.auth;

import br.gov.serra.arca.common.exception.BusinessException;
import br.gov.serra.arca.modules.auth.dto.AuthResponseDTO;
import br.gov.serra.arca.modules.auth.dto.LoginRequestDTO;
import br.gov.serra.arca.modules.usuarios.Usuario;
import br.gov.serra.arca.modules.usuarios.UsuarioRepository;
import br.gov.serra.arca.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final AuthSessionRepository authSessionRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;
    private final RefreshTokenService refreshTokenService;

    @Value("${arca.jwt.refresh-expiration-ms}")
    private long refreshExpirationMs;

    @Transactional
    public AuthResult login(LoginRequestDTO dto) {
        Usuario usuario = usuarioRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new BusinessException("E-mail ou senha inválidos."));

        if (!usuario.isAtivo()) {
            throw new BusinessException("E-mail ou senha inválidos.");
        }

        if (!passwordEncoder.matches(dto.getSenha(), usuario.getSenhaHash())) {
            throw new BusinessException("E-mail ou senha inválidos.");
        }

        AuthResult result = issueSession(usuario);
        log.info("security_event=login_success user_id={}", usuario.getId());
        return result;
    }

    @Transactional
    public AuthResult refresh(String refreshToken) {
        String refreshHash = refreshTokenService.hash(refreshToken);
        AuthSession session = authSessionRepository.findByRefreshTokenHash(refreshHash)
                .orElseThrow(() -> new BusinessException("Sessão inválida."));

        LocalDateTime now = LocalDateTime.now();
        if (!session.isAtiva(now)) {
            session.setRevogado(true);
            throw new BusinessException("Sessão inválida.");
        }

        String newRefreshToken = refreshTokenService.generate();
        session.setRefreshTokenHash(refreshTokenService.hash(newRefreshToken));
        session.setUltimoUsoEm(now);

        Usuario usuario = session.getUsuario();
        String accessToken = tokenProvider.generateAccessToken(usuario, session.getId());
        String csrfToken = refreshTokenService.generate();

        return buildResult(usuario, accessToken, newRefreshToken, csrfToken);
    }

    @Transactional
    public void revokeByRefreshToken(String refreshToken) {
        if (refreshToken == null || refreshToken.isBlank()) {
            return;
        }

        authSessionRepository.findByRefreshTokenHash(refreshTokenService.hash(refreshToken))
                .ifPresent(session -> session.setRevogado(true));
    }

    @Transactional(readOnly = true)
    public boolean isSessionActive(UUID sessionId) {
        return authSessionRepository.existsByIdAndRevogadoFalseAndExpiraEmAfterAndUsuarioAtivoTrue(sessionId, LocalDateTime.now());
    }

    private AuthResult issueSession(Usuario usuario) {
        String refreshToken = refreshTokenService.generate();
        AuthSession session = AuthSession.builder()
                .usuario(usuario)
                .refreshTokenHash(refreshTokenService.hash(refreshToken))
                .expiraEm(LocalDateTime.now().plus(Duration.ofMillis(refreshExpirationMs)))
                .build();
        session = authSessionRepository.save(session);

        String accessToken = tokenProvider.generateAccessToken(usuario, session.getId());
        String csrfToken = refreshTokenService.generate();
        return buildResult(usuario, accessToken, refreshToken, csrfToken);
    }

    private AuthResult buildResult(Usuario usuario, String accessToken, String refreshToken, String csrfToken) {
        AuthResponseDTO response = AuthResponseDTO.builder()
                .expiresIn(tokenProvider.getAccessTokenDuration().toSeconds())
                .email(usuario.getEmail())
                .role(usuario.getRole().name())
                .build();

        return new AuthResult(
                response,
                accessToken,
                refreshToken,
                csrfToken,
                tokenProvider.getAccessTokenDuration(),
                Duration.ofMillis(refreshExpirationMs)
        );
    }

    public record AuthResult(
            AuthResponseDTO response,
            String accessToken,
            String refreshToken,
            String csrfToken,
            Duration accessMaxAge,
            Duration refreshMaxAge
    ) {
    }
}
