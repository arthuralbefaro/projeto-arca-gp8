package br.gov.serra.arca.modules.auth;

import br.gov.serra.arca.common.dto.ApiResponseDTO;
import br.gov.serra.arca.common.exception.BusinessException;
import br.gov.serra.arca.modules.auth.dto.AuthResponseDTO;
import br.gov.serra.arca.modules.auth.dto.LoginRequestDTO;
import br.gov.serra.arca.security.ClientIpResolver;
import br.gov.serra.arca.security.RateLimitExceededException;
import br.gov.serra.arca.security.RateLimitService;
import br.gov.serra.arca.security.SecurityAuditService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Tag(name = "Autenticação", description = "Endpoints de autenticação para o painel administrativo")
public class AuthController {

    private final AuthService authService;
    private final AuthCookieService authCookieService;
    private final RateLimitService rateLimitService;
    private final ClientIpResolver clientIpResolver;
    private final SecurityAuditService securityAuditService;

    @PostMapping("/login")
    @Operation(
            summary = "Fazer login",
            description = "Autentica um usuário administrador e grava cookies HttpOnly seguros."
    )
    public ResponseEntity<ApiResponseDTO<AuthResponseDTO>> login(
            @Valid @RequestBody LoginRequestDTO dto,
            HttpServletRequest request) {
        String clientIp = clientIpResolver.resolve(request);
        String scope = "login";

        try {
            rateLimitService.check(scope, clientIp, RateLimitService.LOGIN);
            AuthService.AuthResult result = authService.login(dto);
            rateLimitService.recordSuccess(scope, clientIp);
            securityAuditService.loginAttempt(clientIp, dto.getEmail(), true);

            HttpHeaders headers = new HttpHeaders();
            authCookieService.addAuthCookies(
                    headers,
                    result.accessToken(),
                    result.refreshToken(),
                    result.csrfToken(),
                    result.accessMaxAge(),
                    result.refreshMaxAge()
            );

            return ResponseEntity.ok()
                    .headers(headers)
                    .body(ApiResponseDTO.ok(result.response(), "Login realizado com sucesso."));
        } catch (RateLimitExceededException ex) {
            securityAuditService.rateLimitBlocked(clientIp, scope);
            throw ex;
        } catch (BusinessException ex) {
            rateLimitService.recordFailure(scope, clientIp, RateLimitService.LOGIN);
            rateLimitService.applyProgressiveDelay(scope, clientIp, RateLimitService.LOGIN);
            securityAuditService.loginAttempt(clientIp, dto.getEmail(), false);
            throw new BadCredentialsException("Credenciais inválidas.");
        }
    }

    @PostMapping("/refresh")
    @Operation(summary = "Renovar sessão")
    public ResponseEntity<ApiResponseDTO<AuthResponseDTO>> refresh(HttpServletRequest request) {
        String refreshToken = authCookieService.getCookie(request, AuthCookieService.REFRESH_COOKIE);
        if (refreshToken == null) {
            throw new BadCredentialsException("Sessão inválida.");
        }

        AuthService.AuthResult result;
        try {
            result = authService.refresh(refreshToken);
        } catch (BusinessException ex) {
            throw new BadCredentialsException("Sessão inválida.");
        }
        HttpHeaders headers = new HttpHeaders();
        authCookieService.addAuthCookies(
                headers,
                result.accessToken(),
                result.refreshToken(),
                result.csrfToken(),
                result.accessMaxAge(),
                result.refreshMaxAge()
        );

        return ResponseEntity.ok()
                .headers(headers)
                .body(ApiResponseDTO.ok(result.response(), "Sessão renovada."));
    }

    @PostMapping("/logout")
    @Operation(summary = "Sair do painel administrativo")
    public ResponseEntity<ApiResponseDTO<Map<String, Boolean>>> logout(HttpServletRequest request) {
        String refreshToken = authCookieService.getCookie(request, AuthCookieService.REFRESH_COOKIE);
        authService.revokeByRefreshToken(refreshToken);

        HttpHeaders headers = new HttpHeaders();
        authCookieService.clearAuthCookies(headers);

        return ResponseEntity.ok()
                .headers(headers)
                .body(ApiResponseDTO.ok(Map.of("logout", true), "Sessão encerrada."));
    }

    @GetMapping("/me")
    @Operation(summary = "Obter usuário autenticado")
    public ResponseEntity<ApiResponseDTO<AuthResponseDTO>> me(Authentication authentication) {
        AuthResponseDTO response = AuthResponseDTO.builder()
                .email(authentication.getName())
                .role(authentication.getAuthorities().stream()
                        .findFirst()
                        .map(authority -> authority.getAuthority().replace("ROLE_", ""))
                        .orElse("ADMIN"))
                .build();
        return ResponseEntity.ok(ApiResponseDTO.ok(response));
    }
}
