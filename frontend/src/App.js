import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import About from './components/SobreNos';
import MainContent from './components/MainContent';
import IntegrantComponents from './components/Integrant_components';
import IngredientForm from './components/IngredientForm';
import AuthPage from './components/AuthPage';
import Footer from './components/Footer';
import Button from './components/Button';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';

const API_BASE_URL = 'http://localhost:3000';

function AppContent() {
  const { user, updateUser } = useAuth();

  const saveToken = (token, userData) => {
    localStorage.setItem('userToken', token);
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  const handleLogin = async (formData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        // Tratamento específico para usuário não encontrado
        if (response.status === 401) {
          throw new Error(data.message || 'Usuário não encontrado');
        }
        throw new Error(data.message || 'Erro ao fazer login');
      }

      // Salvando o token e dados do usuário
      saveToken(data.token, data.user);
      
      // Atualizando o contexto
      updateUser({
        isLoggedIn: true,
        name: data.user.name,
        token: data.token
      });

      return data;

    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    }
  };

  const handleCreateUser = async (formData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/create-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao criar usuário');
      }

      if (data.token) {
        saveToken(data.token, data.user);
        updateUser({
          isLoggedIn: true,
          name: data.user.name,
          token: data.token
        });
      }

      return data;

    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      throw error;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    updateUser({
      isLoggedIn: false,
      name: '',
      token: null
    });
  };

  return (
    <div className="App">
      <Navbar 
        user={user} 
        onLogin={handleLogin} 
        onLogout={handleLogout}
      />
      <Routes>
        <Route path="/" element={
          <>
            <MainContent />
            <Button />
            <IngredientForm />
            <About />
            <IntegrantComponents />
            <Footer />
          </>
        } />
        <Route 
          path="/auth" 
          element={
            <AuthPage 
              onLogin={handleLogin} 
              onCreateUser={handleCreateUser}
            />
          } 
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;