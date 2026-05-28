package br.gov.serra.arca.common.observability;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
@RequiredArgsConstructor
@Slf4j
public class StartupObservabilityLogger {

    private final Environment environment;

    @EventListener(ApplicationReadyEvent.class)
    public void logApplicationReady() {
        String profiles = Arrays.toString(environment.getActiveProfiles());
        String swaggerEnabled = environment.getProperty("springdoc.swagger-ui.enabled", "false");
        String cookieSecure = environment.getProperty("arca.security.cookies.secure", "false");

        log.info(
                "event=application_ready app=arca profiles={} swagger_enabled={} secure_cookies={}",
                profiles,
                swaggerEnabled,
                cookieSecure
        );
    }
}
