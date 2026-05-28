package br.gov.serra.arca.modules.auth.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AuthResponseDTO {

    private String token;
    private String tokenType;
    private long expiresIn;
    private String email;
    private String role;
}
