package br.gov.serra.arca.modules.solicitacoes.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AlterarStatusDTO {

    @NotBlank(message = "Status é obrigatório")
    private String status;

    private String nota;
}
