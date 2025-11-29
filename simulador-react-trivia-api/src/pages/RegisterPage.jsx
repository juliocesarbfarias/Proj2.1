import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { apiPost } from '../services/apiClient'; // Importando do seu cliente
import './LoginPage.css'; // Reutiliza o CSS do Login

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
        setError("As senhas não coincidem!");
        return;
    }

    setLoading(true);

    try {
      // Chama o backend para criar o usuário
      await apiPost('/users/', {
          username: username,
          password: password,
          role: "free"
      });
      
      setSuccess("Conta criada com sucesso! Redirecionando...");
      setTimeout(() => {
          navigate('/login');
      }, 2000);

    } catch (err) {
      console.error("Erro no registro:", err);
      // Tenta pegar a mensagem amigável do backend ou usa uma genérica
      const msg = err.message || "Erro ao criar conta.";
      setError(msg.includes("400") ? "Usuário já existe." : msg);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Criar Conta</h2>
        
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
            autoComplete="new-password"
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmar Senha:</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
        </div>

        {error && <p className="login-error">{error}</p>}
        {success && <p style={{color: '#4caf50', textAlign: 'center', fontWeight: 'bold'}}>{success}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Criando...' : 'Registrar-se'}
        </button>

        <div style={{marginTop: '15px', textAlign: 'center'}}>
            <p>Já possui conta?</p>
            <Link to="/login" style={{color: '#646cff'}}>Fazer Login</Link>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;