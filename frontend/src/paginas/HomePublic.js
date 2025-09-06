import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import Login from './Login';
import Cadastro from './Cadastro';
import EsqueciSenha from './EsqueciSenha';

function HomePublic() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalCadastroIsOpen, setModalCadastroIsOpen] = useState(false);
    const [modalEsqueciSenhaIsOpen, setModalEsqueciSenhaIsOpen] = useState(false);
    return (
        <div className="homepage-bg min-vh-100">
            <header className="homepage-header d-flex justify-content-end align-items-center px-4 py-3">
                <button className="btn homepage-btn me-3" onClick={() => setModalIsOpen(true)}>Entrar</button>
                <button className="btn homepage-btn" onClick={() => setModalCadastroIsOpen(true)}>Cadastrar</button>
            </header>
            <main className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
                <div className="homepage-content text-center p-4">
                    <h1 className="mb-4 fw-bold homepage-title">
                        Correção Inteligente de Testes Neuropsicológicos
                    </h1>
                    <p className="lead homepage-desc">
                        Agilize a correção dos seus testes neuropsicológicos com nossa plataforma moderna, responsiva e intuitiva.<br />
                        Conte com Inteligência Artificial para otimizar o processo, garantir precisão e gerar laudos coesos e profissionais em poucos minutos.
                    </p>
                </div>
            </main>
            <Modal show={modalIsOpen} onHide={() => setModalIsOpen(false)} centered>
                <Modal.Body>
                    <Login
                        onClose={() => setModalIsOpen(false)}
                        onOpenEsqueciSenha={() => {
                            setModalIsOpen(false);
                            setModalEsqueciSenhaIsOpen(true);
                        }}
                    />
                </Modal.Body>
            </Modal>
            <Modal show={modalEsqueciSenhaIsOpen} onHide={() => setModalEsqueciSenhaIsOpen(false)} centered>
                <Modal.Body>
                    <EsqueciSenha />
                </Modal.Body>
            </Modal>
            <Modal show={modalCadastroIsOpen} onHide={() => setModalCadastroIsOpen(false)} centered>
                <Modal.Body>
                    <Cadastro />
                </Modal.Body>
            </Modal>
            <section className="py-5 bg-light">
                <div className="text-center mb-5">
                    <h2 className="h1 fw-bold mb-3">Recursos Profissionais</h2>
                    <p className="lead text-secondary">Tudo que você precisa para uma avaliação neuropsicológica completa</p>
                </div>
                <div className="row g-4">
                    <div className="col-md-6 col-lg-3">
                        <div className="card text-center h-100">
                            <div className="card-body">
                                <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: 60, height: 60 }}>
                                    ⚡
                                </div>
                                <h5 className="fw-bold mb-3">Correção Automática</h5>
                                <p className="text-secondary">
                                    Correção automática do FDT (Five Digits Test) com precisão e rapidez.
                                    Economize tempo e reduza erros.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3">
                        <div className="card text-center h-100">
                            <div className="card-body">
                                <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: 60, height: 60 }}>
                                    📊
                                </div>
                                <h5 className="fw-bold mb-3">Análise Detalhada</h5>
                                <p className="text-secondary">
                                    Relatórios completos com interpretação dos resultados, normas
                                    e comparações estatísticas.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3">
                        <div className="card text-center h-100">
                            <div className="card-body">
                                <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: 60, height: 60 }}>
                                    👥
                                </div>
                                <h5 className="fw-bold mb-3">Gestão de Pacientes</h5>
                                <p className="text-secondary">
                                    Organize e gerencie os dados dos seus pacientes de forma
                                    segura e eficiente.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3">
                        <div className="card text-center h-100">
                            <div className="card-body">
                                <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: 60, height: 60 }}>
                                    🛡
                                </div>
                                <h5 className="fw-bold mb-3">Segurança Total</h5>
                                <p className="text-secondary">
                                    Proteção completa dos dados dos pacientes conforme
                                    LGPD e melhores práticas de segurança.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-5">
                <div className="text-center">
                    <div className="card">
                        <div className="card-body py-5">
                            <h2 className="h1 fw-bold mb-3">Pronto para começar?</h2>
                            <p className="lead text-secondary mb-4">
                                Junte-se a centenas de profissionais que já transformaram sua prática
                            </p>
                            <button className="btn btn-primary" onClick={() => setModalCadastroIsOpen(true)}>
                                Criar Conta Gratuita
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <style>{`
        .homepage-bg {
          background: linear-gradient(120deg, #e0eafc 0%, #cfdef3 100%);
          min-height: 100vh;
        }
        .homepage-header {
          background: transparent;
          position: sticky;
          top: 0;
          z-index: 10;
        }
        .homepage-btn {
          background: #5a7bbd;
          color: #fff;
          font-weight: 600;
          border-radius: 20px;
          padding: 0.6em 2em;
          font-size: 1.1em;
          box-shadow: 0 2px 8px rgba(44,62,80,0.10);
          border: none;
          transition: background 0.2s, transform 0.2s;
        }
        .homepage-btn:hover {
          background: #3a5a8c;
          color: #fff;
          transform: translateY(-2px) scale(1.04);
        }
        .homepage-title {
          color: #3a5a8c;
          font-size: 2.5em;
        }
        .homepage-desc {
          color: #2d3e50;
          font-size: 1.25em;
        }
        @media (max-width: 600px) {
          .homepage-title { font-size: 1.5em; }
          .homepage-btn { font-size: 1em; padding: 0.5em 1.2em; }
        }
      `}</style>
        </div>
    );
}

export default HomePublic;
