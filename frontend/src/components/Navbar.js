import React, { useState, useEffect, useRef } from 'react';
import UserProfile from "./UserProfile";
import './style/Navbar.css';

function Navbar({ user, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navbarRef = useRef(null);

  const handleClickOutside = (event) => {
    if (navbarRef.current && !navbarRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <nav className="navbar my-navbar navbar-expand-lg navbar-dark" ref={navbarRef}>
      <div className="container d-flex align-items-center justify-content-between">
        <a className="navbar-brand" href="/">
          <img src="/img/logo_home_public.png" alt="Logo" width="75" height="75" className="logo" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-controls="navbarNav"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse justify-content-center ${isMenuOpen ? 'show' : ''}`}>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/" onClick={refreshPage}>
                <i className="fas fa-home"></i> HOME
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#About">
                <i className="fas fa-info-circle"></i> SOBRE
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#IngredientForm">
                <i className="fas fa-calculator"></i> CALCULADORA
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#integrantes">
                <i className="fas fa-users"></i> INTEGRANTES
              </a>
            </li>
            <li className="nav-item">
              <a className='nav-link' href="https://github.com/gabrielcardosoo/A3-desweb">
                <i className="fa-brands fa-github" style={{ fontSize: '1.8rem' }}></i> GitHub
              </a>
            </li>
          </ul>
        </div>
        <UserProfile 
          user={user}
          onLogout={onLogout}
        />
      </div>
    </nav>
  );
}

export default Navbar;