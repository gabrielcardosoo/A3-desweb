import React, { useState, useEffect, useRef } from 'react';
import './style/Navbar.css';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navbarRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (navbarRef.current && !navbarRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  // UseEffect que adiciona/remover o event listener
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []); // Coloque um array vazio para que isso ocorra apenas uma vez ao montar o componente

  // UseEffect para verificar se o menu está aberto
  useEffect(() => {
    if (!isMenuOpen) {
      // Se o menu não está aberto, não faz nada
      return;
    }
    // Caso contrário, adicionar a lógica de quando o menu está aberto
  }, [isMenuOpen]);

    // Função para dar refresh na página
  const refreshPage = () => {
      window.location.reload(); // Recarrega a página
  };

  return (
    <nav className="navbar my-navbar navbar-expand-lg navbar-dark " ref={navbarRef}>
      <div className="container d-flex align-items-center justify-content-between">
        <a className="navbar-brand" href="#">
          <img src="/img/logo_home_public.png" alt="Logo" width="200" height="200" className="logo" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
          aria-controls="navbarNav"
          aria-expanded={isMenuOpen ? "true" : "false"}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse justify-content-center ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={refreshPage}>HOME</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#about">SOBRE</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#calc">CALCULADORA</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">INTEGRANTES</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
