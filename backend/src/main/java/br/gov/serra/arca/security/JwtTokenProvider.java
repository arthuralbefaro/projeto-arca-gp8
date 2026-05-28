package br.gov.serra.arca.security;

import br.gov.serra.arca.modules.usuarios.Usuario;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.Date;
import java.util.UUID;

@Component
@Slf4j
public class JwtTokenProvider {

    private final SecretKey secretKey;
    private final long expirationMs;
    private final String issuer;
    private final String audience;
    private final long clockSkewSeconds;

    public JwtTokenProvider(
            @Value("${arca.jwt.secret}") String secret,
            @Value("${arca.jwt.expiration-ms}") long expirationMs,
            @Value("${arca.jwt.issuer}") String issuer,
            @Value("${arca.jwt.audience}") String audience,
            @Value("${arca.jwt.clock-skew-seconds}") long clockSkewSeconds) {
        if (!StringUtils.hasText(secret)) {
            throw new IllegalStateException("JWT_SECRET é obrigatório e não pode ficar vazio.");
        }

        byte[] keyBytes = secret.getBytes(StandardCharsets.UTF_8);
        if (keyBytes.length < 32) {
            throw new IllegalStateException("JWT_SECRET precisa ter pelo menos 32 bytes para HS256.");
        }

        this.secretKey = Keys.hmacShaKeyFor(keyBytes);
        this.expirationMs = expirationMs;
        this.issuer = issuer;
        this.audience = audience;
        this.clockSkewSeconds = clockSkewSeconds;
    }

    public String generateAccessToken(Usuario usuario, UUID sessionId) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + expirationMs);

        return Jwts.builder()
                .id(UUID.randomUUID().toString())
                .issuer(issuer)
                .audience().add(audience).and()
                .subject(usuario.getEmail())
                .claim("role", usuario.getRole().name())
                .claim("sid", sessionId.toString())
                .issuedAt(now)
                .expiration(expiryDate)
                .signWith(secretKey)
                .compact();
    }

    public String getEmailFromToken(String token) {
        return parseClaims(token).getSubject();
    }

    public UUID getSessionIdFromToken(String token) {
        String sessionId = parseClaims(token).get("sid", String.class);
        return UUID.fromString(sessionId);
    }

    public Duration getAccessTokenDuration() {
        return Duration.ofMillis(expirationMs);
    }

    public boolean validateToken(String token) {
        try {
            Claims claims = parseClaims(token);
            validateRegisteredClaims(claims);
            return true;
        } catch (ExpiredJwtException e) {
            log.warn("JWT token expirado: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            log.warn("JWT token não suportado: {}", e.getMessage());
        } catch (MalformedJwtException e) {
            log.warn("JWT token malformado: {}", e.getMessage());
        } catch (SecurityException e) {
            log.warn("JWT token com assinatura inválida: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            log.warn("JWT inválido: {}", e.getMessage());
        }
        return false;
    }

    private Claims parseClaims(String token) {
        return Jwts.parser()
                .verifyWith(secretKey)
                .clockSkewSeconds(clockSkewSeconds)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    private void validateRegisteredClaims(Claims claims) {
        if (!issuer.equals(claims.getIssuer())) {
            throw new IllegalArgumentException("Issuer inválido.");
        }

        if (claims.getAudience() == null || !claims.getAudience().contains(audience)) {
            throw new IllegalArgumentException("Audience inválida.");
        }

        if (!StringUtils.hasText(claims.getId())) {
            throw new IllegalArgumentException("JTI ausente.");
        }

        if (!StringUtils.hasText(claims.get("sid", String.class))) {
            throw new IllegalArgumentException("Sessão ausente.");
        }
    }
}
