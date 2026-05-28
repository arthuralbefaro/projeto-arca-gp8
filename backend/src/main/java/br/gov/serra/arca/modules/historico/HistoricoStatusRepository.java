package br.gov.serra.arca.modules.historico;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface HistoricoStatusRepository extends JpaRepository<HistoricoStatus, UUID> {

    List<HistoricoStatus> findBySolicitacaoIdOrderByDataAsc(UUID solicitacaoId);

    List<HistoricoStatus> findBySolicitacaoIdInOrderByDataAsc(List<UUID> solicitacaoIds);
}
