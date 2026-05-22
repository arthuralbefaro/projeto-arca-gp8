CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE tutors (
                        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                        name VARCHAR(160) NOT NULL,
                        cpf VARCHAR(20) NOT NULL UNIQUE,
                        email VARCHAR(160),
                        phone VARCHAR(30) NOT NULL,
                        cep VARCHAR(20),
                        bairro VARCHAR(120) NOT NULL,
                        address VARCHAR(255),
                        requester_type VARCHAR(40) NOT NULL,
                        vulnerable_area BOOLEAN NOT NULL DEFAULT FALSE,
                        created_at TIMESTAMP NOT NULL
);

CREATE TABLE animals (
                         id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                         name VARCHAR(120) NOT NULL,
                         species VARCHAR(40) NOT NULL,
                         sex VARCHAR(40) NOT NULL,
                         quantity INTEGER NOT NULL DEFAULT 1,
                         vaccinated BOOLEAN,
                         risk_situation BOOLEAN NOT NULL DEFAULT FALSE,
                         created_at TIMESTAMP NOT NULL
);

CREATE TABLE service_requests (
                                  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                                  protocol VARCHAR(40) NOT NULL UNIQUE,
                                  type VARCHAR(40) NOT NULL,
                                  service VARCHAR(120) NOT NULL,
                                  status VARCHAR(40) NOT NULL,
                                  priority_score INTEGER NOT NULL DEFAULT 0,
                                  priority_label VARCHAR(40) NOT NULL,
                                  notes TEXT,
                                  tutor_id UUID NOT NULL REFERENCES tutors(id),
                                  animal_id UUID REFERENCES animals(id),
                                  created_at TIMESTAMP NOT NULL,
                                  updated_at TIMESTAMP NOT NULL
);

CREATE TABLE request_history (
                                 id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                                 request_id UUID NOT NULL REFERENCES service_requests(id) ON DELETE CASCADE,
                                 status VARCHAR(40) NOT NULL,
                                 note TEXT NOT NULL,
                                 created_at TIMESTAMP NOT NULL
);

CREATE INDEX idx_tutors_cpf ON tutors(cpf);
CREATE INDEX idx_service_requests_protocol ON service_requests(protocol);
CREATE INDEX idx_service_requests_status ON service_requests(status);
CREATE INDEX idx_service_requests_created_at ON service_requests(created_at);