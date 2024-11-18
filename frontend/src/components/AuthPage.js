import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style/AuthPage.css';

const AuthPage = ({ onLogin, onCreateUser }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    setError(''); // Limpa erros quando o usuário começa a digitar
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (!isLoginMode) {
        // Modo cadastro
        if (formData.password !== formData.confirmPassword) {
          setError('As senhas não coincidem!');
          return;
        }
        
        await onCreateUser(formData);
        navigate('/');
      } else {
        // Modo login
        await onLogin(formData);
        navigate('/');
      }
    } catch (error) {
      // Tratamento específico para erro de usuário não encontrado
      if (error.message.includes('não encontrado')) {
        setError('Usuário não cadastrado. Deseja criar uma conta?');
      } else {
        setError(error.message || 'Ocorreu um erro. Tente novamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwitchMode = (mode) => {
    setIsLoginMode(mode);
    setError(''); // Limpa erros ao trocar de modo
    setFormData({
      email: '',
      password: '',
      name: '',
      confirmPassword: ''
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">
          {isLoginMode ? 'Login' : 'Criar Conta'}
        </h2>
        
        {error && (
          <div className="alert alert-danger d-flex align-items-center justify-content-between">
            <span>{error}</span>
            {error.includes('não cadastrado') && (
              <button 
                className="btn btn-outline-danger btn-sm ms-3"
                onClick={() => handleSwitchMode(false)}
              >
                Criar Conta
              </button>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLoginMode && (
            <div className="form-group">
              <label htmlFor="name">Nome completo</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleInputChange}
                required={!isLoginMode}
                placeholder="Digite seu nome completo"
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="seu@email.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleInputChange}
              required
              placeholder="Digite sua senha"
              minLength={6}
            />
          </div>

          {!isLoginMode && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmar Senha</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="form-control"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required={!isLoginMode}
                placeholder="Confirme sua senha"
                minLength={6}
              />
            </div>
          )}

          <button 
            type="submit" 
            className="btn btn-primary submit-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <span>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                {' '}Aguarde...
              </span>
            ) : (
              isLoginMode ? 'Entrar' : 'Criar Conta'
            )}
          </button>

          {isLoginMode ? (
            <div className="register-link">
              Não tem uma conta?{' '}
              <button 
                type="button" 
                className="btn-link"
                onClick={() => handleSwitchMode(false)}
              >
                Criar nova conta
              </button>
            </div>
          ) : (
            <div className="auth-links">
              <div className="login-link">
                Já tem uma conta?{' '}
                <button 
                  type="button" 
                  className="btn-link"
                  onClick={() => handleSwitchMode(true)}
                >
                  Fazer login
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AuthPage;