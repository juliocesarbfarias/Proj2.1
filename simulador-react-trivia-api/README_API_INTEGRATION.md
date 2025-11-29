# Integração de API (Exemplo)

Este exemplo adiciona:
- `.env` com `VITE_API_BASE_URL`
- `src/services/apiClient.js` (cliente de API)
- `src/hooks/useUsers.js` (hook de dados)
- `src/pages/ApiDemoPage.jsx` (página de exemplo)
- Rotas e link no Header para `/api-demo`

## Como testar
1. Instale dependências (se ainda não): `npm install`
2. Crie/edite o arquivo `.env` na raiz:
   ```env
   VITE_API_BASE_URL=https://jsonplaceholder.typicode.com
   ```
3. Rode em desenvolvimento: `npm run dev`
4. Acesse `http://localhost:5173/api-demo` (ou porta exibida) para ver a lista de usuários.

## Como trocar a API
Altere `VITE_API_BASE_URL` no `.env` para sua API real e ajuste o hook para a rota desejada (ex.: `"alunos"`, `"questoes"`, etc.).

## Simulado via The Trivia API
- Rota: `/simulado-api/:id` (ex.: `/simulado-api/UNICAMP`, `/simulado-api/FUVEST`)
- Ajuste categorias no mapa do `useQuestions.js` conforme a prova.
- .env padrão: `VITE_API_BASE_URL=https://the-trivia-api.com/v2` (existe fallback).

