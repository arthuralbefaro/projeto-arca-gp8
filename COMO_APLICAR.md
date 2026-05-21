# Como aplicar as alterações

1. Baixe e descompacte este pacote.
2. Copie as pastas e arquivos para a raiz do repositório `projeto-arca-gp8`.
3. Aceite substituir os arquivos existentes.
4. No terminal, rode:

```bash
npm run build
```

5. Se o build passar, faça:

```bash
git add .
git commit -m "implementa prototipo funcional arca"
git push origin main
```

6. No GitHub, confirme que o Pages está usando:

```txt
Settings → Pages → Build and deployment → Source → GitHub Actions
```

## Arquivos adicionados ou substituídos

- `next.config.mjs`
- `.github/workflows/deploy.yml`
- `README.md`
- `src/lib/constants.js`
- `src/lib/arcaStorage.js`
- `src/app/page.js`
- `src/app/registro/page.js`
- `src/app/consulta/page.js`
- `src/app/documentos/page.js`
- `src/app/servicos/castracao/page.js`
- `src/app/admin/relatorios/page.js`
- `src/components/layout/Header.jsx`
- `src/components/layout/Footer.jsx`
- `src/components/forms/RegisterTutorForm.jsx`
- `src/components/forms/ConsultaForm.jsx`
- `src/components/forms/CastracaoForm.jsx`
- `src/components/admin/AdminDashboard.jsx`
- `src/components/ui/FormInput.jsx`
- `src/components/ui/StatCard.jsx`
- `src/components/ui/StatusBadge.jsx`

## Funcionalidades entregues

- Home mais clara e institucional.
- Menu público sem relatório administrativo exposto no topo.
- Página de documentos.
- Cadastro com protocolo.
- Solicitação de castração com protocolo.
- Consulta por protocolo, CPF ou e-mail.
- Linha do tempo da solicitação.
- Painel admin demo com filtros e alteração de status.
- Persistência via `localStorage`.
- Compatibilidade com GitHub Pages.
