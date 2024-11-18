import React, { useState, useRef, useEffect } from 'react';
import { User, LogOut, History, LogIn } from 'lucide-react';
import './style/UserProfile.css';
import { useNavigate } from 'react-router-dom';

const UserProfile = ({ user, onHistory, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const isLoggedIn = user && user.isLoggedIn;
  const navigate = useNavigate();

  const getUserInitial = (name) => {
    if (!name) return '';
    return name.charAt(0).toUpperCase();
  };
  const handleHistory = () => {
    if (isLoggedIn) {
      navigate('/history');
    }
    else {
      navigate('/auth');
    }
  };
  // Fecha o menu quando clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      {/* Avatar/Botão do menu */}
      <div 
        className="user-avatar rounded-circle d-flex align-items-center justify-content-center"
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        aria-expanded={isOpen}
      >
        {isLoggedIn && user.name ? (
          <span className="user-initial">
            {getUserInitial(user.name)}
          </span>
        ) : (
          <User className="user-icon" />
        )}
      </div>

      {/* Menu Dropdown */}
      <div className={`dropdown-menu ${isOpen ? 'show' : ''}`}>
        {isLoggedIn ? (
          <>
            <div className="dropdown-header">
              <span className="user-name">{user.name}</span>
            </div>
            <div className="dropdown-divider"></div>
            <button 
              className="dropdown-item" 
              onClick={() => {
                handleHistory();
                setIsOpen(false);
              }}
            >
              <History className="menu-icon" />
              Histórico
            </button>
            <button 
              className="dropdown-item text-danger" 
              onClick={() => {
                setIsOpen(false);
                onLogout();
              }}
            >
              <LogOut className="menu-icon" />
              Sair do perfil
            </button>
          </>
        ) : (
          <button 
            className="dropdown-item" 
            onClick={() => {
              navigate('/auth');;
              setIsOpen(false);
            }}
          >
            <LogIn className="menu-icon" />
            Logar
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;