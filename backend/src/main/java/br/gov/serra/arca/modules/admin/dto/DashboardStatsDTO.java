package br.gov.serra.arca.modules.admin.dto;

import lombok.Builder;
import lombok.Data;

import java.util.Map;

@Data
@Builder
public class DashboardStatsDTO {

    private long totalSolicitacoes;
    private long solicitacoesAtivas;
    private long altaPrioridade;
    private Map<String, Long> porStatus;
    private Map<String, Long> porTipo;
    private Map<String, Long> porTipoSolicitante;
}
