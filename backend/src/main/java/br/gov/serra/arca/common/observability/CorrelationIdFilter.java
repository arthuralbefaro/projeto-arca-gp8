package br.gov.serra.arca.common.observability;

import io.micrometer.core.instrument.MeterRegistry;
import io.micrometer.core.instrument.Timer;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.MDC;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Duration;
import java.util.UUID;
import java.util.regex.Pattern;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
@RequiredArgsConstructor
@Slf4j
public class CorrelationIdFilter extends OncePerRequestFilter {

    public static final String HEADER_NAME = "X-Correlation-ID";
    public static final String MDC_KEY = "correlationId";

    private static final Pattern SAFE_CORRELATION_ID = Pattern.compile("^[a-zA-Z0-9_.:-]{8,80}$");
    private static final Pattern UUID_SEGMENT = Pattern.compile(
            "/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}"
    );
    private static final Pattern NUMERIC_SEGMENT = Pattern.compile("/\\d+");

    private final MeterRegistry meterRegistry;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {
        String correlationId = resolveCorrelationId(request);
        long start = System.nanoTime();

        MDC.put(MDC_KEY, correlationId);
        response.setHeader(HEADER_NAME, correlationId);

        try {
            filterChain.doFilter(request, response);
        } finally {
            long durationNanos = System.nanoTime() - start;
            String uri = sanitizeUri(request.getRequestURI());
            String status = String.valueOf(response.getStatus());

            Timer.builder("arca.http.requests")
                    .description("HTTP requests handled by ARCA")
                    .tag("method", request.getMethod())
                    .tag("uri", uri)
                    .tag("status", status)
                    .register(meterRegistry)
                    .record(Duration.ofNanos(durationNanos));

            log.info(
                    "event=http_request method={} uri={} status={} duration_ms={} correlation_id={}",
                    request.getMethod(),
                    uri,
                    status,
                    durationNanos / 1_000_000,
                    correlationId
            );

            MDC.remove(MDC_KEY);
        }
    }

    private String resolveCorrelationId(HttpServletRequest request) {
        String headerValue = request.getHeader(HEADER_NAME);
        if (headerValue != null && SAFE_CORRELATION_ID.matcher(headerValue).matches()) {
            return headerValue;
        }
        return UUID.randomUUID().toString();
    }

    private String sanitizeUri(String uri) {
        if (uri == null || uri.isBlank()) {
            return "unknown";
        }

        return NUMERIC_SEGMENT
                .matcher(UUID_SEGMENT.matcher(uri).replaceAll("/{uuid}"))
                .replaceAll("/{id}");
    }
}
