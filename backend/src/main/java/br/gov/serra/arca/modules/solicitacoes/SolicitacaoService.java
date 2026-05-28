package br.gov.serra.arca.modules.solicitacoes;

import br.gov.serra.arca.common.exception.BusinessException;
import br.gov.serra.arca.common.exception.ResourceNotFoundException;
import br.gov.serra.arca.modules.admin.dto.DashboardStatsDTO;
import br.gov.serra.arca.modules.historico.HistoricoStatus;
import br.gov.serra.arca.modules.historico.HistoricoStatusRepository;
import br.gov.serra.arca.modules.solicitacoes.dto.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.time.Year;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class SolicitacaoService {

    private final SolicitacaoRepository solicitacaoRepository;
    private final HistoricoStatusRepository historicoRepository;
    private final SecureRandom secureRandom = new SecureRandom();

    @Transactional
    public SolicitacaoResponseDTO criarSolicitacao(CriarSolicitacaoDTO dto) {
        // Normalizar CPF (apenas dígitos)
        String cpfNormalizado = dto.getTutorCpf().replaceAll("[^0-9]", "");

        // Calcular prioridade
        int score = calcularPrioridadeScore(dto.getTipoSolicitante(), dto.getAnimalQuantidade(),
                dto.isSituacaoRisco(), dto.isAreaVulneravel());
        String label = calcularPrioridadeLabel(score);

        // Gerar protocolo único
        String protocolo = gerarProtocolo();

        Solicitacao solicitacao = Solicitacao.builder()
                .protocolo(protocolo)
                .tipo(dto.getTipo())
                .status(StatusSolicitacao.RECEBIDO)
                .tutorNome(dto.getTutorNome())
                .tutorCpf(cpfNormalizado)
                .tutorEmail(dto.getTutorEmail())
                .tutorTelefone(dto.getTutorTelefone())
                .tutorCep(dto.getTutorCep())
                .tutorBairro(dto.getTutorBairro())
                .tutorEndereco(dto.getTutorEndereco())
                .tipoSolicitante(dto.getTipoSolicitante())
                .tutorNis(dto.getTutorNis())
                .animalNome(dto.getAnimalNome())
                .animalEspecie(dto.getAnimalEspecie())
                .animalSexo(dto.getAnimalSexo())
                .animalPorte(dto.getAnimalPorte())
                .animalQuantidade(dto.getAnimalQuantidade())
                .vacinadoRaiva(dto.getVacinadoRaiva())
                .animalSintomas(dto.getAnimalSintomas())
                .situacaoRisco(dto.isSituacaoRisco())
                .areaVulneravel(dto.isAreaVulneravel())
                .observacoes(dto.getObservacoes())
                .prioridadeScore(score)
                .prioridadeLabel(label)
                .build();

        solicitacao = solicitacaoRepository.save(solicitacao);

        // Criar primeiro histórico
        HistoricoStatus historico = HistoricoStatus.builder()
                .solicitacao(solicitacao)
                .status(StatusSolicitacao.RECEBIDO.name())
                .nota("Solicitação registrada no sistema ARCA.")
                .data(LocalDateTime.now())
                .build();
        historicoRepository.save(historico);

        List<HistoricoStatus> historicoList = List.of(historico);
        log.info("Solicitação criada com protocolo: {}", protocolo);
        return SolicitacaoResponseDTO.from(solicitacao, historicoList);
    }

    @Transactional(readOnly = true)
    public ConsultaResponseDTO consultarPorProtocoloCpf(String protocolo, String cpf) {
        String protocoloNormalizado = protocolo.trim().toUpperCase(Locale.ROOT);
        String cpfNormalizado = cpf.replaceAll("[^0-9]", "");

        Solicitacao solicitacao = solicitacaoRepository
                .findByProtocoloAndTutorCpf(protocoloNormalizado, cpfNormalizado)
                .orElseThrow(() -> new ResourceNotFoundException("Não foi possível localizar solicitação com os dados informados."));

        List<HistoricoStatus> historico = historicoRepository.findBySolicitacaoIdOrderByDataAsc(solicitacao.getId());
        return ConsultaResponseDTO.from(solicitacao, historico);
    }

    @Transactional(readOnly = true)
    public Page<SolicitacaoResponseDTO> listarAdmin(String status, String bairro, String tipoSolicitante, Pageable pageable) {
        Page<Solicitacao> page = solicitacaoRepository.findByFiltros(
                (status != null && !status.isBlank()) ? status : null,
                (bairro != null && !bairro.isBlank()) ? bairro : null,
                (tipoSolicitante != null && !tipoSolicitante.isBlank()) ? tipoSolicitante : null,
                pageable
        );

        List<UUID> ids = page.getContent().stream().map(Solicitacao::getId).toList();
        Map<UUID, List<HistoricoStatus>> historicoPorSolicitacao = buscarHistoricoAgrupado(ids);

        List<SolicitacaoResponseDTO> content = page.getContent().stream()
                .map(s -> SolicitacaoResponseDTO.from(s, historicoPorSolicitacao.getOrDefault(s.getId(), List.of())))
                .toList();

        return new PageImpl<>(content, pageable, page.getTotalElements());
    }

    @Transactional(readOnly = true)
    public SolicitacaoResponseDTO obterPorId(UUID id) {
        Solicitacao solicitacao = solicitacaoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Solicitação", id));
        List<HistoricoStatus> historico = historicoRepository.findBySolicitacaoIdOrderByDataAsc(id);
        return SolicitacaoResponseDTO.from(solicitacao, historico);
    }

    @Transactional
    public SolicitacaoResponseDTO alterarStatus(UUID id, AlterarStatusDTO dto) {
        Solicitacao solicitacao = solicitacaoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Solicitação", id));

        StatusSolicitacao novoStatus;
        try {
            novoStatus = StatusSolicitacao.valueOf(dto.getStatus().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new BusinessException("Status inválido: " + dto.getStatus() +
                    ". Valores válidos: " + Arrays.toString(StatusSolicitacao.values()));
        }

        StatusSolicitacao statusAtual = solicitacao.getStatus();
        if (statusAtual == StatusSolicitacao.CONCLUIDO || statusAtual == StatusSolicitacao.RECUSADO) {
            throw new BusinessException("Não é possível alterar o status de uma solicitação já " +
                    statusAtual.getLabel().toLowerCase() + ".");
        }

        solicitacao.setStatus(novoStatus);
        solicitacao = solicitacaoRepository.save(solicitacao);

        HistoricoStatus historico = HistoricoStatus.builder()
                .solicitacao(solicitacao)
                .status(novoStatus.name())
                .nota(dto.getNota())
                .data(LocalDateTime.now())
                .build();
        historicoRepository.save(historico);

        log.info("Status da solicitação {} alterado de {} para {}", solicitacao.getProtocolo(), statusAtual, novoStatus);

        List<HistoricoStatus> historicoList = historicoRepository.findBySolicitacaoIdOrderByDataAsc(id);
        return SolicitacaoResponseDTO.from(solicitacao, historicoList);
    }

    @Transactional(readOnly = true)
    public DashboardStatsDTO obterEstatisticas() {
        long total = solicitacaoRepository.count();
        long ativas = solicitacaoRepository.countAtivas(List.of(StatusSolicitacao.CONCLUIDO, StatusSolicitacao.RECUSADO));
        long altaPrioridade = solicitacaoRepository.countAltaPrioridade();

        Map<String, Long> porStatus = new LinkedHashMap<>();
        for (StatusSolicitacao status : StatusSolicitacao.values()) {
            porStatus.put(status.name(), solicitacaoRepository.countByStatus(status));
        }

        Map<String, Long> porTipo = new LinkedHashMap<>();
        for (TipoSolicitacao tipo : TipoSolicitacao.values()) {
            porTipo.put(tipo.name(), 0L);
        }
        solicitacaoRepository.countGroupByTipo().forEach(row ->
                porTipo.put(((TipoSolicitacao) row[0]).name(), (Long) row[1]));

        Map<String, Long> porTipoSolicitante = new LinkedHashMap<>();
        for (TipoSolicitante ts : TipoSolicitante.values()) {
            porTipoSolicitante.put(ts.name(), 0L);
        }
        solicitacaoRepository.countGroupByTipoSolicitante().forEach(row ->
                porTipoSolicitante.put(((TipoSolicitante) row[0]).name(), (Long) row[1]));

        return DashboardStatsDTO.builder()
                .totalSolicitacoes(total)
                .solicitacoesAtivas(ativas)
                .altaPrioridade(altaPrioridade)
                .porStatus(porStatus)
                .porTipo(porTipo)
                .porTipoSolicitante(porTipoSolicitante)
                .build();
    }

    // --- Métodos auxiliares ---

    private String gerarProtocolo() {
        int ano = Year.now().getValue();
        String protocolo;
        int tentativas = 0;
        do {
            if (tentativas > 10) {
                throw new BusinessException("Não foi possível gerar um protocolo único. Tente novamente.");
            }
            String sufixo = String.format("%06d", secureRandom.nextInt(1_000_000));
            protocolo = "ARCA-" + ano + "-" + sufixo;
            tentativas++;
        } while (solicitacaoRepository.existsByProtocolo(protocolo));
        return protocolo;
    }

    private Map<UUID, List<HistoricoStatus>> buscarHistoricoAgrupado(List<UUID> solicitacaoIds) {
        if (solicitacaoIds.isEmpty()) {
            return Map.of();
        }

        return historicoRepository.findBySolicitacaoIdInOrderByDataAsc(solicitacaoIds).stream()
                .collect(Collectors.groupingBy(
                        h -> h.getSolicitacao().getId(),
                        LinkedHashMap::new,
                        Collectors.toList()
                ));
    }

    private int calcularPrioridadeScore(TipoSolicitante tipo, int quantidade, boolean risco, boolean vulneravel) {
        int score = 0;
        if (tipo == TipoSolicitante.CADUNICO || tipo == TipoSolicitante.ONG) score += 3;
        if (tipo == TipoSolicitante.PROTETOR) score += 2;
        if (quantidade >= 3) score += 2;
        if (risco) score += 2;
        if (vulneravel) score += 1;
        return score;
    }

    private String calcularPrioridadeLabel(int score) {
        if (score >= 5) return "Alta";
        if (score >= 3) return "Média";
        return "Baixa";
    }
}
