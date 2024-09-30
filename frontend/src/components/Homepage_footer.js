import React from 'react';
import './style/Homepage_footer.css'; // Certifique-se de que este arquivo CSS exista

function Homepage_footer() {
  return (
    <div className="footer-container">
      {/* Círculo com ícone de raio */}
      <div className="circle-container">
        <div className="circle circle-icons-flash">
          <i className="fa-solid fa-bolt icon"></i> {/* Ícone de raio */}
        </div>
        <p className="circle-text">RÁPIDO E PRÁTICO</p> {/* Texto embaixo do círculo */}
      </div>

      {/* Círculo com ícone de Wi-Fi */}
      <div className="circle-container">
        <div className="circle circle-icons-wifi">
          <i className="fa-solid fa-wifi icon"></i> {/* Ícone de Wi-Fi */}
        </div>
        <p className="circle-text">ONLINE</p> {/* Texto embaixo do círculo */}
      </div>

      {/* Círculo com ícone de IA */}
      <div className="circle-container">
        <div className="circle circle-icons-ia">
          <i className="fa-solid fa-microchip icon"></i> {/* Ícone de IA */}
        </div>
        <p className="circle-text">UTILIZA IA</p> {/* Texto embaixo do círculo */}
      </div>

      {/* Círculo com ícone de Inovador */}
      <div className="circle-container">
        <div className="circle circle-icons-inovador">
          <i className="fa-solid fa-lightbulb icon"></i> {/* Ícone de Inovação */}
        </div>
        <p className="circle-text">INOVADOR</p> {/* Texto embaixo do círculo */}
      </div>
    </div>
  );
}

export default Homepage_footer;
