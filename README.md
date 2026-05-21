# Projeto ARCA

Protótipo front-end do Programa ARCA, voltado para cadastro de tutores, solicitação de castração, consulta de protocolo e acompanhamento administrativo demonstrativo.

## O que o projeto faz

- Página inicial institucional do Programa ARCA.
- Cadastro de tutor com geração de protocolo.
- Solicitação de castração com protocolo próprio.
- Consulta de solicitação por protocolo, CPF ou e-mail.
- Linha do tempo de status da solicitação.
- Página de documentos necessários.
- Painel administrativo demonstrativo.
- Filtros por status, bairro e espécie.
- Alteração de status no painel administrativo.
- Dados persistidos no navegador via `localStorage`.

> Esta versão não usa backend. Ela foi preparada para funcionar como protótipo estático no GitHub Pages.

## Tecnologias usadas

- Next.js
- React
- JavaScript
- Bootstrap
- CSS
- Lucide React
- GitHub Pages

## Rotas disponíveis

```txt
/                         Página inicial
/registro                 Cadastro de tutor
/servicos/castracao       Solicitação de castração
/consulta                 Consulta de protocolo
/documentos               Documentos necessários
/login                    Tela de login
/admin/relatorios         Painel administrativo demo
```

## Como testar localmente

### 1. Instalar dependências

```bash
npm install
```

### 2. Rodar em desenvolvimento

```bash
npm run dev
```

Depois acesse:

```txt
http://localhost:3000
```

## Dados de demonstração

O sistema cria alguns cadastros simulados automaticamente no navegador.

Protocolo para teste:

```txt
ARCA-2026-0001
```

Você também pode criar um novo cadastro pela rota:

```txt
/registro
```

Ou uma solicitação direta de castração pela rota:

```txt
/servicos/castracao
```

Depois consulte o status em:

```txt
/consulta
```

## Painel administrativo

Acesse:

```txt
/admin/relatorios
```

No painel é possível:

- Ver totais gerais.
- Filtrar solicitações.
- Ver demanda por bairro.
- Ver demanda por espécie.
- Alterar status da solicitação.
- Restaurar dados de demonstração.

## Deploy no GitHub Pages

O projeto está configurado para gerar exportação estática com Next.js.

Arquivo principal:

```txt
next.config.mjs
```

Configuração usada:

```js
output: 'export'
```

O deploy é feito via GitHub Actions em:

```txt
.github/workflows/deploy.yml
```

No GitHub, configure:

```txt
Settings → Pages → Build and deployment → Source → GitHub Actions
```

Depois faça commit e push na branch `main`.

## Observação importante

Como o projeto está em GitHub Pages, ele não roda backend Node/Java. Por isso, os dados ficam salvos no navegador com `localStorage`.

Para transformar em sistema real, o próximo passo seria conectar o front-end a um backend Java com banco PostgreSQL.
