import { statusSolicitacao } from '@/lib/constants';

const STORAGE_KEY = 'arca-solicitacoes-v1';

function isBrowser() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function normalize(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export function onlyDigits(value) {
  return String(value || '').replace(/\D/g, '');
}

export function formatPhone(value) {
  const digits = onlyDigits(value).slice(0, 11);

  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function formatCep(value) {
  const digits = onlyDigits(value).slice(0, 8);
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}

function createId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function createProtocol(records = []) {
  const year = new Date().getFullYear();
  let protocol = '';

  do {
    const random = Math.floor(100000 + Math.random() * 900000);
    protocol = `ARCA-${year}-${random}`;
  } while (records.some((record) => record.protocolo === protocol));

  return protocol;
}

export function getStatusNextStep(status) {
  const steps = {
    'Cadastro recebido': 'Aguarde a análise inicial da equipe responsável.',
    'Em triagem': 'A equipe está validando os dados e os critérios de prioridade.',
    'Documentos pendentes': 'Verifique quais documentos precisam ser apresentados ou corrigidos.',
    Aprovado: 'A solicitação foi aprovada e seguirá para etapa de disponibilidade de agenda.',
    'Agendamento disponível': 'A equipe poderá entrar em contato para confirmar data, horário e orientações.',
    'Atendimento realizado': 'O atendimento foi concluído e o histórico permanece disponível para consulta.',
    Recusado: 'A solicitação não avançou. Procure a equipe responsável para entender o motivo.',
  };

  return steps[status] || 'Acompanhe a situação pelo protocolo informado.';
}

const demoSolicitacoes = [
  {
    id: 'demo-1',
    protocolo: 'ARCA-2026-0001',
    nomeCompleto: 'Maria Oliveira',
    cpf: '12345678909',
    email: 'maria@email.com',
    telefone: '(27) 99999-0001',
    bairro: 'Laranjeiras',
    tipoSolicitante: 'CADUNICO',
    tipoSolicitanteLabel: 'Inscrito no CadÚnico',
    servicoSolicitado: 'CASTRACAO',
    servicoLabel: 'Solicitação de castração',
    especie: 'GATO',
    especieLabel: 'Gato',
    quantidadeAnimais: '2',
    sexoAnimal: 'Fêmea',
    porteAnimal: 'Pequeno',
    vacinadoRaiva: 'Sim',
    sintomas: 'Não',
    prioridade: true,
    status: 'Em triagem',
    criadoEm: '2026-05-01T12:00:00.000Z',
    atualizadoEm: '2026-05-01T12:00:00.000Z',
    origem: 'Demonstração',
  },
  {
    id: 'demo-2',
    protocolo: 'ARCA-2026-0002',
    nomeCompleto: 'João Santos',
    cpf: '98765432100',
    email: 'joao@email.com',
    telefone: '(27) 98888-0002',
    bairro: 'Feu Rosa',
    tipoSolicitante: 'PROTETOR',
    tipoSolicitanteLabel: 'Protetor independente',
    servicoSolicitado: 'CASTRACAO',
    servicoLabel: 'Solicitação de castração',
    especie: 'CACHORRO',
    especieLabel: 'Cachorro',
    quantidadeAnimais: '4',
    sexoAnimal: 'Macho',
    porteAnimal: 'Médio',
    vacinadoRaiva: 'Não',
    sintomas: 'Não',
    prioridade: true,
    status: 'Documentos pendentes',
    criadoEm: '2026-05-05T12:00:00.000Z',
    atualizadoEm: '2026-05-06T12:00:00.000Z',
    origem: 'Demonstração',
  },
  {
    id: 'demo-3',
    protocolo: 'ARCA-2026-0003',
    nomeCompleto: 'Ana Costa',
    cpf: '11122233344',
    email: 'ana@email.com',
    telefone: '(27) 97777-0003',
    bairro: 'Jacaraípe',
    tipoSolicitante: 'MUNICIPE',
    tipoSolicitanteLabel: 'Munícipe',
    servicoSolicitado: 'TRIAGEM',
    servicoLabel: 'Triagem de atendimento animal',
    especie: 'AMBOS',
    especieLabel: 'Cachorro e gato',
    quantidadeAnimais: '1',
    sexoAnimal: 'Fêmea',
    porteAnimal: 'Médio',
    vacinadoRaiva: 'Sim',
    sintomas: 'Sim',
    prioridade: false,
    status: 'Aprovado',
    criadoEm: '2026-05-10T12:00:00.000Z',
    atualizadoEm: '2026-05-11T12:00:00.000Z',
    origem: 'Demonstração',
  },
];

function ensureSeedData() {
  if (!isBrowser()) return [];

  const current = window.localStorage.getItem(STORAGE_KEY);

  if (!current) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(demoSolicitacoes));
    return demoSolicitacoes;
  }

  try {
    return JSON.parse(current) || [];
  } catch {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(demoSolicitacoes));
    return demoSolicitacoes;
  }
}

export function getSolicitacoes() {
  if (!isBrowser()) return [];
  return ensureSeedData();
}

export function saveSolicitacoes(records) {
  if (!isBrowser()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

export function resetDemoSolicitacoes() {
  if (!isBrowser()) return demoSolicitacoes;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(demoSolicitacoes));
  return demoSolicitacoes;
}

export function createSolicitacao(data) {
  const records = getSolicitacoes();
  const now = new Date().toISOString();

  const solicitacao = {
    id: createId(),
    protocolo: createProtocol(records),
    status: statusSolicitacao[0],
    criadoEm: now,
    atualizadoEm: now,
    origem: 'Cadastro público',
    prioridade: ['CADUNICO', 'PROTETOR', 'ONG'].includes(data.tipoSolicitante),
    ...data,
  };

  saveSolicitacoes([solicitacao, ...records]);
  return solicitacao;
}

export function updateSolicitacaoStatus(id, status) {
  const records = getSolicitacoes();
  const updated = records.map((record) =>
    record.id === id
      ? {
          ...record,
          status,
          atualizadoEm: new Date().toISOString(),
        }
      : record
  );

  saveSolicitacoes(updated);
  return updated;
}

export function findSolicitacao(searchTerm) {
  const term = normalize(searchTerm);
  const digits = onlyDigits(searchTerm);

  if (!term && !digits) return null;

  return (
    getSolicitacoes().find((record) => {
      const protocolMatch = normalize(record.protocolo) === term;
      const emailMatch = normalize(record.email) === term;
      const cpfMatch = digits && onlyDigits(record.cpf) === digits;

      return protocolMatch || emailMatch || cpfMatch;
    }) || null
  );
}

export function formatDate(value) {
  if (!value) return '-';

  try {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(new Date(value));
  } catch {
    return '-';
  }
}
