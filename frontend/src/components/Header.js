import React from 'react';
import './style/Navbar.css';

function Header() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark">
          <div className="container d-flex align-items-center justify-content-between">
              <a className="navbar-brand" href="#">
                <img src="/img/logo_home_public.png" alt="Logo" width="200" height="200" className="logo" />
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <a className="nav-link" href="#">HOME</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">SOBRE</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">CALCULADORA</a>
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
  
  export default Header;
  
  
  
