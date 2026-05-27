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
public class ConsultaResponseDTO {

    private UUID id;
    private String protocolo;
    private TipoSolicitacao tipo;
    private StatusSolicitacao status;
    private String statusLabel;
    private String statusDescricao;

    // Tutor (sem dados sensíveis completos)
    private String tutorNome;
    private String tutorCpfMascarado;
    private String tutorBairro;

    // Animal
    private String animalNome;
    private EspecieAnimal animalEspecie;
    private int animalQuantidade;

    // Prioridade
    private String prioridadeLabel;

    // Datas
    private LocalDateTime criadoEm;
    private LocalDateTime atualizadoEm;

    // Histórico simplificado
    private List<HistoricoSimplificadoDTO> historico;

    @Data
    @Builder
    public static class HistoricoSimplificadoDTO {
        private String status;
        private String nota;
        private LocalDateTime data;

        public static HistoricoSimplificadoDTO from(HistoricoStatus h) {
            return HistoricoSimplificadoDTO.builder()
                    .status(h.getStatus())
                    .nota(h.getNota())
                    .data(h.getData())
                    .build();
        }
    }

    public static ConsultaResponseDTO from(Solicitacao s, List<HistoricoStatus> historico) {
        return ConsultaResponseDTO.builder()
                .id(s.getId())
                .protocolo(s.getProtocolo())
                .tipo(s.getTipo())
                .status(s.getStatus())
                .statusLabel(s.getStatus().getLabel())
                .statusDescricao(s.getStatus().getDescricao())
                .tutorNome(s.getTutorNome())
                .tutorCpfMascarado(mascarCpf(s.getTutorCpf()))
                .tutorBairro(s.getTutorBairro())
                .animalNome(s.getAnimalNome())
                .animalEspecie(s.getAnimalEspecie())
                .animalQuantidade(s.getAnimalQuantidade())
                .prioridadeLabel(s.getPrioridadeLabel())
                .criadoEm(s.getCriadoEm())
                .atualizadoEm(s.getAtualizadoEm())
                .historico(historico.stream().map(HistoricoSimplificadoDTO::from).toList())
                .build();
    }

    /**
     * Mascara o CPF exibindo apenas os últimos 3 dígitos antes do verificador
     * e os 2 dígitos verificadores.
     * Exemplo: 12345678901 -> ***.***.*789-01 -> ***.***.*89-01 (formato: ***.***.XXX-XX)
     * Exibe os dígitos nas posições 6, 7, 8 (índices 6-8) e os verificadores (9-10).
     */
    private static String mascarCpf(String cpf) {
        if (cpf == null || cpf.length() < 11) {
            return "***.***.***-**";
        }
        // cpf já está armazenado como só dígitos (11 chars)
        String d = cpf.replaceAll("[^0-9]", "");
        if (d.length() < 11) {
            return "***.***.***-**";
        }
        // Formato: ***.***.XXX-XX onde X são os últimos 5 dígitos
        String penultimos = d.substring(6, 9);
        String verificadores = d.substring(9, 11);
        return "***.***."+penultimos+"-"+verificadores;
    }
}
