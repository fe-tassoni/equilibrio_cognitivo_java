import React from 'react';
import { signOut } from '@aws-amplify/auth';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="dashboard-bg min-vh-100 d-flex">
      {/* Sidebar */}
      <aside className="sidebar bg-primary text-white p-4" style={{width: 220, minHeight: '100vh'}}>
        <h4 className="fw-bold mb-4">Equilíbrio Cognitivo</h4>
        <nav className="nav flex-column gap-2">
          <a href="#pacientes" className="nav-link text-white">Pacientes</a>
          <a href="#testes" className="nav-link text-white">Testes FDT</a>
          <a href="#relatorios" className="nav-link text-white">Relatórios</a>
          <a href="#seguranca" className="nav-link text-white">Segurança</a>
          <button className="nav-link text-white mt-4 btn btn-link" style={{textAlign: 'left'}} onClick={async () => { await signOut(); navigate('/'); }}>Sair</button>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-grow-1 p-5">
        <h2 className="fw-bold mb-4">Olá, Usuário!</h2>
        <div className="row g-4 mb-5">
          <div className="col-md-3">
            <div className="card">
              <div className="card-body">
                <h5 className="fw-bold">Pacientes</h5>
                <p className="mb-0">Total: 0</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card">
              <div className="card-body">
                <h5 className="fw-bold">Testes FDT</h5>
                <p className="mb-0">Total: 0</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card">
              <div className="card-body">
                <h5 className="fw-bold">Esta Semana</h5>
                <p className="mb-0">0</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card">
              <div className="card-body">
                <h5 className="fw-bold">Tempo Médio</h5>
                <p className="mb-0">--</p>
              </div>
            </div>
          </div>
        </div>
        {/* Recent Activity */}
        <div className="card mb-4">
          <div className="card-header">
            <h5 className="fw-bold mb-0">Atividade Recente</h5>
          </div>
          <div className="card-body">
            <p className="mb-0">Nenhum teste realizado</p>
          </div>
        </div>
        {/* Recent Patients */}
        <div className="card">
          <div className="card-header">
            <h5 className="fw-bold mb-0">Pacientes Recentes</h5>
          </div>
          <div className="card-body">
            <p className="mb-0">Nenhum paciente</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
