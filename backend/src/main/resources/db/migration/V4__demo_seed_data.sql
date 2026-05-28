INSERT INTO solicitacoes (
    protocolo,
    tipo,
    status,
    tutor_nome,
    tutor_cpf,
    tutor_email,
    tutor_telefone,
    tutor_cep,
    tutor_bairro,
    tutor_endereco,
    tipo_solicitante,
    animal_nome,
    animal_especie,
    animal_sexo,
    animal_quantidade,
    vacinado_raiva,
    animal_sintomas,
    situacao_risco,
    area_vulneravel,
    observacoes,
    prioridade_score,
    prioridade_label
) VALUES
(
    'ARCA-2026-100001',
    'CASTRACAO',
    'TRIAGEM',
    'Marina Alves Demo',
    '12345678909',
    'marina.demo@example.local',
    '(27) 99900-0001',
    '29160-000',
    'Laranjeiras',
    'Rua Demo Institucional, 100',
    'CADUNICO',
    'Lua',
    'GATO',
    'Fêmea',
    2,
    'SIM',
    'NAO_INFORMADO',
    FALSE,
    TRUE,
    'Registro fictício para demonstração acadêmica.',
    4,
    'Média'
),
(
    'ARCA-2026-100002',
    'CADASTRO_TUTOR',
    'APROVADO',
    'Rafael Costa Demo',
    '52998224725',
    'rafael.demo@example.local',
    '(27) 99900-0002',
    '29170-000',
    'Serra Centro',
    'Avenida Demo Pública, 200',
    'TUTOR',
    NULL,
    NULL,
    NULL,
    1,
    'NAO_INFORMADO',
    'NAO_INFORMADO',
    FALSE,
    FALSE,
    'Cadastro fictício usado para apresentação do painel.',
    0,
    'Baixa'
),
(
    'ARCA-2026-100003',
    'CASTRACAO',
    'PENDENTE',
    'Coletivo Cuidado Animal Demo',
    '11144477735',
    'coletivo.demo@example.local',
    '(27) 99900-0003',
    '29175-000',
    'Jacaraípe',
    'Travessa Demo Social, 300',
    'ONG',
    'Grupo comunitário',
    'AMBOS',
    'Diversos',
    5,
    'NAO_INFORMADO',
    'NAO_INFORMADO',
    TRUE,
    TRUE,
    'Caso fictício de alta prioridade para validação dos indicadores.',
    8,
    'Alta'
)
ON CONFLICT (protocolo) DO NOTHING;

INSERT INTO historico_status (solicitacao_id, status, nota, data)
SELECT s.id, 'RECEBIDO', 'Solicitação demo registrada no ambiente acadêmico.', s.criado_em
FROM solicitacoes s
WHERE s.protocolo IN ('ARCA-2026-100001', 'ARCA-2026-100002', 'ARCA-2026-100003')
  AND NOT EXISTS (
      SELECT 1 FROM historico_status h
      WHERE h.solicitacao_id = s.id
        AND h.status = 'RECEBIDO'
  );

INSERT INTO historico_status (solicitacao_id, status, nota, data)
SELECT s.id, s.status, 'Status demo para apresentação do fluxo administrativo.', s.criado_em + INTERVAL '1 day'
FROM solicitacoes s
WHERE s.protocolo IN ('ARCA-2026-100001', 'ARCA-2026-100002', 'ARCA-2026-100003')
  AND s.status <> 'RECEBIDO'
  AND NOT EXISTS (
      SELECT 1 FROM historico_status h
      WHERE h.solicitacao_id = s.id
        AND h.status = s.status
  );
