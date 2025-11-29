# Simulador de Vestibular — React + Vite

> Projeto SPA (Single Page Application) para simular provas, com interface responsiva usando **React-Bootstrap/Bootstrap** e navegação com **React Router**.

##  Visão Geral

O usuário escolhe um simulado, responde às questões e ao final visualiza o **desempenho** (acertos, percentual) e um **gabarito detalhado** destacando a alternativa correta e a marcada.

### Principais Funcionalidades
- Listagem e seleção de simulados.
- Execução de questões de múltipla escolha (A, B, C, D…).
- Resultado com **ProgressBar** e resumo.
- Gabarito detalhado por questão (correta vs. resposta do usuário).
- Layout responsivo com Navbar e grid do Bootstrap.

---

##  Tecnologias & Dependências

- **React**: ^19.1.1
- **React DOM**: ^19.1.1
- **React Router DOM**: ^7.9.2
- **Bootstrap**: ^5.3.8
- **React-Bootstrap**: ^2.10.10
- **React-Bootstrap-Icons**: ^1.11.6

**Dev**:
- @vitejs/plugin-react: ^5.0.3
- ESLint (@eslint/js, eslint-plugin-react-hooks, react-refresh): presente
- Vite: npm:rolldown-vite@7.1.12

> O projeto utiliza Vite com plugin React e ESLint configurado.

---

##  Como Executar Localmente

**Pré‑requisitos**
- Node.js LTS (recomendado ≥ 20) e npm (≥ 10).

**Passos**
```bash
# 1) Instalar dependências
npm install

# 2) Rodar em desenvolvimento (Vite dev server)
npm run dev

# 3) Build de produção
npm run build

# 4) Pré-visualizar o build
npm run preview
```

**Scripts disponíveis**
- `npm run dev` → `vite`
- `npm run build` → `vite build`
- `npm run lint` → `eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0`
- `npm run preview` → `vite preview`

---

Arquivos relevantes:
- `index.html`: “casca” da SPA (div `#root`).
- `src/main.jsx`: ponto de entrada; cria `<BrowserRouter>`, define `<Routes>`.
- `src/App.jsx`: layout base (Navbar/Header + `<Outlet />` para render das páginas).
- `src/pages/*`: páginas (Home, Detalhes, Simulado, Resultado, Config).
- `src/components/*`: componentes reutilizáveis (Header, QuestaoCard, ResultadoCard, SelecaoSimulado).
- `src/data/dadosSimulado.js`: dados estáticos de simulados e suas questões.

---

##  Rotas (definidas em `src/main.jsx`)

Trechos detectados (ilustrativo):
```jsx
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="configuracoes" element={<ConfigPage />} />
          <Route path="simulado/detalhes/:id" element={<SimuladoDetalhesPage />} />
          <Route path="simulado/:id" element={<SimuladoPage />} />
          <Route path="resultado" element={<ResultadoPage />} />
```

**Padrão de navegação**
- **Home** → lista/seleção de simulados.
- **Detalhes do Simulado** → descrição e botão “Iniciar”.
- **Simulado** → fluxo de questões; controla estado da resposta atual.
- **Resultado** → resumo + gabarito detalhado.

O layout é compartilhado via `<Outlet />` (rotas aninhadas).

---

##  Estado & Lógica (resumo)

- **SimuladoPage.jsx**: mantém o **estado** da questão atual e das **respostas**. Atualizações feitas de forma **imutável** (ex.: `setRespostas({ ...respostas, [id]: indice })`).
- **QuestaoCard.jsx**: componente **controlado** (recebe `respostaUsuario` por prop, emite `onRespostaSelecionada(index)`).
- **ResultadoPage.jsx**: lê `questoes` e `respostas` via `useLocation().state`, calcula acertos e percentual, e renderiza um `ResultadoCard` por questão.
- **ResultadoCard.jsx**: pinta correta como *success* e, se errou, a opção marcada como *danger*.
- **Dados** (`src/data/dadosSimulado.js`): cada questão contém `{ id, enunciado, opcoes, respostaCorreta }` (índice 0=A, 1=B…).
- **UI**: React-Bootstrap — `Container/Row/Col`, `Card`, `Button`, `ListGroup`, `ProgressBar`, `Alert`. Utilitários `mt-4`, `mb-3`, `ms-auto`, etc.

---

##  Estilo e Responsividade (Bootstrap)

- **Grid**: `Container`, `Row`, `Col`.
- **Utilitários**: `mt-4` (margin-top 1.5rem), `mb-3` (1rem), `ms-auto` (empurra itens à direita), `me-2` (margem ao lado).
- **Navbar**: `expand="lg"`, `Navbar.Toggle/Collapse` para mobile, links SPA com `as={{Link}}`.

---

##  Deploy

- **Build** estático com `npm run build` (saída em `dist/`).
- Pode ser publicado facilmente em **Vercel**, **Netlify** ou **GitHub Pages**.
- Se usar “base” diferente de `/`, configure `vite.config.js` conforme o host.

---

##  Configuração (variáveis de ambiente)

Atualmente, o app usa **dados locais** (`src/data/dadosSimulado.js`) e **não requer** variáveis de ambiente.  
Para integrações futuras (API), sugere-se `VITE_API_BASE_URL` no `.env` (lido pelo Vite).

---

### Créditos & Autoria
- Aplicação didática para disciplina de Desenvolvimento Web.
