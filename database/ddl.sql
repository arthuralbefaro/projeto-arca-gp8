DROP TABLE IF EXISTS resgates CASCADE;
DROP TABLE IF EXISTS denuncias CASCADE;
DROP TABLE IF EXISTS castracoes CASCADE;
DROP TABLE IF EXISTS adocoes CASCADE;
DROP TABLE IF EXISTS animais CASCADE;
DROP TABLE IF EXISTS enderecos CASCADE;
DROP TABLE IF EXISTS tutores CASCADE;

CREATE TABLE tutores (
                         id BIGSERIAL,
                         nome VARCHAR(150) NOT NULL,
                         cpf VARCHAR(11) NOT NULL,
                         telefone VARCHAR(20) NOT NULL,
                         email VARCHAR(120) NOT NULL,
                         senha_hash VARCHAR(255) NOT NULL,
                         data_nascimento DATE NOT NULL,
                         tipo_solicitante VARCHAR(30) NOT NULL,
                         nis VARCHAR(20),
                         criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

                         CONSTRAINT pk_tutores PRIMARY KEY (id),
                         CONSTRAINT uq_tutores_cpf UNIQUE (cpf),
                         CONSTRAINT uq_tutores_email UNIQUE (email),
                         CONSTRAINT ck_tutores_nome CHECK (LENGTH(nome) >= 3),
                         CONSTRAINT ck_tutores_cpf CHECK (LENGTH(cpf) = 11),
                         CONSTRAINT ck_tutores_email CHECK (email LIKE '%@%'),
                         CONSTRAINT ck_tutores_tipo CHECK (tipo_solicitante IN ('MUNICIPE', 'CADUNICO', 'PROTETOR', 'ONG'))
);

CREATE TABLE enderecos (
                           id BIGSERIAL,
                           tutor_id BIGINT NOT NULL,
                           cep VARCHAR(8) NOT NULL,
                           logradouro VARCHAR(150) NOT NULL,
                           numero VARCHAR(20) NOT NULL,
                           bairro VARCHAR(100) NOT NULL,
                           cidade VARCHAR(80) NOT NULL DEFAULT 'Serra',
                           uf VARCHAR(2) NOT NULL DEFAULT 'ES',

                           CONSTRAINT pk_enderecos PRIMARY KEY (id),
                           CONSTRAINT fk_enderecos_tutor FOREIGN KEY (tutor_id) REFERENCES tutores(id),
                           CONSTRAINT ck_enderecos_cep CHECK (LENGTH(cep) = 8),
                           CONSTRAINT ck_enderecos_cidade CHECK (cidade = 'Serra'),
                           CONSTRAINT ck_enderecos_uf CHECK (uf = 'ES')
);

CREATE TABLE animais (
                         id BIGSERIAL,
                         tutor_id BIGINT,
                         nome VARCHAR(100) NOT NULL,
                         especie VARCHAR(20) NOT NULL,
                         raca VARCHAR(100) NOT NULL,
                         sexo VARCHAR(10) NOT NULL,
                         idade_aproximada VARCHAR(50) NOT NULL,
                         porte VARCHAR(20) NOT NULL,
                         status VARCHAR(30) NOT NULL,

                         CONSTRAINT pk_animais PRIMARY KEY (id),
                         CONSTRAINT fk_animais_tutor FOREIGN KEY (tutor_id) REFERENCES tutores(id),
                         CONSTRAINT ck_animais_especie CHECK (especie IN ('Cachorro', 'Gato')),
                         CONSTRAINT ck_animais_sexo CHECK (sexo IN ('Macho', 'Fêmea')),
                         CONSTRAINT ck_animais_porte CHECK (porte IN ('Pequeno', 'Médio', 'Grande')),
                         CONSTRAINT ck_animais_status CHECK (status IN ('Disponível', 'Adotado', 'Em tratamento', 'Com tutor'))
);

