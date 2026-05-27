# Programa ARCA — Sistema de Atendimento Animal Digital

Sistema fullstack para cadastro, triagem e acompanhamento de solicitações do Programa ARCA da Prefeitura Municipal da Serra/ES.

## Stack

| Camada | Tecnologia |
|---|---|
| Frontend | Next.js 16, React 19, Bootstrap 5 |
| Backend | Java 21, Spring Boot 3.3, Maven |
| Banco | PostgreSQL 16 |
| Auth | JWT (JJWT 0.12) + Spring Security |
| Migrations | Flyway |
| Docs | SpringDoc OpenAPI (Swagger UI) |
| Container | Docker + Docker Compose |

---

## Início rápido com Docker

```bash
# 1. Clone o repositório
git clone <url-do-repositorio>
cd projeto-arca

# 2. Suba o banco + backend
docker compose up -d

# 3. Instale dependências e rode o frontend
npm install
npm run dev
```

- **Frontend**: http://localhost:3000
- **Backend / Swagger**: http://localhost:8080/swagger-ui.html
- **API Docs (JSON)**: http://localhost:8080/api-docs

---

## Execução sem Docker

### Pré-requisitos
- Java 21+
- PostgreSQL 16 rodando localmente

### Backend

```bash
# Criar banco manualmente
psql -U postgres -c "CREATE DATABASE arca_db;"
psql -U postgres -c "CREATE USER arca_user WITH PASSWORD 'arca_pass';"
psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE arca_db TO arca_user;"

# Subir o backend (Flyway roda as migrations automaticamente)
cd backend
./mvnw spring-boot:run
```

### Frontend

```bash
# Na raiz do projeto
npm install
npm run dev
```

---

## Variáveis de ambiente

Copie `.env.example` para `.env.local`:

```bash
cp .env.example .env.local
```

| Variável | Descrição | Default |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | URL base do backend | `http://localhost:8080` |
| `DATABASE_URL` | JDBC URL do PostgreSQL | `jdbc:postgresql://localhost:5432/arca_db` |
| `DATABASE_USER` | Usuário do banco | `arca_user` |
| `DATABASE_PASS` | Senha do banco | `arca_pass` |
| `JWT_SECRET` | Segredo JWT (mín. 32 chars) | — |
| `JWT_EXPIRATION_MS` | Validade do token em ms | `86400000` (24h) |
| `CORS_ALLOWED_ORIGINS` | Origins permitidas | `http://localhost:3000` |

---

## Credenciais padrão

```
E-mail: admin@arca.serra.es.gov.br
Senha:  admin123
```

---

## Endpoints da API

### Público

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/api/auth/login` | Login, retorna JWT |
| `POST` | `/api/solicitacoes` | Criar nova solicitação |
| `GET` | `/api/solicitacoes/consulta?q={query}` | Consultar por protocolo/CPF/email/nome |
| `GET` | `/api/health` | Health check |

### Admin (Bearer JWT obrigatório)

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/api/admin/solicitacoes` | Listar com filtros e paginação |
| `GET` | `/api/admin/solicitacoes/{id}` | Detalhe com histórico |
| `PATCH` | `/api/admin/solicitacoes/{id}/status` | Alterar status |
| `GET` | `/api/admin/stats` | Estatísticas do dashboard |

Documentação interativa completa: **http://localhost:8080/swagger-ui.html**

---

## Fluxo de status

```
RECEBIDO → TRIAGEM → PENDENTE → APROVADO → AGENDAMENTO → CONCLUIDO
                                                        ↘ RECUSADO
```

## Cálculo de prioridade automático

| Critério | Pontos |
|---|---|
| Tipo CADUNICO ou ONG | +3 |
| Tipo PROTETOR | +2 |
| Qtd. animais ≥ 3 | +2 |
| Situação de risco | +2 |
| Área vulnerável | +1 |
| **≥ 5 pontos** | **Alta** |
| **≥ 3 pontos** | **Média** |
| **< 3 pontos** | **Baixa** |

---

## Estrutura

```
projeto-arca/
├── src/                    # Frontend Next.js
│   ├── app/                # Páginas (App Router)
│   └── lib/api.js          # Cliente HTTP centralizado com JWT
├── backend/                # Spring Boot
│   └── src/main/java/br/gov/serra/arca/
│       ├── config/         # Security, CORS, Swagger
│       ├── security/       # JWT Provider e Filter
│       └── modules/        # auth, solicitacoes, historico, admin
├── docker-compose.yml
└── .env.example
```
