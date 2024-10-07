import React, { useState, useEffect, useRef } from 'react';
import './style/Navbar.css';
import Logo from './Logo';
import BurguerMenu from './BurguerMenu';
import NavItem from './NavItem';
import User from './User';
import UserMenu from './UserMenu';

function Navbar() {
  const [isBurguerMenuOpen, setIsBurguerMenuOpen] = useState(false);
  const burguerMenuRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userImage, setUserImage] = useState(null);
  const [isUserMenu, setIsUserMenu] = useState(false);

  // Função para simular o login e escolher a imagem do usuário
  const handleLogin = () => {
    setIsUserMenu(true); // Define o estado do menu do usuário como aberto
    console.log('Realizou login');
    setIsLoggedIn(true); // Define o estado como logado
  };

  // Função para logout
  const handleLogout = () => {
    setUserImage(null); // Limpa a imagem do usuário
    setIsLoggedIn(false); // Define o estado como deslogado
  };

  // função que alterna o estado do BurguerMenu
  const toggleBurguerMenu = () => {
    setIsBurguerMenuOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    // caso tenha referência à navbar e o click não tenha sido dentro dela, fecha o menu
    if (burguerMenuRef.current && !burguerMenuRef.current.contains(event.target)) {
      setIsBurguerMenuOpen(false);
    }
  };

  // UseEffect que adiciona/remover o event listener
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);


  const refreshPage = () => {
      window.location.reload(); // Recarrega a página
  };

  return (
    <nav className="navbar my-navbar navbar-expand-lg navbar-dark ">
      <div className="container d-flex align-items-center justify-content-between">

        <Logo path_logo={"/img/logo_home_public.png"} />

        <div ref={burguerMenuRef}>
          <BurguerMenu toggleMenu={toggleBurguerMenu} isMenuOpen={isBurguerMenuOpen} />
        </div>

        <div className={`collapse navbar-collapse justify-content-center ${isBurguerMenuOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav">

            <NavItem link="#" text="HOME" actionOnClick={refreshPage} />
            <NavItem link="#about" text="SOBRE" />
            <NavItem link="#calc" text="CALCULADORA" />
            <NavItem link="#" text="INTEGRANTES" />
            
          </ul>
        </div>

      <User stateLogin={isLoggedIn} userImage={userImage}/>
      {isUserMenu && <UserMenu stateLogin={isLoggedIn}/>}
      </div>
    </nav>
  );
}

export default Navbar;
