INSERT INTO tutores (
    nome,
    cpf,
    telefone,
    email,
    senha_hash,
    data_nascimento,
    tipo_solicitante,
    nis
)
SELECT
    'Tutor Munícipe ' || id,
    LPAD(id::text, 11, '0'),
    '(27) 99999-0000',
    'municipio' || id || '@email.com',
    'senha123',
    CURRENT_DATE - 8000,
    'MUNICIPE',
    NULL
FROM generate_series(1, 5000) AS id;

INSERT INTO tutores (
    nome,
    cpf,
    telefone,
    email,
    senha_hash,
    data_nascimento,
    tipo_solicitante,
    nis
)
SELECT
    'Tutor CadUnico ' || id,
    LPAD((id + 5000)::text, 11, '0'),
    '(27) 99999-1111',
    'cadunico' || id || '@email.com',
    'senha123',
    CURRENT_DATE - 9000,
    'CADUNICO',
    LPAD(id::text, 11, '0')
FROM generate_series(1, 5000) AS id;

INSERT INTO tutores (
    nome,
    cpf,
    telefone,
    email,
    senha_hash,
    data_nascimento,
    tipo_solicitante,
    nis
)
SELECT
    'Tutor Protetor ' || id,
    LPAD((id + 10000)::text, 11, '0'),
    '(27) 99999-2222',
    'protetor' || id || '@email.com',
    'senha123',
    CURRENT_DATE - 8500,
    'PROTETOR',
    NULL
FROM generate_series(1, 5000) AS id;

INSERT INTO tutores (
    nome,
    cpf,
    telefone,
    email,
    senha_hash,
    data_nascimento,
    tipo_solicitante,
    nis
)
SELECT
    'Tutor ONG ' || id,
    LPAD((id + 15000)::text, 11, '0'),
    '(27) 99999-3333',
    'ong' || id || '@email.com',
    'senha123',
    CURRENT_DATE - 9500,
    'ONG',
    NULL
FROM generate_series(1, 5000) AS id;


INSERT INTO enderecos (
    tutor_id,
    cep,
    logradouro,
    numero,
    bairro
)
SELECT
    id,
    '29100000',
    'Rua Laranjeiras',
    id::text,
    'Laranjeiras'
FROM generate_series(1, 4000) AS id;

INSERT INTO enderecos (
    tutor_id,
    cep,
    logradouro,
    numero,
    bairro
)
SELECT
    id,
    '29101000',
    'Rua Jacaraípe',
    id::text,
    'Jacaraípe'
FROM generate_series(4001, 8000) AS id;

INSERT INTO enderecos (
    tutor_id,
    cep,
    logradouro,
    numero,
    bairro
)
SELECT
    id,
    '29102000',
    'Rua Serra Sede',
    id::text,
    'Serra Sede'
FROM generate_series(8001, 12000) AS id;

INSERT INTO enderecos (
    tutor_id,
    cep,
    logradouro,
    numero,
    bairro
)
SELECT
    id,
    '29103000',
    'Rua Barcelona',
    id::text,
    'Barcelona'
FROM generate_series(12001, 16000) AS id;

INSERT INTO enderecos (
    tutor_id,
    cep,
    logradouro,
    numero,
    bairro
)
SELECT
    id,
    '29104000',
    'Rua Jardim Limoeiro',
    id::text,
    'Jardim Limoeiro'
FROM generate_series(16001, 20000) AS id;


INSERT INTO animais (
    tutor_id,
    nome,
    especie,
    raca,
    sexo,
    idade_aproximada,
    porte,
    status
)
SELECT
    id,
    'Cachorro ' || id,
    'Cachorro',
    'SRD',
    'Macho',
    '3 anos',
    'Médio',
    'Disponível'
FROM generate_series(1, 4000) AS id;

INSERT INTO animais (
    tutor_id,
    nome,
    especie,
    raca,
    sexo,
    idade_aproximada,
    porte,
    status
)
SELECT
    id,
    'Gato ' || id,
    'Gato',
    'SRD',
    'Fêmea',
    '2 anos',
    'Pequeno',
    'Disponível'
FROM generate_series(4001, 8000) AS id;

INSERT INTO animais (
    tutor_id,
    nome,
    especie,
    raca,
    sexo,
    idade_aproximada,
    porte,
    status
)
SELECT
    id,
    'Animal Tratamento ' || id,
    'Cachorro',
    'Poodle',
    'Fêmea',
    '5 anos',
    'Pequeno',
    'Em tratamento'
FROM generate_series(8001, 11000) AS id;

INSERT INTO animais (
    tutor_id,
    nome,
    especie,
    raca,
    sexo,
    idade_aproximada,
    porte,
    status
)
SELECT
    id,
    'Animal Adotado ' || id,
    'Gato',
    'Siamês',
    'Macho',
    '1 anos',
    'Pequeno',
    'Adotado'
FROM generate_series(11001, 15000) AS id;


INSERT INTO adocoes (
    tutor_id,
    animal_id,
    data_adocao,
    status,
    observacoes
)
SELECT
    id,
    id,
    CURRENT_DATE - 30,
    'Aprovada',
    'Adoção aprovada.'
FROM generate_series(1, 3000) AS id;

INSERT INTO adocoes (
    tutor_id,
    animal_id,
    data_adocao,
    status,
    observacoes
)
SELECT
    id,
    id,
    CURRENT_DATE - 60,
    'Solicitada',
    'Adoção solicitada.'
FROM generate_series(3001, 6000) AS id;

INSERT INTO adocoes (
    tutor_id,
    animal_id,
    data_adocao,
    status,
    observacoes
)
SELECT
    id,
    id,
    CURRENT_DATE - 90,
    'Recusada',
    'Adoção recusada.'
