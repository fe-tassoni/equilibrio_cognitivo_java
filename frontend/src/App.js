

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Authenticator } from '@aws-amplify/ui-react';
import './temas/tema.css';
import Home from './paginas/Home';
import Login from './paginas/Login';
import Cadastro from './paginas/Cadastro';
import EsqueciSenha from './paginas/EsqueciSenha';


function App() {
  const [protegidoMsg, setProtegidoMsg] = React.useState('');


    const testarProtegido = async () => {
      setProtegidoMsg('Testando...');
      try {
        // Aqui você pode obter o token do usuário autenticado via Amplify
        // Exemplo: const session = await Auth.currentSession();
        // const token = session.getIdToken().getJwtToken();
        const resp = await import('./servicos/api').then(api => api.getProtegido());
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

    return (
      <Authenticator>
        {({ signOut, user }) => (
          <Router>
            <div className="container mt-5">
              <nav>
                <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/login">Login</Link></li>
                  <li><Link to="/cadastro">Cadastro</Link></li>
                  <li><Link to="/esquecisenha">Esqueci Senha</Link></li>
                  <li><button onClick={signOut}>Sair</button></li>
                </ul>
              </nav>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/esquecisenha" element={<EsqueciSenha />} />
              </Routes>
              <button onClick={testarProtegido}>Testar Protegido</button>
              <div>{protegidoMsg}</div>
            </div>
          </Router>
        )}
      </Authenticator>
    );
}

export default App;
