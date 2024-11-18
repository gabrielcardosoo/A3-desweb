import React from 'react';
import '../components/style/Footer.css'; // Para adicionar estilos personalizados ao seu footer

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2024 Nutri AI. Todos os direitos reservados.</p>
        <ul className="footer-links">
          <li><a href="#About">Sobre</a></li>
          <li><a href="#IngredientForm">Calculadora</a></li>
          <li><a href="#integrantes">Integrantes</a></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;