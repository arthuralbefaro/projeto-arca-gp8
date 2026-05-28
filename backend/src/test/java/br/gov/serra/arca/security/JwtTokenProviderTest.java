package br.gov.serra.arca.security;

import br.gov.serra.arca.modules.usuarios.RoleUsuario;
import br.gov.serra.arca.modules.usuarios.Usuario;
import org.junit.jupiter.api.Test;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

class JwtTokenProviderTest {

    @Test
    void rejectsMissingOrWeakSecrets() {
        assertThrows(IllegalStateException.class, () ->
                new JwtTokenProvider("", 900000, "arca-api", "arca-admin", 60));

        assertThrows(IllegalStateException.class, () ->
                new JwtTokenProvider("short-secret", 900000, "arca-api", "arca-admin", 60));
    }

    @Test
    void generatesTokenWithSessionClaims() {
        JwtTokenProvider provider = new JwtTokenProvider(
                "this-secret-has-more-than-32-bytes-for-tests",
                900000,
                "arca-api",
                "arca-admin",
                60
        );
        UUID sessionId = UUID.randomUUID();
        Usuario usuario = Usuario.builder()
                .email("admin.demo@arca.local")
                .role(RoleUsuario.ADMIN)
                .ativo(true)
                .build();

        String token = provider.generateAccessToken(usuario, sessionId);

        assertTrue(provider.validateToken(token));
        assertEquals("admin.demo@arca.local", provider.getEmailFromToken(token));
        assertEquals(sessionId, provider.getSessionIdFromToken(token));
    }
}
