export const bairrosSerra = [
  'Barcelona',
  'Carapina',
  'Castelândia',
  'Cidade Continental',
  'Feu Rosa',
  'Jacaraípe',
  'Jardim Limoeiro',
  'Laranjeiras',
  'Manguinhos',
  'Nova Almeida',
  'Parque Residencial Laranjeiras',
  'Portal de Jacaraípe',
  'Serra Centro',
  'Serra Sede',
  'Valparaíso',
];

export const tiposSolicitante = [
  { value: 'MUNICIPE', label: 'Munícipe' },
  { value: 'CADUNICO', label: 'Inscrito no CadÚnico' },
  { value: 'PROTETOR', label: 'Protetor independente' },
  { value: 'ONG', label: 'ONG ou projeto de proteção animal' },
];

export const servicosPrograma = [
  { value: 'CASTRACAO', label: 'Solicitação de castração' },
  { value: 'TRIAGEM', label: 'Triagem de atendimento animal' },
  { value: 'ORIENTACAO', label: 'Orientação sobre guarda responsável' },
  { value: 'ATUALIZACAO', label: 'Atualização de cadastro' },
];

export const especiesAnimais = [
  { value: 'CACHORRO', label: 'Cachorro' },
  { value: 'GATO', label: 'Gato' },
  { value: 'AMBOS', label: 'Cachorro e gato' },
];

export const statusSolicitacao = [
  'Cadastro recebido',
  'Em triagem',
  'Documentos pendentes',
  'Aprovado',
  'Agendamento disponível',
  'Atendimento realizado',
  'Recusado',
];

export const etapasPrograma = [
  {
    number: '01',
    title: 'Faça seu cadastro',
    description:
      'O tutor informa dados pessoais, endereço, contato, perfil de prioridade e informações iniciais sobre os animais.',
  },
  {
    number: '02',
    title: 'Aguarde a triagem',
    description:
      'A equipe responsável avalia os dados, verifica critérios de prioridade e identifica possíveis pendências.',
  },
  {
    number: '03',
    title: 'Receba o contato da equipe',
    description:
      'A Secretaria poderá entrar em contato por telefone ou e-mail para confirmar informações e orientar os próximos passos.',
  },
  {
    number: '04',
    title: 'Separe os documentos',
    description:
      'Quando necessário, o tutor deverá apresentar documentos pessoais, comprovante de residência e informações do animal.',
  },
  {
    number: '05',
    title: 'Aguarde disponibilidade de vaga',
    description:
      'Após a validação, a solicitação poderá avançar para agendamento conforme os critérios do programa.',
  },
  {
    number: '06',
    title: 'Compareça ao atendimento',
    description:
      'O animal será encaminhado para o procedimento ou serviço solicitado, conforme a situação aprovada.',
  },
];

export const prioridadesPrograma = [
  'Tutores inscritos no CadÚnico',
  'Protetores independentes',
  'ONGs de proteção animal',
  'Áreas com maior vulnerabilidade social',
  'Locais com maior risco epidemiológico',
];

export const documentosPrograma = [
  'Documento de identificação com foto',
  'CPF do responsável',
  'Comprovante de residência no município da Serra',
  'Comprovante do NIS, quando aplicável',
  'Cartão de vacinação antirrábica atualizado',
  'Fotos ou informações complementares do animal, quando solicitadas',
];

export const avisosImportantes = [
  'O cadastro passa por triagem da equipe responsável.',
  'A equipe poderá entrar em contato por telefone ou e-mail.',
  'É necessário residir no município da Serra.',
  'Documentos poderão ser solicitados durante a validação.',
  'O cadastro não garante vaga imediata.',
];
