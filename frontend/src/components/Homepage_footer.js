import React, { useState, useEffect } from 'react';
import './style/Homepage_footer.css'; // Certifique-se de que este arquivo CSS exista

function Homepage_footer() {
  const [activeIndex, setActiveIndex] = useState(0); // Estado para controlar o índice ativo
  const totalIcons = 4; // Número total de ícones

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % totalIcons); // Alterna o índice ativo
    }, 1000); // Altere o tempo em milissegundos para ajustar a velocidade

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, []);

  return (
    <div className="footer-container">
      {/* Círculo com ícone de raio */}
      <div className={`circle-container ${activeIndex === 0 ? 'active' : ''}`}>
        <div className="circle circle-icons-flash">
          <i className="fa-solid fa-bolt icon"></i>
        </div>
        <p className="circle-text">RÁPIDO E PRÁTICO</p>
      </div>

      {/* Círculo com ícone de Wi-Fi */}
      <div className={`circle-container ${activeIndex === 1 ? 'active' : ''}`}>
        <div className="circle circle-icons-wifi">
          <i className="fa-solid fa-wifi icon"></i>
        </div>
        <p className="circle-text">ONLINE</p>
      </div>

      {/* Círculo com ícone de IA */}
      <div className={`circle-container ${activeIndex === 2 ? 'active' : ''}`}>
        <div className="circle circle-icons-ia">
          <i className="fa-solid fa-microchip icon"></i>
        </div>
        <p className="circle-text">UTILIZA IA</p>
      </div>

      {/* Círculo com ícone de Inovador */}
      <div className={`circle-container ${activeIndex === 3 ? 'active' : ''}`}>
        <div className="circle circle-icons-inovador">
          <i className="fa-solid fa-lightbulb icon"></i>
        </div>
        <p className="circle-text">INOVADOR</p>
      </div>
    </div>
  );
}

export default Homepage_footer;
