package br.gov.serra.arca.modules.solicitacoes;

import br.gov.serra.arca.common.exception.ResourceNotFoundException;
import br.gov.serra.arca.modules.historico.HistoricoStatusRepository;
import br.gov.serra.arca.modules.solicitacoes.dto.ConsultaResponseDTO;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class SolicitacaoServiceTest {

    private final SolicitacaoRepository solicitacaoRepository = mock(SolicitacaoRepository.class);
    private final HistoricoStatusRepository historicoRepository = mock(HistoricoStatusRepository.class);
    private final SolicitacaoService service = new SolicitacaoService(solicitacaoRepository, historicoRepository);

    @Test
    void publicLookupRequiresExactProtocolAndCpfPair() {
        Solicitacao solicitacao = Solicitacao.builder()
                .id(UUID.randomUUID())
                .protocolo("ARCA-2026-123456")
                .tipo(TipoSolicitacao.CASTRACAO)
                .status(StatusSolicitacao.RECEBIDO)
                .tutorNome("Maria")
                .tutorCpf("12345678909")
                .tipoSolicitante(TipoSolicitante.TUTOR)
                .animalQuantidade(1)
                .prioridadeLabel("Baixa")
                .build();

        when(solicitacaoRepository.findByProtocoloAndTutorCpf("ARCA-2026-123456", "12345678909"))
                .thenReturn(Optional.of(solicitacao));
        when(historicoRepository.findBySolicitacaoIdOrderByDataAsc(solicitacao.getId()))
                .thenReturn(List.of());

        ConsultaResponseDTO response = service.consultarPorProtocoloCpf("arca-2026-123456", "123.456.789-09");

        assertEquals("ARCA-2026-123456", response.getProtocolo());
        verify(solicitacaoRepository).findByProtocoloAndTutorCpf("ARCA-2026-123456", "12345678909");
    }

    @Test
    void publicLookupUsesGenericNotFoundMessage() {
        when(solicitacaoRepository.findByProtocoloAndTutorCpf("ARCA-2026-123456", "12345678909"))
                .thenReturn(Optional.empty());

        ResourceNotFoundException ex = assertThrows(ResourceNotFoundException.class,
                () -> service.consultarPorProtocoloCpf("ARCA-2026-123456", "12345678909"));

        assertEquals("Não foi possível localizar solicitação com os dados informados.", ex.getMessage());
    }
}
