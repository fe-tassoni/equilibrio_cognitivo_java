
import React, { useState } from 'react';
import '../temas/tema.css';
import { resetPassword, confirmResetPassword } from '@aws-amplify/auth';

function EsqueciSenha() {
  // Validação de senha forte
  function senhaEhForte(senha) {
    // Mínimo 8 caracteres, pelo menos uma maiúscula, uma minúscula, um número e um símbolo
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    return regex.test(senha);
  }
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState(false);
  const [etapa, setEtapa] = useState('email'); // 'email' ou 'codigo'
  const [codigo, setCodigo] = useState('');
  const [novaSenha, setNovaSenha] = useState('');

  // Primeiro passo: solicitar recuperação
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem('');
    setErro(false);
    try {
      await resetPassword({ username: email });
      setMensagem('Código enviado para o e-mail. Insira o código e a nova senha abaixo.');
      setEtapa('codigo');
    } catch (err) {
      if (err.name === 'UserNotFoundException') {
        setMensagem('E-mail não cadastrado.');
      } else {
        setMensagem('Erro ao tentar recuperar a senha.');
      }
      setErro(true);
    }
  };

  // Segundo passo: confirmar código e nova senha
  const handleConfirm = async (e) => {
    e.preventDefault();
    setMensagem('');
    setErro(false);
    if (!senhaEhForte(novaSenha)) {
      setMensagem('A senha deve ter no mínimo 8 caracteres, incluindo letra maiúscula, minúscula, número e símbolo.');
      setErro(true);
      return;
    }
    try {
      await confirmResetPassword({ username: email, confirmationCode: codigo, newPassword: novaSenha });
      setMensagem('Senha redefinida com sucesso! Você já pode fazer login com a nova senha.');
      setEtapa('email');
      setEmail('');
      setCodigo('');
      setNovaSenha('');
    } catch (err) {
      if (err.name === 'CodeMismatchException') {
        setMensagem('Código inválido. Verifique o e-mail e tente novamente.');
      } else if (err.name === 'ExpiredCodeException') {
        setMensagem('Código expirado. Solicite uma nova recuperação de senha.');
      } else {
        setMensagem('Erro ao redefinir a senha.');
      }
      setErro(true);
    }
  };

  return (
    <div>
      <h2 className="mb-4 text-center text-info">Recuperar Senha</h2>
      {etapa === 'email' ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">E-mail cadastrado</label>
            <input type="email" className="form-control" id="email" name="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-info w-100 text-white">Enviar</button>
        </form>
      ) : (
        <form onSubmit={handleConfirm}>
          <div className="mb-3">
            <label htmlFor="codigo" className="form-label">Código recebido por e-mail</label>
            <input type="text" className="form-control" id="codigo" name="codigo" value={codigo} onChange={e => setCodigo(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="novaSenha" className="form-label">Nova senha</label>
            <input type="password" className="form-control" id="novaSenha" name="novaSenha" value={novaSenha} onChange={e => setNovaSenha(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-success w-100 text-white">Redefinir senha</button>
        </form>
      )}
      {mensagem && (
        <div className={`alert mt-3 ${erro ? 'alert-danger' : 'alert-success'}`}>{mensagem}</div>
      )}
    </div>
  );
}

export default EsqueciSenha;
