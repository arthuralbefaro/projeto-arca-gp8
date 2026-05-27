package br.gov.serra.arca.modules.solicitacoes.dto;

import br.gov.serra.arca.modules.historico.HistoricoStatus;
import br.gov.serra.arca.modules.solicitacoes.*;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Builder
public class SolicitacaoResponseDTO {

    private UUID id;
    private String protocolo;
    private TipoSolicitacao tipo;
    private StatusSolicitacao status;
    private String statusLabel;

    // Tutor
    private String tutorNome;
    private String tutorCpf;
    private String tutorEmail;
    private String tutorTelefone;
    private String tutorCep;
    private String tutorBairro;
    private String tutorEndereco;
    private TipoSolicitante tipoSolicitante;
    private String tutorNis;

    // Animal
    private String animalNome;
    private EspecieAnimal animalEspecie;
    private String animalSexo;
    private String animalPorte;
    private int animalQuantidade;
    private VacinacaoStatus vacinadoRaiva;
    private VacinacaoStatus animalSintomas;
    private boolean situacaoRisco;
    private boolean areaVulneravel;
    private String observacoes;

    // Prioridade
    private int prioridadeScore;
    private String prioridadeLabel;

    // Datas
    private LocalDateTime criadoEm;
    private LocalDateTime atualizadoEm;

    // Histórico
    private List<HistoricoStatusDTO> historico;

    @Data
    @Builder
    public static class HistoricoStatusDTO {
        private UUID id;
        private String status;
        private String nota;
        private LocalDateTime data;

        public static HistoricoStatusDTO from(HistoricoStatus h) {
            return HistoricoStatusDTO.builder()
                    .id(h.getId())
                    .status(h.getStatus())
                    .nota(h.getNota())
                    .data(h.getData())
                    .build();
        }
    }

    public static SolicitacaoResponseDTO from(Solicitacao s, List<HistoricoStatus> historico) {
        return SolicitacaoResponseDTO.builder()
                .id(s.getId())
                .protocolo(s.getProtocolo())
                .tipo(s.getTipo())
                .status(s.getStatus())
                .statusLabel(s.getStatus().getLabel())
                .tutorNome(s.getTutorNome())
                .tutorCpf(s.getTutorCpf())
                .tutorEmail(s.getTutorEmail())
                .tutorTelefone(s.getTutorTelefone())
                .tutorCep(s.getTutorCep())
                .tutorBairro(s.getTutorBairro())
                .tutorEndereco(s.getTutorEndereco())
                .tipoSolicitante(s.getTipoSolicitante())
                .tutorNis(s.getTutorNis())
                .animalNome(s.getAnimalNome())
                .animalEspecie(s.getAnimalEspecie())
                .animalSexo(s.getAnimalSexo())
                .animalPorte(s.getAnimalPorte())
                .animalQuantidade(s.getAnimalQuantidade())
                .vacinadoRaiva(s.getVacinadoRaiva())
                .animalSintomas(s.getAnimalSintomas())
                .situacaoRisco(s.isSituacaoRisco())
                .areaVulneravel(s.isAreaVulneravel())
                .observacoes(s.getObservacoes())
                .prioridadeScore(s.getPrioridadeScore())
                .prioridadeLabel(s.getPrioridadeLabel())
                .criadoEm(s.getCriadoEm())
                .atualizadoEm(s.getAtualizadoEm())
                .historico(historico.stream().map(HistoricoStatusDTO::from).toList())
                .build();
    }
}
