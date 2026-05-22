export const STORAGE_KEYS = {
    requests: 'arca-requests',
    adminAuth: 'arca-admin-auth',
};

export const STATUS_FLOW = [
    {
        key: 'recebido',
        label: 'Cadastro recebido',
        description: 'A solicitação foi registrada no sistema.',
    },
    {
        key: 'triagem',
        label: 'Em triagem',
        description: 'A equipe está analisando os dados enviados.',
    },
    {
        key: 'pendente',
        label: 'Documentos pendentes',
        description: 'Existem informações ou documentos a serem corrigidos.',
    },
    {
        key: 'aprovado',
        label: 'Aprovado',
        description: 'A solicitação foi aprovada para a próxima etapa.',
    },
    {
        key: 'agendamento',
        label: 'Agendamento disponível',
        description: 'O tutor pode ser orientado sobre data e comparecimento.',
    },
    {
        key: 'concluido',
        label: 'Atendimento realizado',
        description: 'O atendimento foi concluído.',
    },
];

export const FINAL_STATUS = [
    {
        key: 'recusado',
        label: 'Recusado',
        description: 'A solicitação não foi aprovada conforme os critérios do programa.',
    },
];

export const STATUS_OPTIONS = [...STATUS_FLOW, ...FINAL_STATUS];

export const BAIRROS_SERRA = [
    'Alterosas',
    'Barcelona',
    'Boa Vista',
    'Carapina',
    'Castelândia',
    'Central Carapina',
    'Chácara Parreiral',
    'Cidade Continental',
    'Colina de Laranjeiras',
    'Eldorado',
    'Feu Rosa',
    'Hélio Ferraz',
    'Jacaraípe',
    'Jardim Carapina',
    'José de Anchieta',
    'Laranjeiras',
    'Manguinhos',
    'Morada de Laranjeiras',
    'Nova Almeida',
    'Parque Residencial Laranjeiras',
    'Planalto Serrano',
    'Porto Canoa',
    'São Diogo',
    'Serra Centro',
    'Serra Dourada',
    'Valparaíso',
];

export function buildProtocol() {
    const year = new Date().getFullYear();
    const random = Math.floor(1000 + Math.random() * 9000);
    const stamp = String(Date.now()).slice(-4);

    return `ARCA-${year}-${stamp}${random}`;
}

export function formatDateBR(dateValue) {
    if (!dateValue) return '-';

    return new Intl.DateTimeFormat('pt-BR', {
        dateStyle: 'short',
        timeStyle: 'short',
    }).format(new Date(dateValue));
}

export function getStatusMeta(status) {
    return STATUS_OPTIONS.find((item) => item.key === status) || STATUS_FLOW[0];
}

export function getStatusIndex(status) {
    const index = STATUS_FLOW.findIndex((item) => item.key === status);
    return index === -1 ? 0 : index;
}

export function onlyNumbers(value) {
    return String(value || '').replace(/\D/g, '');
}

export function maskCEP(value) {
    const numbers = onlyNumbers(value).slice(0, 8);

    return numbers.replace(/(\d{5})(\d)/, '$1-$2');
}

export function isValidCPF(value) {
    const cpf = onlyNumbers(value);

    if (cpf.length !== 11) return false;

    if (/^(\d)\1{10}$/.test(cpf)) return false;

    let sum = 0;

    for (let index = 0; index < 9; index += 1) {
        sum += Number(cpf[index]) * (10 - index);
    }

    let firstDigit = (sum * 10) % 11;

    if (firstDigit === 10) firstDigit = 0;

    if (firstDigit !== Number(cpf[9])) return false;

    sum = 0;

    for (let index = 0; index < 10; index += 1) {
        sum += Number(cpf[index]) * (11 - index);
    }

    let secondDigit = (sum * 10) % 11;

    if (secondDigit === 10) secondDigit = 0;

    return secondDigit === Number(cpf[10]);
}

export function maskCPF(value) {
    const numbers = onlyNumbers(value).slice(0, 11);

    return numbers
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

export function maskPhone(value) {
    const numbers = onlyNumbers(value).slice(0, 11);

    if (numbers.length <= 10) {
        return numbers
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{4})(\d)/, '$1-$2');
    }

    return numbers
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2');
}

