INSERT INTO tutores (
    nome,
    cpf,
    telefone,
    email,
    senha_hash,
    data_nascimento
)
SELECT
    'Tutor ' || gs,
    LPAD(gs::text, 11, '0'),
    '(27) 99999-' || LPAD((gs % 10000)::text, 4, '0'),
    'tutor' || gs || '@email.com',
    'senha_hash_exemplo',
    (DATE '1970-01-01' + ((gs % 15000) * INTERVAL '1 day'))::date
FROM generate_series(1, 20000) AS gs;

INSERT INTO animais (
    nome,
    especie,
    raca,
    sexo,
    idade_aproximada,
    local_resgate,
    status
)
SELECT
    'Animal ' || gs,
    CASE
        WHEN gs % 2 = 0 THEN 'Cachorro'
        ELSE 'Gato'
        END,
    CASE
        WHEN gs % 5 = 0 THEN 'SRD'
        WHEN gs % 5 = 1 THEN 'Poodle'
        WHEN gs % 5 = 2 THEN 'Pinscher'
        WHEN gs % 5 = 3 THEN 'Siamês'
        ELSE 'Persa'
        END,
    CASE
        WHEN gs % 2 = 0 THEN 'Macho'
        ELSE 'Fêmea'
        END,
    (1 + (gs % 12)) || ' anos',
    CASE
        WHEN gs % 5 = 0 THEN 'Serra Sede'
        WHEN gs % 5 = 1 THEN 'Laranjeiras'
        WHEN gs % 5 = 2 THEN 'Jacaraípe'
        WHEN gs % 5 = 3 THEN 'Barcelona'
        ELSE 'Jardim Limoeiro'
        END,
    CASE
        WHEN gs % 3 = 0 THEN 'Disponível'
        WHEN gs % 3 = 1 THEN 'Adotado'
        ELSE 'Em tratamento'
        END
FROM generate_series(1, 15000) AS gs;

INSERT INTO adocoes (
    tutor_id,
    animal_id,
    data_adocao,
    status,
    observacoes
)
SELECT
    1 + (gs % 20000),
    1 + (gs % 15000),
    (DATE '2023-01-01' + ((gs % 900) * INTERVAL '1 day'))::date,
    CASE
        WHEN gs % 4 = 0 THEN 'Solicitada'
        WHEN gs % 4 = 1 THEN 'Aprovada'
        WHEN gs % 4 = 2 THEN 'Recusada'
        ELSE 'Cancelada'
END,
    'Registro de adoção gerado para teste.'
FROM generate_series(1, 12000) AS gs;

INSERT INTO castracoes (
    tutor_id,
    especie,
    raca,
    sexo,
    localizacao,
    observacoes,
    status,
    data_solicitacao
)
SELECT
    1 + (gs % 20000),
    CASE
        WHEN gs % 2 = 0 THEN 'Cachorro'
        ELSE 'Gato'
        END,
    CASE
        WHEN gs % 5 = 0 THEN 'SRD'
        WHEN gs % 5 = 1 THEN 'Poodle'
        WHEN gs % 5 = 2 THEN 'Pinscher'
        WHEN gs % 5 = 3 THEN 'Siamês'
        ELSE 'Persa'
        END,
    CASE
        WHEN gs % 2 = 0 THEN 'Macho'
        ELSE 'Fêmea'
        END,
    CASE
        WHEN gs % 5 = 0 THEN 'Serra Sede'
        WHEN gs % 5 = 1 THEN 'Laranjeiras'
        WHEN gs % 5 = 2 THEN 'Jacaraípe'
        WHEN gs % 5 = 3 THEN 'Barcelona'
        ELSE 'Jardim Limoeiro'
        END,
    'Solicitação de castração gerada para teste.',
    CASE
        WHEN gs % 4 = 0 THEN 'Solicitada'
        WHEN gs % 4 = 1 THEN 'Agendada'
        WHEN gs % 4 = 2 THEN 'Realizada'
        ELSE 'Cancelada'
        END,
    (DATE '2023-01-01' + ((gs % 900) * INTERVAL '1 day'))::date
FROM generate_series(1, 12000) AS gs;

INSERT INTO denuncias (
    tutor_id,
    tipo_denuncia,
    descricao,
    localizacao,
    status,
    data_denuncia
)
SELECT
    1 + (gs % 20000),
    CASE
        WHEN gs % 4 = 0 THEN 'Maus-tratos'
        WHEN gs % 4 = 1 THEN 'Abandono'
        WHEN gs % 4 = 2 THEN 'Animal ferido'
        ELSE 'Outro'
        END,
    'Descrição da denúncia gerada para teste.',
    CASE
        WHEN gs % 5 = 0 THEN 'Serra Sede'
        WHEN gs % 5 = 1 THEN 'Laranjeiras'
        WHEN gs % 5 = 2 THEN 'Jacaraípe'
        WHEN gs % 5 = 3 THEN 'Barcelona'
        ELSE 'Jardim Limoeiro'
        END,
    CASE
        WHEN gs % 4 = 0 THEN 'Recebida'
        WHEN gs % 4 = 1 THEN 'Em análise'
        WHEN gs % 4 = 2 THEN 'Em atendimento'
        ELSE 'Finalizada'
        END,
    (DATE '2023-01-01' + ((gs % 900) * INTERVAL '1 day'))::date
FROM generate_series(1, 10000) AS gs;

INSERT INTO resgates (
    tutor_id,
    especie,
    descricao,
    localizacao,
    status,
    data_resgate
)
SELECT
    1 + (gs % 20000),
    CASE
        WHEN gs % 2 = 0 THEN 'Cachorro'
        ELSE 'Gato'
        END,
    'Solicitação de resgate gerada para teste.',
    CASE
        WHEN gs % 5 = 0 THEN 'Serra Sede'
        WHEN gs % 5 = 1 THEN 'Laranjeiras'
        WHEN gs % 5 = 2 THEN 'Jacaraípe'
        WHEN gs % 5 = 3 THEN 'Barcelona'
        ELSE 'Jardim Limoeiro'
        END,
    CASE
        WHEN gs % 5 = 0 THEN 'Solicitado'
        WHEN gs % 5 = 1 THEN 'Em análise'
        WHEN gs % 5 = 2 THEN 'Em atendimento'
        WHEN gs % 5 = 3 THEN 'Finalizado'
        ELSE 'Cancelado'
        END,
    (DATE '2023-01-01' + ((gs % 900) * INTERVAL '1 day'))::date
FROM generate_series(1, 8000) AS gs;

SELECT 'tutores' AS tabela, COUNT(*) AS total FROM tutores
UNION ALL
SELECT 'animais', COUNT(*) FROM animais
UNION ALL
SELECT 'adocoes', COUNT(*) FROM adocoes
UNION ALL
SELECT 'castracoes', COUNT(*) FROM castracoes
UNION ALL
SELECT 'denuncias', COUNT(*) FROM denuncias
UNION ALL
SELECT 'resgates', COUNT(*) FROM resgates;