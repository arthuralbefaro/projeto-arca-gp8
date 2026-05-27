package br.gov.serra.arca.common;

import br.gov.serra.arca.common.dto.ApiResponseDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/health")
@Tag(name = "Health", description = "Endpoint de verificação de saúde da API")
public class HealthController {

    @GetMapping
    @Operation(summary = "Verificar saúde da API", description = "Retorna o status de funcionamento da API.")
    public ResponseEntity<ApiResponseDTO<Map<String, String>>> health() {
        return ResponseEntity.ok(ApiResponseDTO.ok(
                Map.of("status", "UP", "servico", "ARCA API", "versao", "1.0.0"),
                "API funcionando normalmente."
        ));
    }
}
