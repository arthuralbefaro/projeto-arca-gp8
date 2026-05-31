INSERT INTO usuarios (email, senha_hash, role, ativo)
VALUES ('admin.demo@arca.local', '$2b$12$L9kZ8AvGVV2Y4AZB9J3szO0jOuUVzXbWfe94H9F/W35..VYYj49lC', 'ADMIN', TRUE)
ON CONFLICT (email) DO NOTHING;
