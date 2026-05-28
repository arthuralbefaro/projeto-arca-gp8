package br.gov.serra.arca.security;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HexFormat;

@Service
@Slf4j
public class SecurityAuditService {

    public void publicLookup(String clientIp, String protocolo, String cpf, boolean success) {
        log.info(
                "security_event=public_lookup client_ip={} protocolo_hash={} cpf_hash={} result={}",
                clientIp,
                hashForLog(protocolo),
                hashForLog(cpf),
                success ? "success" : "not_found"
        );
    }

    public void loginAttempt(String clientIp, String email, boolean success) {
        log.info(
                "security_event=login_attempt client_ip={} principal_hash={} result={}",
                clientIp,
                hashForLog(email),
                success ? "success" : "failure"
        );
    }

    public void rateLimitBlocked(String clientIp, String scope) {
        log.warn("security_event=rate_limit_blocked client_ip={} scope={}", clientIp, scope);
    }

    private String hashForLog(String value) {
        if (value == null || value.isBlank()) {
            return "blank";
        }

        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(value.trim().toLowerCase().getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(hash).substring(0, 16);
        } catch (NoSuchAlgorithmException e) {
            return "hash_unavailable";
        }
    }
}
