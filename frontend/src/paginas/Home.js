
import React from 'react';
import '../temas/tema.css';

function Home() {
  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="card shadow p-4" style={{maxWidth: 600, width: '100%'}}>
        <h2 className="mb-4 text-center text-primary">Sobre o Site</h2>
        <p className="lead text-center">
          Este sistema foi desenvolvido para facilitar a correção de testes neuropsicológicos, oferecendo segurança, escalabilidade e praticidade para profissionais da área.
        </p>
      </div>
    </div>
  );
}

export default Home;
