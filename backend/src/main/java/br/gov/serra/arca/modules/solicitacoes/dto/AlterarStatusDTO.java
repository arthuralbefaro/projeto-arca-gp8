package br.gov.serra.arca.modules.solicitacoes.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class AlterarStatusDTO {

    @NotBlank(message = "Status é obrigatório")
    @Pattern(regexp = "^(RECEBIDO|TRIAGEM|PENDENTE|APROVADO|AGENDAMENTO|CONCLUIDO|RECUSADO)$",
            message = "Status inválido")
    private String status;

    @Size(max = 500, message = "Nota não pode ter mais de 500 caracteres")
    private String nota;
}
