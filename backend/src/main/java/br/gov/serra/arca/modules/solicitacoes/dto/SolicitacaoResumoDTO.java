package br.gov.serra.arca.modules.solicitacoes.dto;

import br.gov.serra.arca.common.util.PiiMasker;
import br.gov.serra.arca.modules.solicitacoes.Solicitacao;
import br.gov.serra.arca.modules.solicitacoes.StatusSolicitacao;
import br.gov.serra.arca.modules.solicitacoes.TipoSolicitacao;
import br.gov.serra.arca.modules.solicitacoes.TipoSolicitante;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
public class SolicitacaoResumoDTO {

    private UUID id;
    private String protocolo;
    private TipoSolicitacao tipo;
    private StatusSolicitacao status;
    private String statusLabel;
    private String tutorNome;
    private String tutorTelefone;
    private String tutorBairro;
    private TipoSolicitante tipoSolicitante;
    private String prioridadeLabel;
    private int prioridadeScore;
    private LocalDateTime criadoEm;

    public static SolicitacaoResumoDTO from(Solicitacao s) {
        return SolicitacaoResumoDTO.builder()
                .id(s.getId())
                .protocolo(s.getProtocolo())
                .tipo(s.getTipo())
                .status(s.getStatus())
                .statusLabel(s.getStatus().getLabel())
                .tutorNome(s.getTutorNome())
                .tutorTelefone(PiiMasker.maskTelefone(s.getTutorTelefone()))
                .tutorBairro(s.getTutorBairro())
                .tipoSolicitante(s.getTipoSolicitante())
                .prioridadeLabel(s.getPrioridadeLabel())
                .prioridadeScore(s.getPrioridadeScore())
                .criadoEm(s.getCriadoEm())
                .build();
    }
}
