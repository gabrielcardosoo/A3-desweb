import React from 'react';
import '../components/style/Button.css';

function Button() {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' }); // Rolagem suave
    }
  };

  return (
    <div className="button-container">
      <button className="btn-custom" onClick={scrollToAbout}>
        Veja mais 
        <i className="fas fa-circle-down" style={{ fontSize: '1.5rem', marginLeft: '10px' }}></i>
      </button>
    </div>
  );
}

export default Button;
