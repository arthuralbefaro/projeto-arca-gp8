export const MOCK_MODE = process.env.NEXT_PUBLIC_MOCK_MODE === 'true';

const STATUS_LABELS = {
    RECEBIDO: 'Cadastro recebido',
    TRIAGEM: 'Em triagem',
    PENDENTE: 'Documentos pendentes',
    APROVADO: 'Aprovado',
    AGENDAMENTO: 'Agendamento disponível',
    CONCLUIDO: 'Atendimento realizado',
    RECUSADO: 'Recusado',
};

const STATUS_DESCRICOES = {
    RECEBIDO: 'A solicitação foi registrada e entrará na fila de triagem.',
    TRIAGEM: 'A equipe está analisando os dados e documentos enviados.',
    PENDENTE: 'Existem informações a corrigir antes de seguir.',
    APROVADO: 'A solicitação foi aprovada para a próxima etapa.',
    AGENDAMENTO: 'O tutor pode ser orientado sobre data e comparecimento.',
    CONCLUIDO: 'O atendimento foi concluído com sucesso.',
    RECUSADO: 'A solicitação não atendeu aos critérios do programa.',
};

export const MOCK_USER = {
    id: 1,
    email: 'admin.demo@arca.local',
    role: 'ADMIN',
    nome: 'Operação ARCA (Demo)',
};

