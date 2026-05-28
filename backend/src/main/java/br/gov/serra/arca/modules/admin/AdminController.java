package br.gov.serra.arca.modules.admin;

import br.gov.serra.arca.common.dto.ApiResponseDTO;
import br.gov.serra.arca.modules.admin.dto.DashboardStatsDTO;
import br.gov.serra.arca.modules.solicitacoes.SolicitacaoService;
import br.gov.serra.arca.modules.solicitacoes.dto.AlterarStatusDTO;
import br.gov.serra.arca.modules.solicitacoes.dto.SolicitacaoResponseDTO;
import br.gov.serra.arca.security.ClientIpResolver;
import br.gov.serra.arca.security.RateLimitService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
@Tag(name = "Admin", description = "Endpoints administrativos (requerem autenticação JWT)")
@SecurityRequirement(name = "bearerAuth")
public class AdminController {

    private static final int MAX_PAGE_SIZE = 100;

    private final SolicitacaoService solicitacaoService;
    private final RateLimitService rateLimitService;
    private final ClientIpResolver clientIpResolver;

    @GetMapping("/solicitacoes")
    @Operation(
            summary = "Listar solicitações",
            description = "Lista todas as solicitações com filtros opcionais e paginação."
    )
    public ResponseEntity<ApiResponseDTO<Page<SolicitacaoResponseDTO>>> listarSolicitacoes(
            @Parameter(description = "Filtrar por status") @RequestParam(required = false) String status,
            @Parameter(description = "Filtrar por bairro") @RequestParam(required = false) String bairro,
            @Parameter(description = "Filtrar por tipo de solicitante") @RequestParam(required = false) String tipoSolicitante,
            @Parameter(description = "Número da página (0-based)") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Tamanho da página") @RequestParam(defaultValue = "20") int size) {

        int safePage = Math.max(page, 0);
        int safeSize = Math.min(Math.max(size, 1), MAX_PAGE_SIZE);
        Pageable pageable = PageRequest.of(safePage, safeSize);
        Page<SolicitacaoResponseDTO> resultado = solicitacaoService.listarAdmin(status, bairro, tipoSolicitante, pageable);
        return ResponseEntity.ok(ApiResponseDTO.ok(resultado));
    }

    @GetMapping("/solicitacoes/{id}")
    @Operation(summary = "Obter solicitação por ID")
    public ResponseEntity<ApiResponseDTO<SolicitacaoResponseDTO>> obterSolicitacao(
            @PathVariable UUID id) {
        SolicitacaoResponseDTO solicitacao = solicitacaoService.obterPorId(id);
        return ResponseEntity.ok(ApiResponseDTO.ok(solicitacao));
    }

    @PatchMapping("/solicitacoes/{id}/status")
    @Operation(
            summary = "Alterar status de uma solicitação",
            description = "Atualiza o status de uma solicitação e registra no histórico."
    )
    public ResponseEntity<ApiResponseDTO<SolicitacaoResponseDTO>> alterarStatus(
            @PathVariable UUID id,
            @Valid @RequestBody AlterarStatusDTO dto,
            HttpServletRequest request) {
        String clientIp = clientIpResolver.resolve(request);
        rateLimitService.check("admin-mutation", clientIp, RateLimitService.ADMIN_MUTATION);
        SolicitacaoResponseDTO atualizada = solicitacaoService.alterarStatus(id, dto);
        return ResponseEntity.ok(ApiResponseDTO.ok(atualizada, "Status alterado para: " + dto.getStatus()));
    }

    @GetMapping("/stats")
    @Operation(
            summary = "Obter estatísticas do dashboard",
            description = "Retorna estatísticas gerais do sistema para o painel administrativo."
    )
    public ResponseEntity<ApiResponseDTO<DashboardStatsDTO>> obterEstatisticas() {
        DashboardStatsDTO stats = solicitacaoService.obterEstatisticas();
        return ResponseEntity.ok(ApiResponseDTO.ok(stats));
    }
}
