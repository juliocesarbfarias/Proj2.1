import React, { createContext, useContext, useState, useEffect } from 'react';

// 1. Tenta pegar o tema salvo no localStorage, ou usa 'light' como padrão
const getInitialTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  return savedTheme ? savedTheme : 'light';
};

const ThemeContext = createContext();

// 2. Cria o Provedor
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme);

  // 3. O "Efeito Mágico"
  // Este useEffect roda sempre que o 'theme' mudar
  useEffect(() => {
    // 3a. Salva a nova escolha no localStorage
    localStorage.setItem('theme', theme);
    
    // 3b. Aplica o tema no HTML do site
    // O Bootstrap 5 (que você usa) muda o tema automaticamente
    // se o <html> tag tiver o atributo data-bs-theme="dark"
    document.documentElement.setAttribute('data-bs-theme', theme);

  }, [theme]); // Roda toda vez que 'theme' for alterado

  // 4. O valor que será compartilhado com o app
  const value = {
    theme,
    // Criamos uma função 'toggleTheme' para facilitar
    toggleTheme: () => setTheme(theme === 'light' ? 'dark' : 'light'),
    // E uma função 'setTheme' para o dropdown
    setTheme: (newTheme) => setTheme(newTheme),
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

// 5. O "Hook" para usar o contexto facilmente
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
  }
  return context;
};