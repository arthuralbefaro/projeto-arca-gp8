package br.gov.serra.arca.common.util;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class PiiMaskerTest {

    @Test
    void maskTelefoneKeepsOnlyLastTwoDigits() {
        assertEquals("(**) ****-**99", PiiMasker.maskTelefone("(27) 99900-0099"));
    }

    @Test
    void maskTelefoneHandlesNullAndShortValues() {
        assertNull(PiiMasker.maskTelefone(null));
        assertEquals("****", PiiMasker.maskTelefone("12"));
    }
}
