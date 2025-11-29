import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import { AuthProvider } from './contexts/AuthContext.jsx';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

// --- PÁGINAS ---
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import PremiumPage from './pages/PremiumPage.jsx'; // <--- 1. IMPORT NOVO
import './pages/LoginPage.css'; 

import App from './App.jsx';
import HomePage from './pages/HomePage.jsx';
import SimuladoDetalhesPage from './pages/SimuladoDetalhesPage.jsx';
import SimuladoPage from './pages/SimuladoPage.jsx';
import ResultadoPage from './pages/ResultadoPage.jsx';
import ConfigPage from './pages/ConfigPage.jsx';
import SimuladoApiPage from './pages/SimuladoApiPage.jsx';
import ApiDemoPage from './pages/ApiDemoPage.jsx';
import UsuarioPage from './pages/UsuarioPage.jsx'; 
import HistoricoPage from './pages/HistoricoPage.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>

              {/* --- ROTAS DE AUTENTICAÇÃO --- */}
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              
              {/* --- Rotas Públicas --- */}
              <Route index element={<HomePage />} />
              <Route path="configuracoes" element={<ConfigPage />} />
              <Route path="api-demo" element={<ApiDemoPage />} />

              {/* --- ROTAS PROTEGIDAS (Só acessa logado) --- */}
              
              {/* 2. ROTA PREMIUM (ADICIONADA AQUI) */}
              <Route 
                path="premium" 
                element={
                  <ProtectedRoute>
                    <PremiumPage />
                  </ProtectedRoute>
                } 
              />

              <Route 
                path="simulado/detalhes/:id" 
                element={
                  <ProtectedRoute>
                    <SimuladoDetalhesPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="simulado/:id" 
                element={
                  <ProtectedRoute>
                    <SimuladoPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="resultado" 
                element={
                  <ProtectedRoute>
                    <ResultadoPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="simulado-api/:id" 
                element={ 
                  <ProtectedRoute>
                    <SimuladoApiPage />
                  </ProtectedRoute>
                } 
              />
              
              <Route
                path="usuario"
                element={<ProtectedRoute><UsuarioPage /></ProtectedRoute>}
              />
              
              <Route 
                path="historico" 
                element={
                  <ProtectedRoute>
                    <HistoricoPage />
                  </ProtectedRoute>
                } 
              />

            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>,
);