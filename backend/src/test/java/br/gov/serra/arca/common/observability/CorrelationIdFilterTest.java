package br.gov.serra.arca.common.observability;

import io.micrometer.core.instrument.simple.SimpleMeterRegistry;
import jakarta.servlet.ServletException;
import org.junit.jupiter.api.Test;
import org.slf4j.MDC;
import org.springframework.mock.web.MockFilterChain;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.*;

class CorrelationIdFilterTest {

    @Test
    void addsCorrelationIdWhenHeaderIsMissing() throws ServletException, IOException {
        CorrelationIdFilter filter = new CorrelationIdFilter(new SimpleMeterRegistry());
        MockHttpServletRequest request = new MockHttpServletRequest("GET", "/api/solicitacoes/consulta");
        MockHttpServletResponse response = new MockHttpServletResponse();

        filter.doFilter(request, response, new MockFilterChain());

        assertNotNull(response.getHeader(CorrelationIdFilter.HEADER_NAME));
        assertNull(MDC.get(CorrelationIdFilter.MDC_KEY));
    }

    @Test
    void preservesSafeCorrelationIdHeader() throws ServletException, IOException {
        CorrelationIdFilter filter = new CorrelationIdFilter(new SimpleMeterRegistry());
        MockHttpServletRequest request = new MockHttpServletRequest("GET", "/api/admin/solicitacoes");
        MockHttpServletResponse response = new MockHttpServletResponse();
        request.addHeader(CorrelationIdFilter.HEADER_NAME, "arca-test-123456");

        filter.doFilter(request, response, new MockFilterChain());

        assertEquals("arca-test-123456", response.getHeader(CorrelationIdFilter.HEADER_NAME));
    }
}
