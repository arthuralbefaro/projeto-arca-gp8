package br.gov.serra.arca.modules.requests.dto;

import br.gov.serra.arca.common.validation.ValidCpf;
import br.gov.serra.arca.modules.tutors.RequesterType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record TutorInputDTO(
    @NotBlank String name,
    @NotBlank @ValidCpf String cpf,
    String email,
    @NotBlank String phone,
    String cep,
    @NotBlank String bairro,
    String address,
    @NotNull RequesterType requesterType,
    boolean vulnerableArea
) {}
