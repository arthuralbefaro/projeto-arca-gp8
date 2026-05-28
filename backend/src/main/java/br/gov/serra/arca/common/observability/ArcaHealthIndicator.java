package br.gov.serra.arca.common.observability;

import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.HealthIndicator;
import org.springframework.stereotype.Component;

import java.time.OffsetDateTime;

@Component("arca")
public class ArcaHealthIndicator implements HealthIndicator {

    @Override
    public Health health() {
        return Health.up()
                .withDetail("service", "Programa ARCA")
                .withDetail("readiness", "accepting_requests")
                .withDetail("checkedAt", OffsetDateTime.now().toString())
                .build();
    }
}
