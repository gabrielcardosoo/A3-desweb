import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    isLoggedIn: false,
    name: '',
    token: null
  });

  const updateUser = (userData) => {
    console.log('Atualizando usuário:', userData);
    setUser(userData);
  };

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      // Recupera os dados do usuário se houver um token
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      if (userData.name) {
        setUser({
          isLoggedIn: true,
          name: userData.name,
          token
        });
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};