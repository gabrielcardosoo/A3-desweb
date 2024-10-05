import React, { useState, useEffect, useRef } from 'react';
import './style/Navbar.css';
import Logo from './Logo';
import BurguerMenu from './BurguerMenu';
import NavItem from './NavItem';

function Navbar() {
  const [isBurguerMenuOpen, setIsBurguerMenuOpen] = useState(false);
  const burguerMenuRef = useRef(null);

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
        <div>USER LOGO</div>
      </div>
    </nav>
  );
}

export default Navbar;