FROM generate_series(6001, 9000) AS id;

INSERT INTO adocoes (
    tutor_id,
    animal_id,
    data_adocao,
    status,
    observacoes
)
SELECT
    id,
    id,
    CURRENT_DATE - 120,
    'Cancelada',
    'Adoção cancelada.'
FROM generate_series(9001, 12000) AS id;


INSERT INTO castracoes (
    tutor_id,
    animal_id,
    especie,
    raca,
    sexo,
    porte,
    localizacao,
    status,
    data_solicitacao,
    observacoes
)
SELECT
    id,
    id,
    'Cachorro',
    'SRD',
    'Macho',
    'Médio',
    'Laranjeiras',
    'Solicitada',
    CURRENT_DATE - 20,
    'Solicitação cadastrada.'
FROM generate_series(1, 3000) AS id;

INSERT INTO castracoes (
    tutor_id,
    animal_id,
    especie,
    raca,
    sexo,
    porte,
    localizacao,
    status,
    data_solicitacao,
    observacoes
)
SELECT
    id,
    id,
    'Gato',
    'SRD',
    'Fêmea',
    'Pequeno',
    'Jacaraípe',
    'Em triagem',
    CURRENT_DATE - 40,
    'Solicitação em triagem.'
FROM generate_series(3001, 6000) AS id;

INSERT INTO castracoes (
    tutor_id,
    animal_id,
    especie,
    raca,
    sexo,
    porte,
    localizacao,
    status,
    data_solicitacao,
    observacoes
)
SELECT
    id,
    id,
    'Cachorro',
    'Poodle',
    'Fêmea',
    'Pequeno',
    'Serra Sede',
    'Agendada',
    CURRENT_DATE - 60,
    'Castração agendada.'
FROM generate_series(6001, 9000) AS id;

INSERT INTO castracoes (
    tutor_id,
    animal_id,
    especie,
    raca,
    sexo,
    porte,
    localizacao,
    status,
    data_solicitacao,
    observacoes
)
SELECT
    id,
    id,
    'Gato',
    'Siamês',
    'Macho',
    'Pequeno',
    'Barcelona',
    'Realizada',
    CURRENT_DATE - 90,
    'Castração realizada.'
FROM generate_series(9001, 12000) AS id;


INSERT INTO denuncias (
    tutor_id,
    tipo_denuncia,
    descricao,
    localizacao,
    bairro,
    status,
    data_denuncia
)
SELECT
    id,
    'Maus-tratos',
    'Denúncia de maus-tratos registrada.',
    'Rua da denúncia',
    'Laranjeiras',
    'Recebida',
    CURRENT_DATE - 10
FROM generate_series(1, 2000) AS id;

INSERT INTO denuncias (
    tutor_id,
    tipo_denuncia,
    descricao,
    localizacao,
    bairro,
    status,
    data_denuncia
)
SELECT
    id,
    'Abandono',
    'Denúncia de abandono registrada.',
    'Rua da denúncia',
    'Jacaraípe',
    'Em análise',
    CURRENT_DATE - 20
FROM generate_series(2001, 4000) AS id;

INSERT INTO denuncias (
    tutor_id,
    tipo_denuncia,
    descricao,
    localizacao,
    bairro,
    status,
    data_denuncia
)
SELECT
    id,
    'Animal ferido',
    'Denúncia de animal ferido registrada.',
    'Rua da denúncia',
    'Serra Sede',
    'Em atendimento',
    CURRENT_DATE - 30
FROM generate_series(4001, 6000) AS id;

INSERT INTO denuncias (
    tutor_id,
    tipo_denuncia,
    descricao,
    localizacao,
    bairro,
    status,
    data_denuncia
)
SELECT
    id,
    'Outro',
    'Outra denúncia registrada.',
    'Rua da denúncia',
    'Barcelona',
    'Finalizada',
    CURRENT_DATE - 40
FROM generate_series(6001, 8000) AS id;


INSERT INTO resgates (
    tutor_id,
    especie,
    descricao,
    localizacao,
    bairro,
    status,
    data_resgate
)
SELECT
    id,
    'Cachorro',
    'Solicitação de resgate de cachorro.',
    'Rua do resgate',
    'Laranjeiras',
    'Solicitado',
    CURRENT_DATE - 10
FROM generate_series(1, 2000) AS id;

INSERT INTO resgates (
    tutor_id,
    especie,
    descricao,
    localizacao,
    bairro,
    status,
    data_resgate
)
SELECT
    id,
    'Gato',
    'Solicitação de resgate de gato.',
    'Rua do resgate',
    'Jacaraípe',
    'Em análise',
    CURRENT_DATE - 20
FROM generate_series(2001, 4000) AS id;

INSERT INTO resgates (
    tutor_id,
    especie,
    descricao,
    localizacao,
    bairro,
    status,
    data_resgate
)
SELECT
    id,
    'Cachorro',
    'Solicitação de resgate em atendimento.',
    'Rua do resgate',
    'Serra Sede',
    'Em atendimento',
    CURRENT_DATE - 30
FROM generate_series(4001, 6000) AS id;

INSERT INTO resgates (
    tutor_id,
    especie,
    descricao,
    localizacao,
    bairro,
    status,
    data_resgate
)
SELECT
    id,
    'Gato',
    'Solicitação de resgate finalizada.',
    'Rua do resgate',
    'Barcelona',
    'Finalizado',
    CURRENT_DATE - 40
FROM generate_series(6001, 8000) AS id;


SELECT 'tutores' AS tabela, COUNT(*) AS total FROM tutores
UNION ALL
SELECT 'enderecos', COUNT(*) FROM enderecos
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