package br.gov.serra.arca.modules.auth;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class RefreshTokenServiceTest {

    @Test
    void generatesOpaqueRefreshTokensAndStoresOnlyHashes() {
        RefreshTokenService service = new RefreshTokenService();

        String token = service.generate();
        String hash = service.hash(token);

        assertNotEquals(token, hash);
        assertEquals(64, hash.length());
        assertTrue(token.length() >= 60);
        assertEquals(hash, service.hash(token));
    }
}
