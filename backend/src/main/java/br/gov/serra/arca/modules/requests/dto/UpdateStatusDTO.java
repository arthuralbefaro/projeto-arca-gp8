package br.gov.serra.arca.modules.requests.dto;

import br.gov.serra.arca.modules.requests.RequestStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UpdateStatusDTO(
    @NotNull RequestStatus status,
    @NotBlank String note
) {}
