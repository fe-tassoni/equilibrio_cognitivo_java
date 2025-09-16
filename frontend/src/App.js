

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Authenticator } from '@aws-amplify/ui-react';
import './temas/tema.css';
import Home from './paginas/Home';
import Login from './paginas/Login';
import Cadastro from './paginas/Cadastro';
import EsqueciSenha from './paginas/EsqueciSenha';
import Dashboard from './paginas/Dashboard';


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
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro" element={<>
            <div className="container mt-5">
              <Cadastro />
            </div>
          </>} />
          <Route path="/esquecisenha" element={<>
            <div className="container mt-5">
              <EsqueciSenha />
            </div>
          </>} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        {/* O botão de teste protegido pode ser removido ou movido para rotas protegidas */}
      </Router>
    );
}

export default App;
