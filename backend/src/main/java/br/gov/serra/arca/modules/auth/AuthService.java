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

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;

    @Value("${arca.jwt.expiration-ms}")
    private long expirationMs;

    @Transactional(readOnly = true)
    public AuthResponseDTO login(LoginRequestDTO dto) {
        Usuario usuario = usuarioRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new BusinessException("E-mail ou senha inválidos."));

        if (!usuario.isAtivo()) {
            throw new BusinessException("Conta de usuário inativa. Entre em contato com o administrador.");
        }

        if (!passwordEncoder.matches(dto.getSenha(), usuario.getSenhaHash())) {
            throw new BusinessException("E-mail ou senha inválidos.");
        }

        String token = tokenProvider.generateToken(usuario.getEmail(), usuario.getRole().name());
        log.info("Login bem-sucedido para: {}", usuario.getEmail());

        return AuthResponseDTO.builder()
                .token(token)
                .tokenType("Bearer")
                .expiresIn(expirationMs / 1000)
                .email(usuario.getEmail())
                .role(usuario.getRole().name())
                .build();
    }
}
