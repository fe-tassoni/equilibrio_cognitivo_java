
import React, { useState } from 'react';
import '../temas/tema.css';
import { signUp } from '@aws-amplify/auth';

function Cadastro() {
  // Validação de senha forte
  function senhaEhForte(senha) {
    // Mínimo 8 caracteres, pelo menos uma maiúscula, uma minúscula, um número e um símbolo
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    return regex.test(senha);
  }
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem('');
    setErro(false);
    if (!senhaEhForte(senha)) {
      setMensagem('A senha deve ter no mínimo 8 caracteres, incluindo letra maiúscula, minúscula, número e símbolo.');
      setErro(true);
      return;
    }
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
      if (err.name === 'UsernameExistsException' || (err.message && err.message.includes('User already exists'))) {
        setMensagem('E-mail já cadastrado');
      } else {
        setMensagem('Erro ao cadastrar: ' + (err.message || 'Erro desconhecido.'));
      }
      setErro(true);
    }
  };

  return (
    <div>
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
    </div>
  );
}

export default Cadastro;
