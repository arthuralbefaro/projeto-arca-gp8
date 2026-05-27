package br.gov.serra.arca.modules.solicitacoes;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum StatusSolicitacao {

    RECEBIDO("Cadastro recebido", "Sua solicitação foi recebida e está aguardando triagem."),
    TRIAGEM("Em triagem", "Sua solicitação está sendo analisada pela equipe técnica."),
    PENDENTE("Pendente", "Sua solicitação está pendente de informações ou documentação adicional."),
    APROVADO("Aprovado", "Sua solicitação foi aprovada e será agendada em breve."),
    AGENDAMENTO("Agendamento", "Sua solicitação está em processo de agendamento."),
    CONCLUIDO("Concluído", "O serviço solicitado foi concluído com sucesso."),
    RECUSADO("Recusado", "Sua solicitação foi recusada. Entre em contato para mais informações.");

    private final String label;
    private final String descricao;
}