const MOCK_SOLICITACOES = [
    {
        id: 1,
        protocolo: 'ARCA-2026-100001',
        tipo: 'CASTRACAO',
        status: 'TRIAGEM',
        tutorNome: 'Marina Alves',
        tutorCpf: '123.456.789-09',
        tutorCpfMascarado: '123.***.***-09',
        tutorTelefone: '(27) 99876-1122',
        tutorEmail: 'marina.alves@email.com',
        tutorBairro: 'Laranjeiras',
        tutorEndereco: 'Rua das Acácias, 120',
        tipoSolicitante: 'TUTOR',
        animalNome: 'Thor',
        animalEspecie: 'CACHORRO',
        prioridadeLabel: 'Alta',
        prioridadeScore: 82,
        criadoEm: '2026-05-12T09:30:00',
        observacoes: 'Tutora em situação de vulnerabilidade, animal resgatado recentemente.',
        historico: [
            { status: 'RECEBIDO', data: '2026-05-10T08:00:00', nota: 'Cadastro recebido pelo portal.' },
            { status: 'TRIAGEM', data: '2026-05-12T09:30:00', nota: 'Em análise pela equipe técnica.' },
        ],
    },
    {
        id: 2,
        protocolo: 'ARCA-2026-100002',
        tipo: 'CASTRACAO',
        status: 'APROVADO',
        tutorNome: 'João Pereira',
        tutorCpf: '987.654.321-00',
        tutorCpfMascarado: '987.***.***-00',
        tutorTelefone: '(27) 99700-3344',
        tutorEmail: 'joao.pereira@email.com',
        tutorBairro: 'Jacaraípe',
        tutorEndereco: 'Av. Central, 880',
        tipoSolicitante: 'CADUNICO',
        animalNome: 'Mia',
        animalEspecie: 'GATO',
        prioridadeLabel: 'Média',
        prioridadeScore: 54,
        criadoEm: '2026-05-08T14:10:00',
        observacoes: 'Beneficiário CadÚnico, documentação completa.',
        historico: [
            { status: 'RECEBIDO', data: '2026-05-06T10:20:00', nota: 'Cadastro recebido pelo portal.' },
            { status: 'TRIAGEM', data: '2026-05-07T11:00:00', nota: 'Documentos conferidos.' },
            { status: 'APROVADO', data: '2026-05-08T14:10:00', nota: 'Solicitação aprovada para agendamento.' },
        ],
    },
    {
        id: 3,
        protocolo: 'ARCA-2026-100003',
        tipo: 'CADASTRO_TUTOR',
        status: 'CONCLUIDO',
        tutorNome: 'Associação Patas Felizes',
        tutorCpf: '456.789.123-55',
        tutorCpfMascarado: '456.***.***-55',
        tutorTelefone: '(27) 99555-7788',
        tutorEmail: 'contato@patasfelizes.org',
        tutorBairro: 'Serra Sede',
        tutorEndereco: 'Rua do Abrigo, 45',
        tipoSolicitante: 'ONG',
        animalNome: 'Lote (8 animais)',
        animalEspecie: 'AMBOS',
        prioridadeLabel: 'Alta',
        prioridadeScore: 90,
        criadoEm: '2026-04-28T16:40:00',
        observacoes: 'ONG parceira, mutirão de castração concluído.',
        historico: [
            { status: 'RECEBIDO', data: '2026-04-20T09:00:00', nota: 'Cadastro recebido pelo portal.' },
            { status: 'TRIAGEM', data: '2026-04-22T10:30:00', nota: 'Análise da equipe técnica.' },
            { status: 'APROVADO', data: '2026-04-24T13:00:00', nota: 'Aprovado para mutirão.' },
            { status: 'AGENDAMENTO', data: '2026-04-26T08:00:00', nota: 'Mutirão agendado.' },
            { status: 'CONCLUIDO', data: '2026-04-28T16:40:00', nota: 'Atendimento realizado.' },
        ],
    },
    {
        id: 4,
        protocolo: 'ARCA-2026-100004',
        tipo: 'CASTRACAO',
        status: 'PENDENTE',
        tutorNome: 'Carla Souza',
        tutorCpf: '321.654.987-11',
        tutorCpfMascarado: '321.***.***-11',
        tutorTelefone: '(27) 99444-1100',
        tutorEmail: 'carla.souza@email.com',
        tutorBairro: 'Manguinhos',
        tutorEndereco: 'Rua da Praia, 300',
        tipoSolicitante: 'PROTETOR',
        animalNome: 'Bidu',
        animalEspecie: 'CACHORRO',
        prioridadeLabel: 'Baixa',
        prioridadeScore: 31,
        criadoEm: '2026-05-15T11:05:00',
        observacoes: 'Aguardando comprovante de residência atualizado.',
        historico: [
            { status: 'RECEBIDO', data: '2026-05-14T18:00:00', nota: 'Cadastro recebido pelo portal.' },
            { status: 'TRIAGEM', data: '2026-05-15T09:00:00', nota: 'Análise iniciada.' },
            { status: 'PENDENTE', data: '2026-05-15T11:05:00', nota: 'Comprovante de residência pendente.' },
        ],
    },
    {
        id: 5,
        protocolo: 'ARCA-2026-100005',
        tipo: 'CASTRACAO',
        status: 'AGENDAMENTO',
        tutorNome: 'Roberto Lima',
        tutorCpf: '654.321.789-22',
        tutorCpfMascarado: '654.***.***-22',
        tutorTelefone: '(27) 99333-2211',
        tutorEmail: 'roberto.lima@email.com',
        tutorBairro: 'Carapina',
        tutorEndereco: 'Rua das Palmeiras, 77',
        tipoSolicitante: 'TUTOR',
        animalNome: 'Nina',
        animalEspecie: 'GATO',
        prioridadeLabel: 'Média',
        prioridadeScore: 48,
        criadoEm: '2026-05-11T08:25:00',
        observacoes: 'Tutor orientado sobre jejum pré-cirúrgico.',
        historico: [
            { status: 'RECEBIDO', data: '2026-05-05T07:40:00', nota: 'Cadastro recebido pelo portal.' },
            { status: 'TRIAGEM', data: '2026-05-07T10:00:00', nota: 'Documentos conferidos.' },
            { status: 'APROVADO', data: '2026-05-09T12:00:00', nota: 'Solicitação aprovada.' },
            { status: 'AGENDAMENTO', data: '2026-05-11T08:25:00', nota: 'Agendamento liberado.' },
        ],
    },
    {
        id: 6,
        protocolo: 'ARCA-2026-100006',
        tipo: 'CASTRACAO',
        status: 'RECEBIDO',
        tutorNome: 'Fernanda Dias',
        tutorCpf: '789.123.456-33',
        tutorCpfMascarado: '789.***.***-33',
        tutorTelefone: '(27) 99222-9988',
        tutorEmail: 'fernanda.dias@email.com',
        tutorBairro: 'Nova Almeida',
        tutorEndereco: 'Rua do Sol, 12',
        tipoSolicitante: 'TUTOR',
        animalNome: 'Rex',
        animalEspecie: 'CACHORRO',
        prioridadeLabel: 'Baixa',
        prioridadeScore: 27,
        criadoEm: '2026-05-16T15:50:00',
        observacoes: 'Aguardando início da triagem.',
        historico: [
            { status: 'RECEBIDO', data: '2026-05-16T15:50:00', nota: 'Cadastro recebido pelo portal.' },
        ],
    },
];

