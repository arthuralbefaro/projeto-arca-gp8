CREATE TABLE audit_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_type VARCHAR(50) NOT NULL,
    actor_user_id UUID REFERENCES usuarios(id) ON DELETE SET NULL,
    actor_email VARCHAR(255),
    target_type VARCHAR(50),
    target_id VARCHAR(100),
    ip_address VARCHAR(64),
    user_agent VARCHAR(512),
    metadata TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_audit_events_event_type ON audit_events(event_type);
CREATE INDEX idx_audit_events_actor_user_id ON audit_events(actor_user_id);
CREATE INDEX idx_audit_events_target ON audit_events(target_type, target_id);
CREATE INDEX idx_audit_events_created_at ON audit_events(created_at DESC);
