package br.gov.serra.arca.security;

import org.junit.jupiter.api.Test;

import java.time.Clock;
import java.time.Instant;
import java.time.ZoneOffset;
import java.util.concurrent.atomic.AtomicReference;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;

class RateLimitServiceTest {

    @Test
    void blocksWhenRequestLimitIsExceeded() {
        MutableClock clock = new MutableClock();
        RateLimitService service = new RateLimitService(clock);
        RateLimitService.Policy policy = new RateLimitService.Policy(
                2,
                java.time.Duration.ofMinutes(1),
                10,
                java.time.Duration.ofMinutes(5),
                0,
                0
        );

        assertDoesNotThrow(() -> service.check("login", "127.0.0.1", policy));
        assertDoesNotThrow(() -> service.check("login", "127.0.0.1", policy));
        assertThrows(RateLimitExceededException.class, () -> service.check("login", "127.0.0.1", policy));
    }

    @Test
    void resetsFailureStateAfterSuccess() {
        MutableClock clock = new MutableClock();
        RateLimitService service = new RateLimitService(clock);
        RateLimitService.Policy policy = new RateLimitService.Policy(
                10,
                java.time.Duration.ofMinutes(1),
                2,
                java.time.Duration.ofMinutes(5),
                0,
                0
        );

        service.recordFailure("public", "127.0.0.1", policy);
        service.recordSuccess("public", "127.0.0.1");

        assertDoesNotThrow(() -> service.check("public", "127.0.0.1", policy));
    }

    private static final class MutableClock extends Clock {
        private final AtomicReference<Instant> instant = new AtomicReference<>(Instant.parse("2026-01-01T00:00:00Z"));

        @Override
        public ZoneOffset getZone() {
            return ZoneOffset.UTC;
        }

        @Override
        public Clock withZone(java.time.ZoneId zone) {
            return this;
        }

        @Override
        public Instant instant() {
            return instant.get();
        }
    }
}
