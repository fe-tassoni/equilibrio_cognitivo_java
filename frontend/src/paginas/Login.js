
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn, getCurrentUser } from '@aws-amplify/auth';
import ConfirmacaoUsuario from './ConfirmacaoUsuario';

function Login({ onOpenEsqueciSenha, onClose }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState(false);
  const [showConfirmacao, setShowConfirmacao] = useState(false);
  const [emailParaConfirmar, setEmailParaConfirmar] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem('');
    setErro(false);
    try {
      const user = await signIn({ username: email, password: senha });
      setMensagem('Login realizado com sucesso! Conta confirmada.');
      setEmail(''); setSenha('');
      setTimeout(() => {
        if (onClose) onClose();
        navigate('/dashboard');
      }, 500);
    } catch (err) {
      console.log('Erro detalhado no login:', err);
      if (err.code === 'UserNotConfirmedException') {
        // Usuário não confirmado, abre modal de confirmação
        setEmailParaConfirmar(email);
        setShowConfirmacao(true);
        setMensagem('Usuário não confirmado. Informe o código de verificação.');
      } else if (err.code === 'NotAuthorizedException') {
        setMensagem('E-mail ou senha inválidos.');
      } else if (err.code === 'UserNotFoundException') {
        setMensagem('Usuário não encontrado.');
      } else {
        setMensagem('Usuário ou senha incorretos. Tente novamente.');
      }
      setErro(true);
    }
  };

  return (
    <div>
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
        <a href="#" className="link-secondary small" onClick={e => { e.preventDefault(); if (onOpenEsqueciSenha) { onOpenEsqueciSenha(); } }}>Esqueci minha senha</a>
      </div>
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
                  onConfirmado={async () => {
                    setShowConfirmacao(false);
                    setMensagem('Usuário confirmado!');
                    setErro(false);
                    // Tenta login novamente após confirmação
                    try {
                      await signIn({ username: emailParaConfirmar, password: senha });
                      navigate('/dashboard');
                    } catch (err) {
                      setMensagem('Erro ao logar após confirmação: ' + (err.message || 'Erro desconhecido.'));
                      setErro(true);
                    }
                  }}
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

export default Login;
