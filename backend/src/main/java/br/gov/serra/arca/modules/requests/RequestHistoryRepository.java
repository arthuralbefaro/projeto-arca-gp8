package br.gov.serra.arca.modules.requests;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface RequestHistoryRepository extends JpaRepository<RequestHistory, UUID> {
}
