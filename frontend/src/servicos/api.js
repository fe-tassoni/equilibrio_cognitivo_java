/**
 * Faz uma requisição GET autenticada para uma rota protegida do backend.
 * @param {string} token JWT do Cognito
 * @param {string} rota Rota protegida (ex: /protegido/teste)
 * @returns {Promise<Response>} Resposta da API
 */
export async function getProtegido(token, rota = '/protegido/teste') {
  const resposta = await fetch(`${API_BASE}${rota}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return resposta;
}
// src/servicos/api.js
// Serviço centralizado para chamadas HTTP ao backend Java Spring Boot
// Altere a URL base conforme o ambiente (desenvolvimento/produção)

const API_BASE = 'http://equilibrio-cognitivo-dev.us-east-1.elasticbeanstalk.com/api';

/**
 * Faz uma requisição POST para o endpoint de cadastro de usuário.
 * @param {Object} dados Dados do usuário (nome, email, senha)
 * @returns {Promise<Response>} Resposta da API
 */
export async function cadastrarUsuario(dados) {
  const resposta = await fetch(`${API_BASE}/auth/cadastro`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  });
  return resposta;
}

/**
 * Faz uma requisição POST para o endpoint de login.
 */
export async function loginUsuario(dados) {
  const resposta = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  });
  return resposta;
}

/**
 * Faz uma requisição POST para o endpoint de recuperação de senha.
 */
export async function recuperarSenha(dados) {
  const resposta = await fetch(`${API_BASE}/auth/esqueci-senha`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  });
  return resposta;
}
