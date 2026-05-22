package br.gov.serra.arca.modules.requests.dto;

import br.gov.serra.arca.modules.requests.RequestType;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreateRequestDTO(
    @NotNull @Valid TutorInputDTO tutor,
    @Valid AnimalInputDTO animal,
    @NotNull RequestType type,
    @NotBlank String service,
    String notes
) {}
