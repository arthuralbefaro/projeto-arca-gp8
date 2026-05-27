INSERT INTO usuarios (email, senha_hash, role, ativo)
VALUES ('admin@arca.serra.es.gov.br', '$2a$12$OL1jBLBZdcm2lZ/tUJqkBunqLXnrGJiPxrgI.7d0HPhMFNbRryvuq', 'ADMIN', TRUE)
ON CONFLICT (email) DO NOTHING;
