import React, { useState } from 'react';
import '../temas/tema.css';
import { signUp } from '@aws-amplify/auth';
import ConfirmacaoUsuario from './ConfirmacaoUsuario';

function Cadastro() {
  // Validação de senha forte
  function senhaEhForte(senha) {
    // Mínimo 8 caracteres, pelo menos uma maiúscula, uma minúscula, um número e um símbolo
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    return regex.test(senha);
  }
  
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState(false);
  const [showConfirmacao, setShowConfirmacao] = useState(false);
  const [emailParaConfirmar, setEmailParaConfirmar] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem('');
    setErro(false);
    
    // Validações básicas
    if (!nome.trim()) {
      setMensagem('Nome é obrigatório.');
      setErro(true);
      return;
    }
    
    if (!sobrenome.trim()) {
      setMensagem('Sobrenome é obrigatório.');
      setErro(true);
      return;
    }
    
    if (!senhaEhForte(senha)) {
      setMensagem('A senha deve ter no mínimo 8 caracteres, incluindo letra maiúscula, minúscula, número e símbolo.');
      setErro(true);
      return;
    }
    
    try {
      // Concatenar nome e sobrenome para o campo "name" obrigatório
      const nomeCompleto = `${nome.trim()} ${sobrenome.trim()}`;
      
      console.log('Tentando cadastrar com:', {
        username: email,
        attributes: {
          name: nomeCompleto,
          given_name: nome.trim(),
          family_name: sobrenome.trim(),
          email: email
        }
      });
      
      await signUp({
        username: email,
        password: senha,
        attributes: {
          name: nomeCompleto,           // Campo obrigatório - concatenação
          given_name: nome.trim(),      // Primeiro nome
          family_name: sobrenome.trim(), // Sobrenome
          email: email,                 // Campo obrigatório
        },
      });
      
  setMensagem('Usuário cadastrado com sucesso! Verifique seu e-mail para confirmação.');
  setEmailParaConfirmar(email);
  setShowConfirmacao(true);
  setNome(''); 
  setSobrenome(''); 
  setEmail(''); 
  setSenha('');
    } catch (err) {
      console.error('Erro detalhado no cadastro:', err);
      console.error('Erro name:', err.name);
      console.error('Erro message:', err.message);
      
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
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="nome" className="form-label">Nome *</label>
            <input 
              type="text" 
              className="form-control" 
              id="nome" 
              name="nome" 
              value={nome} 
              onChange={e => setNome(e.target.value)} 
              required 
              placeholder="João"
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="sobrenome" className="form-label">Sobrenome *</label>
            <input 
              type="text" 
              className="form-control" 
              id="sobrenome" 
              name="sobrenome" 
              value={sobrenome} 
              onChange={e => setSobrenome(e.target.value)} 
              required 
              placeholder="Silva"
            />
          </div>
        </div>
        
        {/* Campo escondido para mostrar o nome completo que será enviado */}
        {(nome.trim() || sobrenome.trim()) && (
          <div className="mb-3">
            <small className="text-muted">
              Nome completo: <strong>{nome.trim()} {sobrenome.trim()}</strong>
            </small>
          </div>
        )}
        
        <div className="mb-3">
          <label htmlFor="email" className="form-label">E-mail *</label>
          <input 
            type="email" 
            className="form-control" 
            id="email" 
            name="email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            required 
            placeholder="seu@email.com"
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="senha" className="form-label">Senha *</label>
          <input 
            type="password" 
            className="form-control" 
            id="senha" 
            name="senha" 
            value={senha} 
            onChange={e => setSenha(e.target.value)} 
            required 
            placeholder="Mínimo 8 caracteres"
          />
          <small className="form-text text-muted">
            Deve conter: maiúscula, minúscula, número e símbolo
          </small>
        </div>
        
        <button type="submit" className="btn btn-success w-100">Cadastrar</button>
      </form>
      
      {mensagem && (
        <div className={`alert mt-3 ${erro ? 'alert-danger' : 'alert-success'}`}>
          {mensagem}
        </div>
      )}
      {showConfirmacao && (
        <div className="modal fade show" style={{display: 'block', background: 'rgba(0,0,0,0.5)'}} tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmação de Cadastro</h5>
                <button type="button" className="btn-close" onClick={() => setShowConfirmacao(false)}></button>
              </div>
              <div className="modal-body">
                <ConfirmacaoUsuario
                  email={emailParaConfirmar}
                  onConfirmado={() => { setShowConfirmacao(false); setMensagem('Cadastro confirmado!'); setErro(false); }}
                  onClose={() => setShowConfirmacao(false)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cadastro;

