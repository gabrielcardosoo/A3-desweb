import React from 'react';
import './style/About_components.css';

function About() {
  return (
    <div id="about" className="about-container">
      <div className="about-header">
        <h1 className="about-title">Sobre Nós</h1>
      </div>
      <div className="about-content">
            <div className="content-header">
                <i className="fa-solid fa-bars" style={{ color: '#404040', fontSize: '20px', marginRight: '10px' }}></i>
                <h2>October 12th, 2013</h2>
            </div>
        <p>
          It was a cold Saturday morning. I was at a conference in Germany and started to feel very sick. I could barely
          move, but I had to take a plane to speak at another conference in Spain. In the middle of the flight, I called
          the flight attendant and said I needed help. The airplane landed, and I left there in an ambulance.
        </p>
      </div>
    </div>
  );
}

export default About;
