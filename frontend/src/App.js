import React from 'react';
import { BrowserRouter as Router, Routes, Route,   Navigate } from 'react-router-dom';
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
import HistoryPage from './components/HistoryPage';

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
        token: data.token,
        id : data.user.id
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
          token: data.token,
          id : data.user.id
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
      token: null,
      id: null
    });

  };

  const fetchUserLogs = async () => {
    try {
      if (!user.isLoggedIn || !user.id) {
        throw new Error('Usuário não está logado');
      }

      const response = await fetch(`${API_BASE_URL}/logs/${user.id}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao buscar logs');
      }

      const data = await response.json();
      console.log(data);
      return data;

    } catch (error) {
      console.error('Erro ao buscar logs:', error);
      throw error;
    }
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
            <About />
            <IngredientForm user={user}  />
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
        <Route 
          path="/history" 
          element={
            <ProtectedRoute>
              <HistoryPage fetchLogs = {fetchUserLogs} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}
// Componente ProtectedRoute (se ainda não tiver)
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  
  if (!user.isLoggedIn) {
    return <Navigate to="/auth" replace />;
  }
  
  return children;
};

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