function withLabels(item) {
    return {
        ...item,
        statusLabel: STATUS_LABELS[item.status] || item.status,
        statusDescricao: STATUS_DESCRICOES[item.status] || '',
    };
}

export function mockConsultar({ protocolo, cpf }) {
    const base = withLabels(MOCK_SOLICITACOES[0]);

    return {
        ...base,
        protocolo: protocolo || base.protocolo,
        tutorCpfMascarado: cpf
            ? `${cpf.slice(0, 3)}.***.***-${cpf.slice(-2)}`
            : base.tutorCpfMascarado,
    };
}

export function mockListar(filtros = {}, page = 0, size = 20) {
    let content = MOCK_SOLICITACOES.map(withLabels);

    if (filtros.status) {
        content = content.filter((item) => item.status === filtros.status);
    }
    if (filtros.bairro) {
        content = content.filter((item) => item.tutorBairro === filtros.bairro);
    }
    if (filtros.tipoSolicitante) {
        content = content.filter((item) => item.tipoSolicitante === filtros.tipoSolicitante);
    }

    const totalElements = content.length;
    const totalPages = Math.max(Math.ceil(totalElements / size), 1);
    const start = page * size;

    return {
        content: content.slice(start, start + size),
        totalPages,
        totalElements,
        number: page,
        size,
    };
}

export function mockObter(id) {
    const found = MOCK_SOLICITACOES.find((item) => String(item.id) === String(id));
    return withLabels(found || MOCK_SOLICITACOES[0]);
}

export function mockStats() {
    const porStatus = {};
    const porTipo = {};
    const porTipoSolicitante = {};
    let altaPrioridade = 0;
    let solicitacoesAtivas = 0;

    for (const item of MOCK_SOLICITACOES) {
        porStatus[item.status] = (porStatus[item.status] || 0) + 1;
        porTipo[item.tipo] = (porTipo[item.tipo] || 0) + 1;
        porTipoSolicitante[item.tipoSolicitante] = (porTipoSolicitante[item.tipoSolicitante] || 0) + 1;
        if (item.prioridadeLabel === 'Alta') altaPrioridade += 1;
        if (!['CONCLUIDO', 'RECUSADO'].includes(item.status)) solicitacoesAtivas += 1;
    }

    return {
        totalSolicitacoes: MOCK_SOLICITACOES.length,
        solicitacoesAtivas,
        altaPrioridade,
        porStatus,
        porTipo,
        porTipoSolicitante,
    };
}

export function mockAlterarStatus(id, status) {
    const base = mockObter(id);
    return {
        ...base,
        status,
        statusLabel: STATUS_LABELS[status] || status,
        statusDescricao: STATUS_DESCRICOES[status] || '',
    };
}

export function mockCriar(data = {}) {
    const protocolo = `ARCA-2026-${Math.floor(100000 + Math.random() * 899999)}`;
    return withLabels({
        ...MOCK_SOLICITACOES[0],
        ...data,
        id: Date.now(),
        protocolo,
        status: 'RECEBIDO',
        historico: [
            { status: 'RECEBIDO', data: new Date().toISOString(), nota: 'Cadastro recebido pelo portal.' },
        ],
    });
}