export function calculatePriorityScore(data) {
    let score = 0;

    if (data.requesterType === 'cadunico') score += 3;
    if (data.requesterType === 'ong') score += 3;
    if (data.requesterType === 'protetor') score += 2;
    if (Number(data.quantity || 1) >= 3) score += 2;
    if (data.riskSituation === 'sim') score += 2;
    if (data.vulnerableArea === 'sim') score += 1;

    return score;
}

export function getPriorityLabel(score) {
    if (score >= 5) return 'Alta';
    if (score >= 3) return 'Média';
    return 'Baixa';
}

export const DEMO_REQUESTS = [
    {
        id: 'demo-1',
        protocol: 'ARCA-2026-0001',
        type: 'castracao',
        tutorName: 'Maria Souza',
        cpf: '123.456.789-00',
        email: 'maria.souza@email.com',
        phone: '(27) 99999-1111',
        bairro: 'Feu Rosa',
        address: 'Rua das Flores, 120',
        requesterType: 'cadunico',
        service: 'Solicitação de castração',
        animalName: 'Mel',
        species: 'Cachorro',
        sex: 'Fêmea',
        quantity: 1,
        vaccinated: 'sim',
        riskSituation: 'nao',
        vulnerableArea: 'sim',
        notes: 'Família cadastrada em programa social.',
        status: 'triagem',
        priorityScore: 4,
        priorityLabel: 'Média',
        createdAt: '2026-05-21T10:30:00.000Z',
        history: [
            {
                status: 'recebido',
                date: '2026-05-21T10:30:00.000Z',
                note: 'Solicitação registrada.',
            },
            {
                status: 'triagem',
                date: '2026-05-21T11:10:00.000Z',
                note: 'Cadastro encaminhado para análise.',
            },
        ],
    },
    {
        id: 'demo-2',
        protocol: 'ARCA-2026-0002',
        type: 'castracao',
        tutorName: 'João Almeida',
        cpf: '987.654.321-00',
        email: 'joao.almeida@email.com',
        phone: '(27) 98888-2222',
        bairro: 'Laranjeiras',
        address: 'Avenida Central, 450',
        requesterType: 'tutor',
        service: 'Solicitação de castração',
        animalName: 'Thor',
        species: 'Gato',
        sex: 'Macho',
        quantity: 1,
        vaccinated: 'sim',
        riskSituation: 'nao',
        vulnerableArea: 'nao',
        notes: 'Tutor solicitou atendimento individual.',
        status: 'aprovado',
        priorityScore: 0,
        priorityLabel: 'Baixa',
        createdAt: '2026-05-20T14:00:00.000Z',
        history: [
            {
                status: 'recebido',
                date: '2026-05-20T14:00:00.000Z',
                note: 'Solicitação registrada.',
            },
            {
                status: 'triagem',
                date: '2026-05-20T15:00:00.000Z',
                note: 'Dados analisados.',
            },
            {
                status: 'aprovado',
                date: '2026-05-21T09:00:00.000Z',
                note: 'Solicitação aprovada.',
            },
        ],
    },
    {
        id: 'demo-3',
        protocol: 'ARCA-2026-0003',
        type: 'cadastro_tutor',
        tutorName: 'ONG Patinhas da Serra',
        cpf: '000.111.222-33',
        email: 'contato@patinhas.org',
        phone: '(27) 97777-3333',
        bairro: 'Jacaraípe',
        address: 'Rua dos Animais, 80',
        requesterType: 'ong',
        service: 'Cadastro de tutor/protetor',
        animalName: 'Atendimento coletivo',
        species: 'Cães e gatos',
        sex: 'Diversos',
        quantity: 8,
        vaccinated: 'parcial',
        riskSituation: 'sim',
        vulnerableArea: 'sim',
        notes: 'Demanda coletiva de animais resgatados.',
        status: 'pendente',
        priorityScore: 8,
        priorityLabel: 'Alta',
        createdAt: '2026-05-18T08:40:00.000Z',
        history: [
            {
                status: 'recebido',
                date: '2026-05-18T08:40:00.000Z',
                note: 'Cadastro recebido.',
            },
            {
                status: 'triagem',
                date: '2026-05-18T10:20:00.000Z',
                note: 'Demanda coletiva identificada.',
            },
            {
                status: 'pendente',
                date: '2026-05-19T09:30:00.000Z',
                note: 'Solicitado envio de documentação complementar.',
            },
        ],
    },
];