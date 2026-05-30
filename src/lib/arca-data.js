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

export function formatDateBR(dateValue) {
    if (!dateValue) return '-';

    return new Intl.DateTimeFormat('pt-BR', {
        dateStyle: 'short',
        timeStyle: 'short',
    }).format(new Date(dateValue));
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
