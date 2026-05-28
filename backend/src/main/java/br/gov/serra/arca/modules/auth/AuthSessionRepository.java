package br.gov.serra.arca.modules.auth;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface AuthSessionRepository extends JpaRepository<AuthSession, UUID> {

    Optional<AuthSession> findByRefreshTokenHash(String refreshTokenHash);

    boolean existsByIdAndRevogadoFalseAndExpiraEmAfterAndUsuarioAtivoTrue(UUID id, LocalDateTime now);
}
