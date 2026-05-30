# Como executar o projeto

1. Clone o repositório:

```bash
git clone <URL_DO_REPOSITORIO>
```

2. Entre na pasta do projeto:

```bash
cd projeto-arca
```

3. Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
POSTGRES_DB=arca
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres

JWT_SECRET=uma_chave_segura_aqui

SPRING_PROFILES_ACTIVE=dev
```

4. Execute o projeto com Docker:

```bash
docker compose up -d --build
```

---

# Acessos

Frontend:

```txt
http://localhost:3000
```

Backend:

```txt
http://localhost:8080
```

Swagger:

```txt
http://localhost:8080/swagger-ui.html
```

---

# Login de demonstração

```txt
Email: admin.demo@arca.local
Senha: Demo@123
```

---

Professora Fabiana, obrigado pelo acompanhamento durante o desenvolvimento do projeto e pelos conteúdos apresentados ao longo da disciplina. Esse trabalho acabou me fazendo estudar e aprofundar bastante coisas além do que eu conhecia no começo do semestre, principalmente sobre arquitetura, segurança e organização de sistemas.
