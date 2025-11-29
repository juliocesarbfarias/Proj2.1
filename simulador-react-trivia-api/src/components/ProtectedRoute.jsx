
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

// Este componente recebe 'children' (os filhos)
// 'children' será a página que queremos proteger
function ProtectedRoute({ children }) {
  const auth = useAuth();
  const location = useLocation(); // Para saber de onde o usuário veio

  console.log('ProtectedRoute: Verificando rota:', location.pathname);
  console.log('ProtectedRoute: Está autenticado?', auth.isAuthenticated);

  if (!auth.isAuthenticated) {
    // Se não está logado, redireciona para /login
    // 'state={{ from: location }}' salva a página atual
    // para que possamos voltar pra ela depois do login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Se está logado, renderiza a página (os children)
  return children;
}

export default ProtectedRoute;