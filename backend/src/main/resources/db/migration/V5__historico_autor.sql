ALTER TABLE historico_status
    ADD COLUMN autor_usuario_id UUID,
    ADD COLUMN status_anterior VARCHAR(30);

ALTER TABLE historico_status
    ADD CONSTRAINT fk_historico_autor_usuario
        FOREIGN KEY (autor_usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL,
    ADD CONSTRAINT chk_historico_status_anterior
        CHECK (status_anterior IS NULL OR status_anterior IN ('RECEBIDO', 'TRIAGEM', 'PENDENTE', 'APROVADO', 'AGENDAMENTO', 'CONCLUIDO', 'RECUSADO'));

CREATE INDEX idx_historico_autor_usuario ON historico_status(autor_usuario_id);
