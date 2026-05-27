CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE usuarios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'ADMIN',
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    criado_em TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE solicitacoes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    protocolo VARCHAR(30) NOT NULL UNIQUE,
    tipo VARCHAR(30) NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'RECEBIDO',
    tutor_nome VARCHAR(255) NOT NULL,
    tutor_cpf VARCHAR(11) NOT NULL,
    tutor_email VARCHAR(255),
    tutor_telefone VARCHAR(20),
    tutor_cep VARCHAR(9),
    tutor_bairro VARCHAR(100),
    tutor_endereco VARCHAR(500),
    tipo_solicitante VARCHAR(20) NOT NULL,
    tutor_nis VARCHAR(20),
    animal_nome VARCHAR(100),
    animal_especie VARCHAR(20),
    animal_sexo VARCHAR(30),
    animal_porte VARCHAR(20),
    animal_quantidade INTEGER NOT NULL DEFAULT 1,
    vacinado_raiva VARCHAR(20),
    animal_sintomas VARCHAR(20),
    situacao_risco BOOLEAN NOT NULL DEFAULT FALSE,
    area_vulneravel BOOLEAN NOT NULL DEFAULT FALSE,
    observacoes TEXT,
    prioridade_score INTEGER NOT NULL DEFAULT 0,
    prioridade_label VARCHAR(10) NOT NULL DEFAULT 'Baixa',
    criado_em TIMESTAMP NOT NULL DEFAULT NOW(),
    atualizado_em TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE historico_status (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    solicitacao_id UUID NOT NULL REFERENCES solicitacoes(id) ON DELETE CASCADE,
    status VARCHAR(30) NOT NULL,
    nota VARCHAR(500),
    data TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_solicitacoes_protocolo ON solicitacoes(protocolo);
CREATE INDEX idx_solicitacoes_tutor_cpf ON solicitacoes(tutor_cpf);
CREATE INDEX idx_solicitacoes_tutor_email ON solicitacoes(LOWER(tutor_email));
CREATE INDEX idx_solicitacoes_status ON solicitacoes(status);
CREATE INDEX idx_historico_solicitacao_id ON historico_status(solicitacao_id);
