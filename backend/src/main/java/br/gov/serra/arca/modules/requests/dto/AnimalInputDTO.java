package br.gov.serra.arca.modules.requests.dto;

import br.gov.serra.arca.modules.animals.AnimalSex;
import br.gov.serra.arca.modules.animals.AnimalSpecies;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record AnimalInputDTO(
    @NotBlank String name,
    @NotNull AnimalSpecies species,
    @NotNull AnimalSex sex,
    @Min(1) int quantity,
    Boolean vaccinated,
    boolean riskSituation
) {}
