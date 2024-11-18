import React from 'react';
import './style/Loading.css';

const Loading = ({ message = "Carregando..." }) => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p className="loading-message">{message}</p>
    </div>
  );
};

export default Loading;