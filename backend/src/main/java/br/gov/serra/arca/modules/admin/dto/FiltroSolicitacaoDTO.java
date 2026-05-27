package br.gov.serra.arca.modules.admin.dto;

import lombok.Data;

@Data
public class FiltroSolicitacaoDTO {

    private String status;
    private String bairro;
    private String tipoSolicitante;
    private int page = 0;
    private int size = 20;
    private String sort = "prioridadeScore,desc";
}