CREATE TABLE adocoes (
                         id BIGSERIAL,
                         tutor_id BIGINT NOT NULL,
                         animal_id BIGINT NOT NULL,
                         data_adocao DATE NOT NULL,
                         status VARCHAR(30) NOT NULL,
                         observacoes TEXT,

                         CONSTRAINT pk_adocoes PRIMARY KEY (id),
                         CONSTRAINT fk_adocoes_tutor FOREIGN KEY (tutor_id) REFERENCES tutores(id),
                         CONSTRAINT fk_adocoes_animal FOREIGN KEY (animal_id) REFERENCES animais(id),
                         CONSTRAINT ck_adocoes_status CHECK (status IN ('Solicitada', 'Aprovada', 'Recusada', 'Cancelada'))
);

CREATE TABLE castracoes (
                            id BIGSERIAL,
                            tutor_id BIGINT NOT NULL,
                            animal_id BIGINT,
                            especie VARCHAR(20) NOT NULL,
                            raca VARCHAR(100) NOT NULL,
                            sexo VARCHAR(10) NOT NULL,
                            porte VARCHAR(20) NOT NULL,
                            localizacao VARCHAR(180) NOT NULL,
                            status VARCHAR(30) NOT NULL,
                            data_solicitacao DATE NOT NULL,
                            observacoes TEXT,

                            CONSTRAINT pk_castracoes PRIMARY KEY (id),
                            CONSTRAINT fk_castracoes_tutor FOREIGN KEY (tutor_id) REFERENCES tutores(id),
                            CONSTRAINT fk_castracoes_animal FOREIGN KEY (animal_id) REFERENCES animais(id),
                            CONSTRAINT ck_castracoes_especie CHECK (especie IN ('Cachorro', 'Gato')),
                            CONSTRAINT ck_castracoes_sexo CHECK (sexo IN ('Macho', 'Fêmea')),
                            CONSTRAINT ck_castracoes_porte CHECK (porte IN ('Pequeno', 'Médio', 'Grande')),
                            CONSTRAINT ck_castracoes_status CHECK (status IN ('Solicitada', 'Em triagem', 'Agendada', 'Realizada', 'Cancelada'))
);

CREATE TABLE denuncias (
                           id BIGSERIAL,
                           tutor_id BIGINT,
                           tipo_denuncia VARCHAR(50) NOT NULL,
                           descricao TEXT NOT NULL,
                           localizacao VARCHAR(180) NOT NULL,
                           bairro VARCHAR(100) NOT NULL,
                           status VARCHAR(30) NOT NULL,
                           data_denuncia DATE NOT NULL,

                           CONSTRAINT pk_denuncias PRIMARY KEY (id),
                           CONSTRAINT fk_denuncias_tutor FOREIGN KEY (tutor_id) REFERENCES tutores(id),
                           CONSTRAINT ck_denuncias_tipo CHECK (tipo_denuncia IN ('Maus-tratos', 'Abandono', 'Animal ferido', 'Outro')),
                           CONSTRAINT ck_denuncias_status CHECK (status IN ('Recebida', 'Em análise', 'Em atendimento', 'Finalizada'))
);

CREATE TABLE resgates (
                          id BIGSERIAL,
                          tutor_id BIGINT,
                          especie VARCHAR(20) NOT NULL,
                          descricao TEXT NOT NULL,
                          localizacao VARCHAR(180) NOT NULL,
                          bairro VARCHAR(100) NOT NULL,
                          status VARCHAR(30) NOT NULL,
                          data_resgate DATE NOT NULL,

                          CONSTRAINT pk_resgates PRIMARY KEY (id),
                          CONSTRAINT fk_resgates_tutor FOREIGN KEY (tutor_id) REFERENCES tutores(id),
                          CONSTRAINT ck_resgates_especie CHECK (especie IN ('Cachorro', 'Gato')),
                          CONSTRAINT ck_resgates_status CHECK (status IN ('Solicitado', 'Em análise', 'Em atendimento', 'Finalizado'))
);

CREATE INDEX idx_animais_especie ON animais(especie);
CREATE INDEX idx_animais_status ON animais(status);
CREATE INDEX idx_adocoes_data ON adocoes(data_adocao);
CREATE INDEX idx_castracoes_data ON castracoes(data_solicitacao);
CREATE INDEX idx_denuncias_data ON denuncias(data_denuncia);
CREATE INDEX idx_resgates_data ON resgates(data_resgate);