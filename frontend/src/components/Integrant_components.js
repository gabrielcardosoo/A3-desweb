import './style/Integrant_components.css'; // Certifique-se de que o caminho está correto
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const IntegrantComponents = () => {
  const teamMembers = [
    {
      name: 'Danillo Vidal',
      position: 'RA: 822124979',
      image: '/img/fotos/Danillo Vidal.jpg', // Substitua pelo link da imagem
      linkedin: 'https://www.linkedin.com/in/danillo-vidal/', // Link do LinkedIn
    },
    {
      name: 'Gustavo Colpaert',
      position: 'RA: 823126177',
      image: '/img/fotos/Gustavo Colpaert.jpg', // Substitua pelo link da imagem
      linkedin: 'https://www.linkedin.com/in/colpaertgustavo/', // Link do LinkedIn
    },
    {
      name: 'Guilherme Turone de Lima',
      position: 'RA: 822136725',
      image: '/img/fotos/Guilherme Turone.jpeg', // Substitua pelo link da imagem
      linkedin: 'https://www.linkedin.com/in/guilherme-turone-683234225/', // Link do LinkedIn
    },
    {
      name: 'Gabriel Silva Cardoso',
      position: 'RA: 822147931',
      image: '/img/fotos/Gabriel Cardoso.jpeg', // Substitua pelo link da imagem
      linkedin: 'https://www.linkedin.com/in/gabriel-silva-cardoso/', // Link do LinkedIn
    },
    {
      name: 'Vinícios Silva Santos',
      position: 'RA: 822144485  ',
      image: '/img/fotos/Vinícios Silva.jpg', // Substitua pelo link da imagem
      linkedin: 'https://www.linkedin.com/in/vinicios-santos-52678a331?trk=contact-info', // Link do LinkedIn
    },
    {
      name: 'Matheus Costa Amorim',
      position: 'RA: 822137176',
      image: '/img/fotos/Matheus Amorim.jpeg', // Substitua pelo link da imagem
      linkedin: 'https://www.linkedin.com/in/matheus-amorim-1m/', // Link do LinkedIn
    },
    {
      name: 'Rikellme Kevin Andrade de Lima',
      position: 'RA: 822160764',
      image: '/img/fotos/Rikellme Kevin.jpeg', // Substitua pelo link da imagem
      linkedin: 'https://www.linkedin.com/in/rikellme-lima-a672741a5/', // Link do LinkedIn
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
        <h1 className="integ-title">Integrantes</h1>
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