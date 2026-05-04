# Projeto ARCA

Projeto front-end ARCA - Grupo 8.

O sistema contém as telas iniciais do projeto, como página inicial, login e cadastro de tutores.

O back-end ainda não está implementado, como eu havia comentado com vocês.

## Tecnologias usadas

- Next.js
- React
- JavaScript
- Bootstrap
- CSS
- Lucide React

## Páginas desenvolvidas

- Página inicial
- Tela de login
- Tela de cadastro de tutores

## Como executar o projeto

### 1. Abrir a pasta do projeto

Abra a pasta do projeto no VS Code.

### 2. Instalar as dependências

No terminal, dentro da pasta do projeto, execute:

```bash
npm install
```

### 3. Rodar o projeto

Depois da instalação, execute:

```bash
npm run dev
```

### 4. Abrir no navegador

Acesse:

```txt
http://localhost:3000
```

## Rotas disponíveis

```txt
/          Página inicial
/login     Tela de login
/registro  Cadastro de tutor
```

## Estrutura principal do projeto

```txt
src/
  app/
    page.js
    layout.js
    globals.css

    login/
      page.js

    registro/
      page.js

  components/
    layout/
      Header.jsx
      Footer.jsx

    forms/
      LoginForm.jsx
      RegisterTutorForm.jsx

    sections/
      HeroSection.jsx
      StepsSection.jsx
      PrioritySection.jsx

    ui/
      FormInput.jsx
      InfoCard.jsx
      ServiceCard.jsx

  lib/
    constants.js
```

## Sobre as telas

A página inicial apresenta o Programa ARCA, explicando o cadastro, a triagem e o atendimento aos tutores.

A tela de login permite que o tutor acesse futuramente sua conta no sistema.

A tela de cadastro permite que o tutor informe seus dados pessoais, endereço, telefone, e-mail e tipo de solicitante.

## Observação importante

Os formulários ainda não salvam dados.

A conexão com banco de dados e o back-end serão feitos futuramente em Java.

Por enquanto, o projeto serve como protótipo visual e front-end inicial do sistema.
