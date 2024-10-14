import React from 'react';
import './style/UploadButton.css'; // Para a estilização personalizada

const UploadButton = () => {
  return (
    <div className="upload-container">
      <label htmlFor="file-upload" className="custom-file-upload">
        <span>Anexar Arquivo</span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          className="icon"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M16 16v4H8v-4M12 12l-4 4m0 0l4-4m0 0l4 4m-4-4V4" 
          />
        </svg>
      </label>
      <input id="file-upload" type="file" />
    </div>
  );
};

export default UploadButton;
