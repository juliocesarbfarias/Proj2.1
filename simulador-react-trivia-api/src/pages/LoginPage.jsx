// Em: src/pages/LoginPage.jsx

import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation, Link } from 'react-router-dom'; // <--- Adicionado Link
import './LoginPage.css'; 

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await auth.login(username, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Falha no login');
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        
        <div className="form-group">
          <label htmlFor="username">Usuário:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Senha:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>

        {error && <p className="login-error">{error}</p>}
        
        <button type="submit" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>

        {/* --- NOVO: Link para criar conta --- */}
        <div style={{marginTop: '20px', textAlign: 'center', borderTop: '1px solid #ddd', paddingTop: '15px'}}>
            <p style={{fontSize: '0.9rem', marginBottom: '5px'}}>Ainda não tem cadastro?</p>
            <Link to="/register" style={{color: '#646cff', fontWeight: 'bold', textDecoration: 'none'}}>
                Criar uma conta agora
            </Link>
        </div>

      </form>
    </div>
  );
}

export default LoginPage;