package br.gov.serra.arca.modules.solicitacoes.dto;

import br.gov.serra.arca.common.validation.ValidCpf;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ConsultaSolicitacaoRequestDTO {

    @NotBlank(message = "Dados de consulta inválidos.")
    @Size(max = 30, message = "Dados de consulta inválidos.")
    @Pattern(regexp = "^ARCA-[0-9]{4}-[0-9]{6}$", message = "Dados de consulta inválidos.")
    private String protocolo;

    @NotBlank(message = "Dados de consulta inválidos.")
    @ValidCpf(message = "Dados de consulta inválidos.")
    private String cpf;
}
