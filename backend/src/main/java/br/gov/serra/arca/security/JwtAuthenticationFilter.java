package br.gov.serra.arca.security;

import br.gov.serra.arca.modules.auth.AuthCookieService;
import br.gov.serra.arca.modules.auth.AuthSessionRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.UUID;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final AntPathMatcher PATH_MATCHER = new AntPathMatcher();

    private final JwtTokenProvider tokenProvider;
    private final UserDetailsServiceImpl userDetailsService;
    private final AuthCookieService authCookieService;
    private final AuthSessionRepository authSessionRepository;

    @Override
    protected boolean shouldNotFilter(@NonNull HttpServletRequest request) {
        String path = request.getServletPath();
        String method = request.getMethod();

        if ("OPTIONS".equalsIgnoreCase(method)) {
            return true;
        }

        if ("POST".equalsIgnoreCase(method) && PATH_MATCHER.match("/api/auth/login", path)) {
            return true;
        }

        if ("POST".equalsIgnoreCase(method) && PATH_MATCHER.match("/api/auth/refresh", path)) {
            return true;
        }

        if ("POST".equalsIgnoreCase(method) && PATH_MATCHER.match("/api/auth/logout", path)) {
            return true;
        }

        if ("POST".equalsIgnoreCase(method) && PATH_MATCHER.match("/api/solicitacoes", path)) {
            return true;
        }

        if (PATH_MATCHER.match("/api/solicitacoes/consulta", path)) {
            return true;
        }

        return PATH_MATCHER.match("/api/health", path)
                || PATH_MATCHER.match("/actuator/health/**", path)
                || PATH_MATCHER.match("/swagger-ui/**", path)
                || PATH_MATCHER.match("/swagger-ui.html", path)
                || PATH_MATCHER.match("/api-docs/**", path);
    }

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain) throws ServletException, IOException {
        try {
            String jwt = extractJwtFromRequest(request);

            if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) {
                UUID sessionId = tokenProvider.getSessionIdFromToken(jwt);
                if (authSessionRepository.existsByIdAndRevogadoFalseAndExpiraEmAfterAndUsuarioAtivoTrue(sessionId, LocalDateTime.now())) {
                    String email = tokenProvider.getEmailFromToken(jwt);
                    UserDetails userDetails = userDetailsService.loadUserByUsername(email);

                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            }
        } catch (Exception ex) {
            log.warn("Não foi possível definir autenticação de usuário: {}", ex.getMessage());
        }

        filterChain.doFilter(request, response);
    }

    private String extractJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }

        return authCookieService.getCookie(request, AuthCookieService.ACCESS_COOKIE);
    }
}
