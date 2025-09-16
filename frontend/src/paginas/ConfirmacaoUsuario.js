import React, { useState } from 'react';
import '../temas/tema.css';
import { confirmSignUp, resendSignUpCode } from '@aws-amplify/auth';

function ConfirmacaoUsuario({ email, onConfirmado, onClose }) {
  const [codigo, setCodigo] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState(false);
  const [reenviando, setReenviando] = useState(false);

  const handleConfirmar = async (e) => {
    e.preventDefault();
    setMensagem('');
    setErro(false);
    try {
      await confirmSignUp({ username: email, confirmationCode: codigo });
      setMensagem('Usuário confirmado com sucesso!');
      setCodigo('');
      if (onConfirmado) onConfirmado();
    } catch (err) {
      setMensagem('Erro ao confirmar: ' + (err.message || 'Erro desconhecido.'));
      setErro(true);
    }
  };

  const handleReenviar = async () => {
    setReenviando(true);
    setMensagem('');
    setErro(false);
    try {
      await resendSignUpCode({ username: email });
      setMensagem('Novo código enviado para seu e-mail.');
    } catch (err) {
      setMensagem('Erro ao reenviar código: ' + (err.message || 'Erro desconhecido.'));
      setErro(true);
    }
    setReenviando(false);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center text-warning">Confirmação de Cadastro</h2>
      <form onSubmit={handleConfirmar}>
        <div className="mb-3">
          <label htmlFor="codigo" className="form-label">Código de Verificação *</label>
          <input
            type="text"
            className="form-control"
            id="codigo"
            name="codigo"
            value={codigo}
            onChange={e => setCodigo(e.target.value)}
            required
            placeholder="Informe o código recebido por e-mail"
          />
        </div>
        <button type="submit" className="btn btn-warning w-100 mb-2">Confirmar</button>
        <button type="button" className="btn btn-outline-secondary w-100" onClick={handleReenviar} disabled={reenviando}>
          {reenviando ? 'Enviando...' : 'Reenviar código'}
        </button>
        <button type="button" className="btn btn-link w-100 mt-2" onClick={onClose}>Fechar</button>
      </form>
      {mensagem && (
        <div className={`alert mt-3 ${erro ? 'alert-danger' : 'alert-success'}`}>{mensagem}</div>
      )}
      <div className="mt-3 text-muted small text-center">
        O código foi enviado para: <strong>{email}</strong>
      </div>
    </div>
  );
}

export default ConfirmacaoUsuario;
