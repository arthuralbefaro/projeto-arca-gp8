CREATE TABLE auth_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    usuario_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    refresh_token_hash VARCHAR(64) NOT NULL UNIQUE,
    revogado BOOLEAN NOT NULL DEFAULT FALSE,
    criado_em TIMESTAMP NOT NULL DEFAULT NOW(),
    expira_em TIMESTAMP NOT NULL,
    ultimo_uso_em TIMESTAMP
);

CREATE INDEX idx_auth_sessions_usuario_id ON auth_sessions(usuario_id);
CREATE INDEX idx_auth_sessions_expira_em ON auth_sessions(expira_em);
CREATE UNIQUE INDEX ux_usuarios_email_lower ON usuarios (LOWER(email));

ALTER TABLE usuarios
    ADD CONSTRAINT chk_usuarios_role
        CHECK (role IN ('ADMIN')),
    ADD CONSTRAINT chk_usuarios_email_len
        CHECK (char_length(email) <= 255);

ALTER TABLE solicitacoes
    ADD CONSTRAINT chk_solicitacoes_tipo
        CHECK (tipo IN ('CADASTRO_TUTOR', 'CASTRACAO')),
    ADD CONSTRAINT chk_solicitacoes_status
        CHECK (status IN ('RECEBIDO', 'TRIAGEM', 'PENDENTE', 'APROVADO', 'AGENDAMENTO', 'CONCLUIDO', 'RECUSADO')),
    ADD CONSTRAINT chk_solicitacoes_tutor_cpf_digits
        CHECK (tutor_cpf ~ '^[0-9]{11}$'),
    ADD CONSTRAINT chk_solicitacoes_tipo_solicitante
        CHECK (tipo_solicitante IN ('TUTOR', 'CADUNICO', 'PROTETOR', 'ONG')),
    ADD CONSTRAINT chk_solicitacoes_animal_especie
        CHECK (animal_especie IS NULL OR animal_especie IN ('CACHORRO', 'GATO', 'AMBOS')),
    ADD CONSTRAINT chk_solicitacoes_vacinado_raiva
        CHECK (vacinado_raiva IS NULL OR vacinado_raiva IN ('SIM', 'NAO', 'NAO_INFORMADO')),
    ADD CONSTRAINT chk_solicitacoes_animal_sintomas
        CHECK (animal_sintomas IS NULL OR animal_sintomas IN ('SIM', 'NAO', 'NAO_INFORMADO')),
    ADD CONSTRAINT chk_solicitacoes_animal_quantidade
        CHECK (animal_quantidade BETWEEN 1 AND 100),
    ADD CONSTRAINT chk_solicitacoes_prioridade_score
        CHECK (prioridade_score BETWEEN 0 AND 20),
    ADD CONSTRAINT chk_solicitacoes_prioridade_label
        CHECK (prioridade_label IN ('Baixa', 'Média', 'Alta')),
    ADD CONSTRAINT chk_solicitacoes_observacoes_len
        CHECK (observacoes IS NULL OR char_length(observacoes) <= 2000);

ALTER TABLE historico_status
    ADD CONSTRAINT chk_historico_status
        CHECK (status IN ('RECEBIDO', 'TRIAGEM', 'PENDENTE', 'APROVADO', 'AGENDAMENTO', 'CONCLUIDO', 'RECUSADO')),
    ADD CONSTRAINT chk_historico_nota_len
        CHECK (nota IS NULL OR char_length(nota) <= 500);

CREATE INDEX idx_solicitacoes_protocolo_cpf ON solicitacoes(protocolo, tutor_cpf);
CREATE INDEX idx_solicitacoes_admin_order ON solicitacoes(prioridade_score DESC, criado_em ASC);
CREATE INDEX idx_historico_solicitacao_data ON historico_status(solicitacao_id, data ASC);
