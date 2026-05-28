package br.gov.serra.arca.security;

import org.springframework.stereotype.Service;

import java.time.Clock;
import java.time.Duration;
import java.time.Instant;
import java.util.Iterator;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class RateLimitService {

    public static final Policy LOGIN = new Policy(8, Duration.ofMinutes(1), 5, Duration.ofMinutes(10), 250, 2_000);
    public static final Policy PUBLIC_LOOKUP = new Policy(12, Duration.ofMinutes(1), 6, Duration.ofMinutes(15), 300, 2_500);
    public static final Policy ADMIN_MUTATION = new Policy(60, Duration.ofMinutes(1), 20, Duration.ofMinutes(5), 0, 0);

    private final Map<String, AttemptState> attempts = new ConcurrentHashMap<>();
    private final Clock clock;

    public RateLimitService() {
        this(Clock.systemUTC());
    }

    RateLimitService(Clock clock) {
        this.clock = clock;
    }

    public void check(String scope, String key, Policy policy) {
        cleanup();

        String bucketKey = scope + ":" + key;
        Instant now = Instant.now(clock);
        AttemptState state = attempts.computeIfAbsent(bucketKey, ignored -> new AttemptState(now));

        synchronized (state) {
            if (state.lockedUntil != null && now.isBefore(state.lockedUntil)) {
                throw new RateLimitExceededException("Muitas tentativas. Tente novamente mais tarde.");
            }

            if (Duration.between(state.windowStart, now).compareTo(policy.window()) > 0) {
                state.windowStart = now;
                state.requestCount = 0;
            }

            state.requestCount++;
            state.lastSeen = now;

            if (state.requestCount > policy.maxRequests()) {
                state.lockedUntil = now.plus(policy.lockDuration());
                throw new RateLimitExceededException("Muitas tentativas. Tente novamente mais tarde.");
            }
        }
    }

    public void recordFailure(String scope, String key, Policy policy) {
        AttemptState state = attempts.computeIfAbsent(scope + ":" + key, ignored -> new AttemptState(Instant.now(clock)));

        synchronized (state) {
            state.failures++;
            state.lastSeen = Instant.now(clock);

            if (state.failures >= policy.maxFailuresBeforeLock()) {
                state.lockedUntil = state.lastSeen.plus(policy.lockDuration());
            }
        }
    }

    public void recordSuccess(String scope, String key) {
        AttemptState state = attempts.get(scope + ":" + key);
        if (state == null) {
            return;
        }

        synchronized (state) {
            state.failures = 0;
            state.lockedUntil = null;
            state.lastSeen = Instant.now(clock);
        }
    }

    public void applyProgressiveDelay(String scope, String key, Policy policy) {
        AttemptState state = attempts.get(scope + ":" + key);
        if (state == null || policy.delayStepMillis() <= 0) {
            return;
        }

        int failures;
        synchronized (state) {
            failures = state.failures;
        }

        long delayMillis = Math.min((long) failures * policy.delayStepMillis(), policy.maxDelayMillis());
        if (delayMillis <= 0) {
            return;
        }

        try {
            Thread.sleep(delayMillis);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }

    private void cleanup() {
        Instant cutoff = Instant.now(clock).minus(Duration.ofHours(2));
        Iterator<Map.Entry<String, AttemptState>> iterator = attempts.entrySet().iterator();
        while (iterator.hasNext()) {
            Map.Entry<String, AttemptState> entry = iterator.next();
            AttemptState state = entry.getValue();
            if (state.lastSeen.isBefore(cutoff)) {
                iterator.remove();
            }
        }
    }

    public record Policy(
            int maxRequests,
            Duration window,
            int maxFailuresBeforeLock,
            Duration lockDuration,
            int delayStepMillis,
            int maxDelayMillis
    ) {
    }

    private static final class AttemptState {
        private Instant windowStart;
        private Instant lastSeen;
        private int requestCount;
        private int failures;
        private Instant lockedUntil;

        private AttemptState(Instant now) {
            this.windowStart = now;
            this.lastSeen = now;
        }
    }
}
