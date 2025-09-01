

import React, { useState } from 'react';
import '../temas/tema.css';
import { Auth } from '@aws-amplify/auth';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem('');
    setErro(false);
    try {
      const user = await Auth.signIn(email, senha);
      setMensagem('Login realizado com sucesso!');
      setEmail(''); setSenha('');
      // Aqui você pode redirecionar ou salvar o token se desejar
    } catch (err) {
      if (err.code === 'UserNotConfirmedException') {
        setMensagem('Usuário não confirmado. Verifique seu e-mail ou telefone.');
      } else if (err.code === 'NotAuthorizedException') {
        setMensagem('E-mail ou senha inválidos.');
      } else if (err.code === 'UserNotFoundException') {
        setMensagem('Usuário não encontrado.');
      } else {
        setMensagem('Erro ao conectar ao Cognito: ' + (err.message || 'Erro desconhecido.'));
      }
      setErro(true);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="card shadow p-4" style={{maxWidth: 400, width: '100%'}}>
        <h2 className="mb-4 text-center text-primary">Entrar</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">E-mail</label>
            <input type="email" className="form-control" id="email" name="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="senha" className="form-label">Senha</label>
            <input type="password" className="form-control" id="senha" name="senha" value={senha} onChange={e => setSenha(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary w-100">Entrar</button>
        </form>
        {mensagem && (
          <div className={`alert mt-3 ${erro ? 'alert-danger' : 'alert-success'}`}>{mensagem}</div>
        )}
        <div className="d-flex justify-content-between mt-3">
          <a href="/esqueci-senha" className="link-secondary small">Esqueci minha senha</a>
          <a href="/cadastro" className="link-success small">Criar conta</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
