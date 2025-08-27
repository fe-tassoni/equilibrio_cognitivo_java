
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useAuth } from 'react-oidc-context';
import './temas/tema.css';

import Home from './paginas/Home';
import Login from './paginas/Login';
import Cadastro from './paginas/Cadastro';
import EsqueciSenha from './paginas/EsqueciSenha';

function App() {
  const auth = useAuth();
  const [protegidoMsg, setProtegidoMsg] = React.useState('');

  const signOutRedirect = () => {
    const clientId = "1lj9d5u67tmrjrc3hg30tfb82o";
    const logoutUri = "http://localhost:3000";
    const cognitoDomain = "https://<user pool domain>"; // Substitua pelo domínio do seu user pool se configurado
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };

  const testarProtegido = async () => {
    setProtegidoMsg('Testando...');
    try {
      const resp = await import('./servicos/api').then(api => api.getProtegido(auth.user?.access_token));
      if (resp.ok) {
        const txt = await resp.text();
        setProtegidoMsg(txt);
      } else {
        setProtegidoMsg('Acesso negado ou erro: ' + resp.status);
      }
    } catch (e) {
      setProtegidoMsg('Erro ao conectar ao backend.');
    }
  };

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    return (
      <div className="container mt-5">
        <div className="card p-4">
          <h4>Bem-vindo, {auth.user?.profile.phone_number || 'usuário'}!</h4>
          <pre>ID Token: {auth.user?.id_token}</pre>
          <pre>Access Token: {auth.user?.access_token}</pre>
          <button className="btn btn-danger mt-3" onClick={() => auth.removeUser()}>Sign out</button>
          <hr />
          <button className="btn btn-success" onClick={testarProtegido}>Testar rota protegida</button>
          {protegidoMsg && <div className="mt-3 alert alert-info">{protegidoMsg}</div>}
        </div>
      </div>
    );
  }

  return (
    <Router>
      <nav style={{ background: 'var(--cor-lilas)', padding: '1rem', borderRadius: '0 0 8px 8px', marginBottom: '2rem' }}>
        <Link to="/" style={{ color: '#fff', marginRight: '1rem', textDecoration: 'none', fontWeight: 'bold' }}>Home</Link>
        <Link to="/login" style={{ color: '#fff', marginRight: '1rem', textDecoration: 'none' }}>Login</Link>
        <Link to="/cadastro" style={{ color: '#fff', marginRight: '1rem', textDecoration: 'none' }}>Cadastro</Link>
        <Link to="/esqueci-senha" style={{ color: '#fff', textDecoration: 'none' }}>Esqueci a Senha</Link>
        <button className="btn btn-primary btn-sm float-end" style={{ marginLeft: '2rem' }} onClick={() => auth.signinRedirect()}>Sign in Cognito</button>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/esqueci-senha" element={<EsqueciSenha />} />
      </Routes>
    </Router>
  );
}

export default App;
