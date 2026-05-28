package br.gov.serra.arca.modules.solicitacoes.dto;

import br.gov.serra.arca.common.validation.ValidCpf;
import br.gov.serra.arca.modules.solicitacoes.*;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class CriarSolicitacaoDTO {

    @NotNull(message = "Tipo de solicitação é obrigatório")
    private TipoSolicitacao tipo;

    @NotBlank(message = "Nome do tutor é obrigatório")
    @Size(max = 255, message = "Nome não pode ter mais de 255 caracteres")
    private String tutorNome;

    @NotBlank(message = "CPF é obrigatório")
    @ValidCpf
    private String tutorCpf;

    @Email(message = "E-mail inválido")
    @Size(max = 255, message = "E-mail não pode ter mais de 255 caracteres")
    private String tutorEmail;

    @Size(max = 20, message = "Telefone não pode ter mais de 20 caracteres")
    private String tutorTelefone;

    @Size(max = 9, message = "CEP não pode ter mais de 9 caracteres")
    private String tutorCep;

    @Size(max = 100, message = "Bairro não pode ter mais de 100 caracteres")
    private String tutorBairro;

    @Size(max = 500, message = "Endereço não pode ter mais de 500 caracteres")
    private String tutorEndereco;

    @NotNull(message = "Tipo de solicitante é obrigatório")
    private TipoSolicitante tipoSolicitante;

    @Size(max = 20, message = "NIS não pode ter mais de 20 caracteres")
    private String tutorNis;

    @Size(max = 100, message = "Nome do animal não pode ter mais de 100 caracteres")
    private String animalNome;

    private EspecieAnimal animalEspecie;

    @Size(max = 30, message = "Sexo do animal não pode ter mais de 30 caracteres")
    private String animalSexo;

    @Size(max = 20, message = "Porte do animal não pode ter mais de 20 caracteres")
    private String animalPorte;

    @Min(value = 1, message = "Quantidade de animais deve ser no mínimo 1")
    @Max(value = 100, message = "Quantidade de animais não pode ultrapassar 100")
    private int animalQuantidade = 1;

    private VacinacaoStatus vacinadoRaiva;

    private VacinacaoStatus animalSintomas;

    private boolean situacaoRisco = false;

    private boolean areaVulneravel = false;

    @Size(max = 2000, message = "Observações não podem ter mais de 2000 caracteres")
    private String observacoes;
}
