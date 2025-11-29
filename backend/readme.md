# Simulador de Vestibular Online (Full-Stack)

Este é um projeto de desenvolvimento web full-stack que consiste em um frontend em **React** e um backend em **FastAPI (Python)**. A aplicação principal é um simulador de vestibular que gera questões sob demanda utilizando a API generativa do Google (Gemini).

O projeto implementa um sistema completo de **Autenticação (5%)** e **Autorização baseada em Regras (10%)**, além de funcionalidades modernas de interface como Modo Escuro e gerenciamento de perfil de usuário.


## Funcionalidades Principais

Este projeto vai além de um CRUD básico, implementando funcionalidades de segurança e experiência de usuário:

* **Autenticação de Usuários:** Sistema de login seguro utilizando **Tokens JWT (JSON Web Tokens)**.
* **Autorização baseada em Regras (Roles):** O sistema diferencia usuários `free` e `premium`:
    * **Usuários `free`:** Podem gerar simulados com no máximo 5 questões.
    * **Usuários `premium`:** Podem gerar até 50 questões.
* **Rotas Protegidas (Frontend):** O usuário é automaticamente redirecionado para a página `/login` se tentar acessar uma rota protegida (como `/simulado` ou `/usuario`) sem estar logado.
* **Gerenciamento de Estado Global (React Context):**
    * `AuthContext`: Gerencia o estado de autenticação (token, dados do usuário) e o armazena no `localStorage`.
    * `ThemeContext`: Gerencia o tema da aplicação (Claro/Escuro), também salvo no `localStorage`.
* **Página de Perfil Dinâmica:** A página `/usuario` exibe o nome, o tipo de conta (`free`/`premium`) e a data/hora do último login.
* **Header Dinâmico:** O cabeçalho muda condicionalmente, mostrando "Login" para visitantes e "Usuário" para usuários autenticados.
* **Modo Escuro (Dark Mode):** Na página de "Configurações", o usuário pode alternar o tema, e o `ThemeContext` aplica a mudança instantaneamente em todo o site usando o suporte nativo do Bootstrap 5 (`data-bs-theme`).

## Tecnologias Utilizadas

#### Frontend (`simulador-react-trivia-api/`)

* **React** (com Vite)
* **React Router:** Para gerenciamento de rotas (incluindo rotas protegidas).
* **React Bootstrap:** Para componentes de UI (Navbar, Cards, Forms).
* **React Context API:** Para gerenciamento de estado global (Auth e Theme).
* `fetch` (ES6): Para realizar chamadas à API do backend.

#### Backend (`backend/`)

* **Python 3**
* **FastAPI:** Para a construção da API REST.
* **Uvicorn:** Como servidor ASGI.
* **`passlib==1.7.4`:** Para criptografia e verificação de senhas.
* **`bcrypt==4.0.1`:** A dependência de criptografia.
* **`python-jose`:** Para criação e validação de Tokens JWT.
* **`python-dotenv`:** Para gerenciamento de variáveis de ambiente (chaves de API).
* **`google-generativeai`:** Para integração com a IA do Google Gemini.

## Como Executar o Projeto

Este projeto possui duas partes (backend e frontend) que devem ser executadas em **dois terminais separados**.

*(Os caminhos abaixo são exemplos e devem ser ajustados para o seu computador, ex: `Proj2.1`)*

---

### 1. Terminal 1: Backend (FastAPI)

1.  **Navegue até a pasta do backend:**
    ```bash
    cd C:\caminho\para\o\projeto\backend
    ```

2.  **Dê permissão ao PowerShell (necessário 1 vez por terminal):**
    ```powershell
    Set-ExecutionPolicy Bypass -Scope Process
    ```

3.  **Crie e Ative o Ambiente Virtual (venv):**
    ```powershell
    # 1. Crie o venv (só na primeira vez)
    python -m venv venv
    
    # 2. Ative o venv (toda vez que for rodar)
    .\venv\Scripts\Activate.ps1
    ```
    *(Seu prompt deve mudar para `(venv) PS C:\...`)*

4.  **Instale as dependências:**
    ```powershell
    # 1. Instale as dependências do requirements.txt
    pip install -r requirements.txt
    
    # 2. IMPORTANTE: Instale as versões exatas de segurança
    # (Isso previne o erro de conflito do 'bcrypt')
    pip install "passlib==1.7.4" "bcrypt==4.0.1" "python-jose"
    ```

5.  **Crie o arquivo `.env`:**
    * Na pasta `backend/`, crie um arquivo chamado `.env`.
    * Cole o conteúdo abaixo dentro dele, substituindo pela sua chave do Gemini:
    ```env
    GEMINI_API_KEY=SUA_CHAVE_SECRETA_DO_GEMINI_VAI_AQUI
    SECRET_KEY=09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7
    ```

6.  **Inicie o servidor do backend:**
    ```powershell
    uvicorn main:app --reload
    ```
    *(O servidor estará rodando em `http://127.0.0.1:8000`)*

---

### 2. Terminal 2: Frontend (React)

1.  **Abra um NOVO terminal** (deixe o Terminal 1 rodando).

2.  **Navegue até a pasta do frontend:**
    ```bash
    cd C:\caminho\para\o\projeto\simulador-react-trivia-api
    ```

3.  **Dê permissão ao PowerShell:**
    ```powershell
    Set-ExecutionPolicy Bypass -Scope Process
    ```

4.  **Instale os pacotes (apenas na primeira vez):**
    ```powershell
    npm install
    ```

5.  **Inicie o servidor do frontend:**
    ```powershell
    npm run dev
    ```
    *(O servidor estará rodando em `http://localhost:5173`)*

---

## Endpoints da API (Backend)

* `POST /token`: Realiza o login. Recebe `username` e `password` (em form-data) e retorna um `access_token` JWT.
* `POST /users/`: (Aberto) Registra um novo usuário no "banco de dados falso".
* `POST /gerar-simulado/{vestibular_id}`: **(Protegido)** Gera um simulado. Requer um Header `Authorization: Bearer <token>`. Respeita as regras de `free` (<=5 questões) e `premium` (<=50).
* `GET /`: Endpoint raiz para verificar se a API está online.