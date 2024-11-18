import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    isLoggedIn: false,
    id: null,         // Adicionando ID
    name: '',
    token: null
  });

  const updateUser = (userData) => {
    console.log('Atualizando usuário:', userData);
    setUser(userData);
    // Se precisar salvar no localStorage também
    if (userData.isLoggedIn) {
      localStorage.setItem('userData', JSON.stringify({
        id: userData.id,
        name: userData.name
      }));
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      if (userData.name) {
        setUser({
          isLoggedIn: true,
          id: userData.id,    // Recuperando ID
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