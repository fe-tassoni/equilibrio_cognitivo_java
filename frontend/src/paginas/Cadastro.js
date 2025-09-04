
import React, { useState } from 'react';
import '../temas/tema.css';
import { signUp } from '@aws-amplify/auth';

function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem('');
    setErro(false);
    try {
      await signUp({
        username: email,
        password: senha,
        attributes: {
          name: nome,
          email: email,
        },
      });
      setMensagem('Usuário cadastrado com sucesso! Verifique seu e-mail para confirmação.');
      setNome(''); setEmail(''); setSenha('');
    } catch (err) {
      setMensagem('Erro ao cadastrar: ' + (err.message || 'Erro desconhecido.'));
      setErro(true);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="card shadow p-4" style={{maxWidth: 450, width: '100%'}}>
        <h2 className="mb-4 text-center text-success">Criar Conta</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nome" className="form-label">Nome</label>
            <input type="text" className="form-control" id="nome" name="nome" value={nome} onChange={e => setNome(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">E-mail</label>
            <input type="email" className="form-control" id="email" name="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="senha" className="form-label">Senha</label>
            <input type="password" className="form-control" id="senha" name="senha" value={senha} onChange={e => setSenha(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-success w-100">Cadastrar</button>
        </form>
        {mensagem && (
          <div className={`alert mt-3 ${erro ? 'alert-danger' : 'alert-success'}`}>{mensagem}</div>
        )}
        <div className="d-flex justify-content-end mt-3">
          <a href="/login" className="link-primary small">Já tenho conta</a>
        </div>
      </div>
    </div>
  );
}

export default Cadastro;
