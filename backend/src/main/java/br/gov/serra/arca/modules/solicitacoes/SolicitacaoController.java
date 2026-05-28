package br.gov.serra.arca.modules.solicitacoes;

import br.gov.serra.arca.common.dto.ApiResponseDTO;
import br.gov.serra.arca.common.exception.ResourceNotFoundException;
import br.gov.serra.arca.modules.solicitacoes.dto.ConsultaResponseDTO;
import br.gov.serra.arca.modules.solicitacoes.dto.ConsultaSolicitacaoRequestDTO;
import br.gov.serra.arca.modules.solicitacoes.dto.CriarSolicitacaoDTO;
import br.gov.serra.arca.modules.solicitacoes.dto.SolicitacaoResponseDTO;
import br.gov.serra.arca.security.ClientIpResolver;
import br.gov.serra.arca.security.RateLimitExceededException;
import br.gov.serra.arca.security.RateLimitService;
import br.gov.serra.arca.security.SecurityAuditService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/solicitacoes")
@RequiredArgsConstructor
@Tag(name = "Solicitações Públicas", description = "Endpoints públicos para criação e consulta de solicitações")
public class SolicitacaoController {

    private final SolicitacaoService solicitacaoService;
    private final RateLimitService rateLimitService;
    private final ClientIpResolver clientIpResolver;
    private final SecurityAuditService securityAuditService;

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

    @PostMapping("/consulta")
    @Operation(
            summary = "Consultar solicitação",
            description = "Consulta uma solicitação usando protocolo e CPF do solicitante. Ambos são obrigatórios."
    )
    public ResponseEntity<ApiResponseDTO<ConsultaResponseDTO>> consultar(
            @Valid @RequestBody ConsultaSolicitacaoRequestDTO dto,
            HttpServletRequest request) {
        ConsultaResponseDTO resultado = consultarComProtecao(dto.getProtocolo(), dto.getCpf(), request);
        return ResponseEntity.ok(ApiResponseDTO.ok(resultado));
    }

    @Deprecated
    @GetMapping("/consulta")
    @Operation(
            summary = "Consultar solicitação (compatibilidade)",
            description = "Endpoint mantido temporariamente. Use POST com protocolo e CPF."
    )
    public ResponseEntity<ApiResponseDTO<ConsultaResponseDTO>> consultarGet(
            @Parameter(description = "Protocolo exato", required = true) @RequestParam String protocolo,
            @Parameter(description = "CPF do solicitante", required = true) @RequestParam String cpf,
            HttpServletRequest request) {
        ConsultaResponseDTO resultado = consultarComProtecao(protocolo, cpf, request);
        return ResponseEntity.ok(ApiResponseDTO.ok(resultado));
    }

    private ConsultaResponseDTO consultarComProtecao(String protocolo, String cpf, HttpServletRequest request) {
        String clientIp = clientIpResolver.resolve(request);
        String scope = "public-lookup";

        try {
            rateLimitService.check(scope, clientIp, RateLimitService.PUBLIC_LOOKUP);
            ConsultaResponseDTO resultado = solicitacaoService.consultarPorProtocoloCpf(protocolo, cpf);
            rateLimitService.recordSuccess(scope, clientIp);
            securityAuditService.publicLookup(clientIp, protocolo, cpf, true);
            return resultado;
        } catch (RateLimitExceededException ex) {
            securityAuditService.rateLimitBlocked(clientIp, scope);
            throw ex;
        } catch (ResourceNotFoundException ex) {
            rateLimitService.recordFailure(scope, clientIp, RateLimitService.PUBLIC_LOOKUP);
            rateLimitService.applyProgressiveDelay(scope, clientIp, RateLimitService.PUBLIC_LOOKUP);
            securityAuditService.publicLookup(clientIp, protocolo, cpf, false);
            throw new ResourceNotFoundException("Não foi possível localizar solicitação com os dados informados.");
        }
    }
}
