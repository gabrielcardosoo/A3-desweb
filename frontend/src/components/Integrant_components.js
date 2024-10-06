import './style/Integrant_components.css'; // Certifique-se de que o caminho está correto
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const IntegrantComponents = () => {
  const teamMembers = [
    {
      name: 'Danilo Vidal',
      position: '',
      image: '/img/fotos/DaniloVidal.jpg', // Substitua pelo link da imagem
      linkedin: 'https://www.linkedin.com/in/eido-gal', // Link do LinkedIn
    },
    {
      name: 'Gustavo Colpaert',
      position: '',
      image: '/img/fotos/Ronaldo.jpeg', // Substitua pelo link da imagem
      linkedin: 'https://www.linkedin.com/in/assaf-feldman', // Link do LinkedIn
    },
    {
      name: 'Guilherme Turone',
      position: '',
      image: '/img/fotos/Mia.jpg', // Substitua pelo link da imagem
      linkedin: 'https://www.linkedin.com/in/aglika-dotcheva', // Link do LinkedIn
    },
    {
      name: 'Guilherme Turone',
      position: '',
      image: '/img/fotos/Mia.jpg', // Substitua pelo link da imagem
      linkedin: 'https://www.linkedin.com/in/aglika-dotcheva', // Link do LinkedIn
    },
    {
      name: 'Guilherme Turone',
      position: '',
      image: '/img/fotos/Mia.jpg', // Substitua pelo link da imagem
      linkedin: 'https://www.linkedin.com/in/aglika-dotcheva', // Link do LinkedIn
    },
    {
      name: 'Guilherme Turone',
      position: '',
      image: '/img/fotos/Mia.jpg', // Substitua pelo link da imagem
      linkedin: 'https://www.linkedin.com/in/aglika-dotcheva', // Link do LinkedIn
    },
    {
      name: 'Guilherme Turone',
      position: '',
      image: '/img/fotos/Mia.jpg', // Substitua pelo link da imagem
      linkedin: 'https://www.linkedin.com/in/aglika-dotcheva', // Link do LinkedIn
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3, // Mostra 3 slides ao mesmo tempo
  slidesToScroll: 3, // Rola 3 slides de uma vez
  responsive: [
    {
      breakpoint: 1024, // Para telas com largura menor que 1024px
      settings: {
        slidesToShow: 2, // Mostra 2 slides ao mesmo tempo em telas menores
        slidesToScroll: 2, // Rola 2 slides de uma vez em telas menores
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600, // Para telas com largura menor que 600px
      settings: {
        slidesToShow: 1, // Mostra 1 slide ao mesmo tempo em telas pequenas
        slidesToScroll: 1, // Rola 1 slide de uma vez em telas pequenas
      },
    },
  ],
};

  return (
    <div id="integrantes" className="integrantes-container">
      <div className="integ-header">
        <h1 className="integ-title">INTEGRANTES</h1>
      </div>
      <div className='integrant-carousel'>
      <Slider {...settings}>
        {teamMembers.map((member, index) => (
          <div key={index} className="integrant-card">
            <img src={member.image} alt={member.name} className="integrant-image" />
            <h3>{member.name}</h3>
            <p>{member.position}</p>
            <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="linkedin-button">
            <i className="fa-brands fa-linkedin" style={{ color: '#ffffff', fontSize: '5rem'}}></i>  
            </a>
          </div>
        ))}
      </Slider>
    </div>
    </div>
  );
};

export default IntegrantComponents;