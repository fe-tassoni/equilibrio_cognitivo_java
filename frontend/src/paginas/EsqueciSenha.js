
import React, { useState } from 'react';
import '../temas/tema.css';
import { recuperarSenha } from '../servicos/api';

function EsqueciSenha() {
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem('');
    setErro(false);
    try {
      const resposta = await recuperarSenha({ email });
      const texto = await resposta.text();
      if (resposta.ok) {
        setMensagem(texto || 'Instruções enviadas para o e-mail.');
      } else {
        setMensagem(texto || 'E-mail não cadastrado.');
        setErro(true);
      }
    } catch (err) {
      setMensagem('Erro de conexão com o servidor.');
      setErro(true);
    }
  };

  return (
    <div>
      <h2 className="mb-4 text-center text-info">Recuperar Senha</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">E-mail cadastrado</label>
          <input type="email" className="form-control" id="email" name="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-info w-100 text-white">Enviar</button>
      </form>
      {mensagem && (
        <div className={`alert mt-3 ${erro ? 'alert-danger' : 'alert-success'}`}>{mensagem}</div>
      )}      
    </div>
  );
}

export default EsqueciSenha;
