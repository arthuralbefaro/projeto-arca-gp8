INSERT INTO usuarios (email, senha_hash, role, ativo)
VALUES ('admin.demo@arca.local', '$2a$12$0Fcgz2/SB6Se2eWHh.JMs.DtZ4OHbFYP622vShQEcYhPrxnPWJZyy', 'ADMIN', TRUE)
ON CONFLICT (email) DO NOTHING;
