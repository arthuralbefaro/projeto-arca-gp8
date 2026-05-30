package br.gov.serra.arca.security;

import br.gov.serra.arca.modules.usuarios.Usuario;
import br.gov.serra.arca.modules.usuarios.UsuarioRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HexFormat;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class SecurityAuditService {

    private final AuditEventWriter auditEventWriter;
    private final UsuarioRepository usuarioRepository;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public void publicLookup(String clientIp, String protocolo, String cpf, boolean success) {
        log.info(
                "security_event=public_lookup client_ip={} protocolo_hash={} cpf_hash={} result={}",
                clientIp,
                hashForLog(protocolo),
                hashForLog(cpf),
                success ? "success" : "not_found"
        );
    }

    public void loginAttempt(String clientIp, String userAgent, String email, boolean success) {
        log.info(
                "security_event=login_attempt client_ip={} principal_hash={} result={}",
                clientIp,
                hashForLog(email),
                success ? "success" : "failure"
        );

        UUID actorId = success ? resolveUserId(email) : null;
        persist(
                success ? "LOGIN_SUCCESS" : "LOGIN_FAILURE",
                actorId,
                email,
                null,
                null,
                clientIp,
                userAgent,
                null
        );
    }

    public void logout(String clientIp, String userAgent, String email) {
        log.info("security_event=logout client_ip={} principal_hash={}", clientIp, hashForLog(email));
        persist("LOGOUT", resolveUserId(email), email, null, null, clientIp, userAgent, null);
    }

    public void statusChanged(String clientIp, String userAgent, Usuario actor, UUID solicitacaoId,
                              String statusAnterior, String statusNovo) {
        log.info(
                "security_event=status_changed client_ip={} actor_id={} solicitacao_id={} from={} to={}",
                clientIp,
                actor != null ? actor.getId() : "unknown",
                solicitacaoId,
                statusAnterior,
                statusNovo
        );

        Map<String, Object> metadata = new LinkedHashMap<>();
        metadata.put("from", statusAnterior);
        metadata.put("to", statusNovo);

        persist(
                "STATUS_CHANGED",
                actor != null ? actor.getId() : null,
                actor != null ? actor.getEmail() : null,
                "SOLICITACAO",
                solicitacaoId != null ? solicitacaoId.toString() : null,
                clientIp,
                userAgent,
                metadata
        );
    }

    public void piiView(String clientIp, String userAgent, UUID solicitacaoId) {
        Usuario actor = currentActor();
        log.info(
                "security_event=pii_view client_ip={} actor_id={} solicitacao_id={}",
                clientIp,
                actor != null ? actor.getId() : "unknown",
                solicitacaoId
        );

        persist(
                "PII_VIEW",
                actor != null ? actor.getId() : null,
                actor != null ? actor.getEmail() : null,
                "SOLICITACAO",
                solicitacaoId != null ? solicitacaoId.toString() : null,
                clientIp,
                userAgent,
                null
        );
    }

    public void rateLimitBlocked(String clientIp, String scope) {
        log.warn("security_event=rate_limit_blocked client_ip={} scope={}", clientIp, scope);
    }

    private void persist(String eventType, UUID actorUserId, String actorEmail, String targetType,
                         String targetId, String ipAddress, String userAgent, Map<String, Object> metadata) {
        try {
            AuditEvent event = AuditEvent.builder()
                    .eventType(eventType)
                    .actorUserId(actorUserId)
                    .actorEmail(actorEmail)
                    .targetType(targetType)
                    .targetId(targetId)
                    .ipAddress(ipAddress)
                    .userAgent(truncate(userAgent, 512))
                    .metadata(serializeMetadata(metadata))
                    .build();
            auditEventWriter.write(event);
        } catch (Exception ex) {
            log.warn("Falha ao persistir evento de auditoria event_type={}: {}", eventType, ex.getMessage());
        }
    }

    private UUID resolveUserId(String email) {
        if (email == null || email.isBlank()) {
            return null;
        }
        return usuarioRepository.findByEmail(email).map(Usuario::getId).orElse(null);
    }

    private Usuario currentActor() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getName() == null || !authentication.isAuthenticated()) {
            return null;
        }
        return usuarioRepository.findByEmail(authentication.getName()).orElse(null);
    }

    private String serializeMetadata(Map<String, Object> metadata) {
        if (metadata == null || metadata.isEmpty()) {
            return null;
        }
        try {
            return objectMapper.writeValueAsString(metadata);
        } catch (Exception ex) {
            return null;
        }
    }

    private String truncate(String value, int maxLength) {
        if (value == null || value.length() <= maxLength) {
            return value;
        }
        return value.substring(0, maxLength);
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
