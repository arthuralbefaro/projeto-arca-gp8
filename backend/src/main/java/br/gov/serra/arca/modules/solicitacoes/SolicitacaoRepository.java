package br.gov.serra.arca.modules.solicitacoes;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface SolicitacaoRepository extends JpaRepository<Solicitacao, UUID> {

    Optional<Solicitacao> findByProtocolo(String protocolo);

    boolean existsByProtocolo(String protocolo);

    List<Solicitacao> findByTutorCpf(String tutorCpf);

    @Query("SELECT s FROM Solicitacao s WHERE LOWER(s.tutorEmail) = LOWER(:email)")
    List<Solicitacao> findByTutorEmailIgnoreCase(@Param("email") String email);

    @Query("SELECT s FROM Solicitacao s WHERE LOWER(s.tutorNome) LIKE LOWER(CONCAT('%', :nome, '%'))")
    List<Solicitacao> findByTutorNomeContainingIgnoreCase(@Param("nome") String nome);

    @Query("SELECT s FROM Solicitacao s WHERE LOWER(s.tutorBairro) LIKE LOWER(CONCAT('%', :bairro, '%'))")
    List<Solicitacao> findByTutorBairroContainingIgnoreCase(@Param("bairro") String bairro);

    @Query(value = """
            SELECT * FROM solicitacoes s
            WHERE (:status IS NULL OR s.status = :status)
              AND (:bairro IS NULL OR LOWER(s.tutor_bairro) LIKE LOWER(CONCAT('%', :bairro, '%')))
              AND (:tipoSolicitante IS NULL OR s.tipo_solicitante = :tipoSolicitante)
            ORDER BY s.prioridade_score DESC, s.criado_em ASC
            """,
            countQuery = """
            SELECT COUNT(*) FROM solicitacoes s
            WHERE (:status IS NULL OR s.status = :status)
              AND (:bairro IS NULL OR LOWER(s.tutor_bairro) LIKE LOWER(CONCAT('%', :bairro, '%')))
              AND (:tipoSolicitante IS NULL OR s.tipo_solicitante = :tipoSolicitante)
            """,
            nativeQuery = true)
    Page<Solicitacao> findByFiltros(
            @Param("status") String status,
            @Param("bairro") String bairro,
            @Param("tipoSolicitante") String tipoSolicitante,
            Pageable pageable);

    long countByStatus(StatusSolicitacao status);

    @Query("SELECT COUNT(s) FROM Solicitacao s WHERE s.status NOT IN :statusExcluidos")
    long countAtivas(@Param("statusExcluidos") List<StatusSolicitacao> statusExcluidos);

    @Query("SELECT COUNT(s) FROM Solicitacao s WHERE s.prioridadeLabel = 'Alta'")
    long countAltaPrioridade();

    @Query("SELECT s.tipo, COUNT(s) FROM Solicitacao s GROUP BY s.tipo")
    List<Object[]> countGroupByTipo();

    @Query("SELECT s.tipoSolicitante, COUNT(s) FROM Solicitacao s GROUP BY s.tipoSolicitante")
    List<Object[]> countGroupByTipoSolicitante();
}
