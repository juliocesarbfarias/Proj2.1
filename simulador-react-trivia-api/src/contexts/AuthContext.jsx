// Em: src/contexts/AuthContext.jsx

import React, { createContext, useState, useContext, useEffect } from 'react';
import { apiLogin } from '../services/apiClient.js'; 

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem('authToken');
    console.log('AuthProvider: Token lido do localStorage:', storedToken); 
    return storedToken;
  });

  useEffect(() => {
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser({ username: payload.sub, role: payload.role });
      } catch (e) {
        console.error('Token inválido, limpando...', e);
        logout(); 
      }
    } else {
      setUser(null);
    }
  }, [token]);

  // Função de Login
  const login = async (username, password) => {
    try {
      const data = await apiLogin(username, password); 
      setToken(data.access_token); 
      localStorage.setItem('authToken', data.access_token);
      
      
      localStorage.setItem('lastLogin', new Date().toISOString()); // Salva a data do login

      return true; 
    } catch (error) {
      console.error('Falha no login:', error);
      logout(); 
      throw error; 
    }
  };

  // Função de Logout
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('authToken');

    
    localStorage.removeItem('lastLogin'); // Limpa a data do login
  };

  const value = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!token, 
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};