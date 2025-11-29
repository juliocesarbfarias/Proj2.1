// Em: src/services/apiClient.js
// Cliente de API com fallback e suporte a URL absoluta (The Trivia API)

const FALLBACK = "https://the-trivia-api.com/v2";
const BASE_URL = (import.meta?.env?.VITE_API_BASE_URL) || FALLBACK;

function buildUrl(path) {
  
  if (/^https?:\/\//i.test(path)) return path;
  const base = (BASE_URL || "").replace(/\/$/, "");
  const p = (path || "").replace(/^\//, "");
  return `${base}/${p}`;
}

/**
 * Faz uma requisição GET e retorna JSON.
 * @param {string} path - caminho relativo (ex: "questions?...") ou URL absoluta
 * @param {{signal?: AbortSignal, headers?: Record<string,string>}} opts 
 * @returns {Promise<any>}
 */
export async function apiGet(path, { signal, headers } = {}) {
  const url = buildUrl(path);
  // Log útil na devtools
  console.log("-> GET:", url);
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      ...(headers || {})
    },
    signal
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} - ${res.statusText} | ${text}`);
  }
  return res.json();
}
const FASTAPI_BASE_URL = "http://127.0.0.1:8000";

/**
 * Faz uma requisição POST para nosso backend FastAPI e retorna JSON.
 * @param {string} path - caminho relativo 
 * @param {object} body - O objeto de dados a ser enviado 
 * @param {{signal?: AbortSignal, headers?: Record<string,string>}} opts 
 * @returns {Promise<any>}
 */
export async function apiPost(path, body, { signal, headers } = {}) {
  // Constrói a URL completa para o backend local
  const url = `${FASTAPI_BASE_URL}${path}`;
  
  // Log útil no console do navegador
  console.log("-> POST:", url, body);
  
  const res = await fetch(url, {
    method: "POST", // Método POST para enviar dados
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json", // Essencial para o FastAPI entender o JSON
      ...(headers || {})
    },
    body: JSON.stringify(body), // Transforma o objeto JS em texto JSON
    signal
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    // Tenta extrair a 'detail' do erro do FastAPI
    try {
      const errJson = JSON.parse(text);
      if (errJson.detail) {
        throw new Error(`Erro do Servidor: ${errJson.detail}`);
      }
    } catch (e) {
      // Falha no parse, só joga o erro HTTP
    }
    throw new Error(`HTTP ${res.status} - ${res.statusText} | ${text}`);
  }
  
  // Se a resposta for OK, retorna o JSON (a lista de questões)
  return res.json();
}

// 

/**
 * Faz a requisição de Login para o backend FastAPI.
 * Endpoint: /token
 * @param {string} username
 * @param {string} password
 * @returns {Promise<any>}
 */
export async function apiLogin(username, password) {
  const url = `${FASTAPI_BASE_URL}/token`;
  
  // O endpoint /token do FastAPI (OAuth2PasswordRequestForm)
  // espera os dados em "form-urlencoded", e NÃO em JSON.
  const params = new URLSearchParams();
  params.append('username', username);
  params.append('password', password);

  console.log("-> LOGIN:", url);

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params, // Envia os dados no formato de formulário
  });

  if (!res.ok) {
    // Tenta pegar o erro (ex: "Usuário ou senha incorretos")
    const errData = await res.json().catch(() => null);
    if (errData && errData.detail) {
      throw new Error(errData.detail);
    }
    throw new Error(`HTTP ${res.status} - Falha no login`);
  }

  // Se der certo, retorna os dados (ex: { access_token: "...", token_type: "bearer" })
  return res.json();
}

export async function apiGetInternal(path) {
  const url = `${FASTAPI_BASE_URL}${path}`;
  console.log("-> GET INTERNAL:", url);

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      // Se tiver autenticação no futuro, o token iria aqui
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Erro HTTP ${res.status}: ${text}`);
  }

  return res.json();
}