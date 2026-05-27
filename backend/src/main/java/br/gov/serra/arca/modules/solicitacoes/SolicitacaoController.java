package br.gov.serra.arca.modules.solicitacoes;

import br.gov.serra.arca.common.dto.ApiResponseDTO;
import br.gov.serra.arca.modules.solicitacoes.dto.ConsultaResponseDTO;
import br.gov.serra.arca.modules.solicitacoes.dto.CriarSolicitacaoDTO;
import br.gov.serra.arca.modules.solicitacoes.dto.SolicitacaoResponseDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/solicitacoes")
@RequiredArgsConstructor
@Tag(name = "Solicitações Públicas", description = "Endpoints públicos para criação e consulta de solicitações")
public class SolicitacaoController {

    private final SolicitacaoService solicitacaoService;

    @PostMapping
    @Operation(
            summary = "Criar nova solicitação",
            description = "Registra uma nova solicitação de serviço veterinário. Retorna o protocolo de acompanhamento."
    )
    public ResponseEntity<ApiResponseDTO<SolicitacaoResponseDTO>> criarSolicitacao(
            @Valid @RequestBody CriarSolicitacaoDTO dto) {
        SolicitacaoResponseDTO response = solicitacaoService.criarSolicitacao(dto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponseDTO.ok(response, "Solicitação registrada com sucesso! Protocolo: " + response.getProtocolo()));
    }

    @GetMapping("/consulta")
    @Operation(
            summary = "Consultar solicitações",
            description = "Consulta solicitações por protocolo, CPF, e-mail, nome ou bairro do tutor."
    )
    public ResponseEntity<ApiResponseDTO<List<ConsultaResponseDTO>>> consultar(
            @Parameter(description = "Protocolo, CPF, e-mail, nome ou bairro", required = true)
            @RequestParam String q) {
        List<ConsultaResponseDTO> resultado = solicitacaoService.consultarPorQuery(q);
        return ResponseEntity.ok(ApiResponseDTO.ok(resultado));
    }
}
