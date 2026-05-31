# Programa ARCA — Atendimento e Registro de Cadastro Animal

> Plataforma institucional de atendimento animal para a Prefeitura da Serra/ES
> Projeto desenvolvido por Arthur Nascimento Albefaro Penna - Cauâ Robson Candeias Altino - Mitre Minassa Neto.

---

## Agradecimentos

Antes de qualquer linha técnica, precisamos registrar nossa gratidão.

**Professora Fabiana**, obrigado pelo acompanhamento ao longo de todo o desenvolvimento e pelos conteúdos apresentados durante a disciplina. Esse trabalho nos empurrou a estudar e aprofundar muito além do que sabíamos no começo do semestre, principalmente em **arquitetura, segurança e organização de sistemas**. O que parecia distante no início virou algo que hoje conseguimos construir, e isso é mérito da forma como a senhora conduziu as aulas.

**Professora Susilea**, muito obrigado também pela dedicação, pela paciência e por todo o conhecimento compartilhado. As suas contribuições foram fundamentais para que o projeto tenha sido executado com mais cuidado e responsabilidade.

A vocês duas, meu sincero **muito obrigado**. Este projeto carrega um pouco do que aprendi com cada uma. 🙏

---

## O que é este projeto

O ARCA é composto por duas partes que conversam entre si:

| Camada | Tecnologia | Porta |
|--------|------------|-------|
| **Frontend** | Next.js 16 + React 19 | `3000` |
| **Backend** | Spring Boot 3.3 (Java 21) | `8080` |
| **Banco de dados** | PostgreSQL 16 | `5432` |

A autenticação usa **JWT com cookies seguros e proteção CSRF**, e o banco é versionado com **Flyway** (as tabelas e os dados de demonstração são criados automaticamente na primeira execução).

---

## Como acessar o projeto

O projeto já está hospedado no GitHub pages, segue o link:

[https://arthuralbefaro.github.io/projeto-arca-gp8/]

---

## Como rodar (com Docker)

Esse é o jeito recomendado: sobe tudo de uma vez (banco, backend e frontend) sem precisar instalar Java, Node ou PostgreSQL na máquina. Só é preciso ter o **Docker** instalado

**1. Clone o repositório e entre na pasta:**

```bash
git clone <URL_DO_REPOSITORIO>
cd projeto-arca
```

**2. Crie um arquivo `.env` na raiz** (pode copiar do exemplo já incluído):

```bash
cp .env.example .env
```

O `.env.example` já vem com valores de demonstração prontos para uso local

**3. Suba tudo com um único comando:**

```bash
docker compose up -d --build
```

**4. Pronto!** Aguarde alguns segundos enquanto os serviços iniciam e acesse:

- **Frontend:** http://localhost:3000
- **Backend (API):** http://localhost:8080

Para **parar** tudo depois:

```bash
docker compose down
```

---

## Como rodar (sem Docker)

Caso você prefira rodar cada parte separadamente (útil para desenvolver e depurar), precisa ter instalado:

- **Java 21**
- **Node.js 18+** e **npm**
- **PostgreSQL 16** rodando localmente

### Banco de dados

Crie o banco e o usuário que o backend espera encontrar:

```sql
CREATE DATABASE arca_db;
CREATE USER arca_user WITH PASSWORD 'arca_demo_pass';
GRANT ALL PRIVILEGES ON DATABASE arca_db TO arca_user;
```

> O Flyway cuida das tabelas e dos dados de demonstração sozinho na primeira vez que o backend subir. Você não precisa criar tabela nenhuma na mão

### Backend (Spring Boot)

Entre na pasta do backend e configure as variáveis de ambiente mínimas. O perfil `dev` já habilita o Swagger e mensagens de erro detalhadas

**No Windows (PowerShell):**

```powershell
cd backend
$env:SPRING_PROFILES_ACTIVE = "dev"
$env:DATABASE_PASS = "arca_demo_pass"
$env:JWT_SECRET = "demo-only-change-before-production-32-bytes-minimum"
./mvnw spring-boot:run
```

**No Linux / macOS:**

```bash
cd backend
export SPRING_PROFILES_ACTIVE=dev
export DATABASE_PASS=arca_demo_pass
export JWT_SECRET=demo-only-change-before-production-32-bytes-minimum
./mvnw spring-boot:run
```

O backend ficará disponível em **http://localhost:8080**.

### Frontend (Next.js)

Em **outro terminal**, na raiz do projeto:

```bash
npm install
npm run dev
```

O frontend abrirá em **http://localhost:3000** e já estará apontando para o backend em `localhost:8080` por padrão.

---

## Login de demonstração

Para entrar na área administrativa:

```txt
Email: admin.demo@arca.local
Senha: Demo@123
```

---

## Documentação da API

Quando o backend roda no perfil `dev` (ou com `SWAGGER_ENABLED=true`), a documentação interativa fica disponível em:

```txt
http://localhost:8080/swagger-ui.html
```

---

## Estrutura resumida

```
projeto-arca/
├── src/                  # Frontend (Next.js / React)
│   └── lib/api.js        # Único ponto de acesso HTTP ao backend
├── backend/              # API Spring Boot (Java 21)
│   └── src/main/resources/db/migration/   # Migrations Flyway
├── docker-compose.yml    # Orquestração dos 3 serviços
└── .env.example          # Modelo de variáveis de ambiente
```
