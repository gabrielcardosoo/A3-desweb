import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Description from './components/Description';
import Button from './components/Button';
import HomepageFooter from './components/Homepage_footer';
import About from './components/About_components'; // Corrected import path
import Calc from './components/Integrant_components';
import MainContent from './components/MainContent'; // Caminho correto para o MainContent

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import IntegrantComponents from './components/Integrant_components';

function App() {
  return (
    <div className="App">
      <MainContent />
      <About />
      <IntegrantComponents />
    </div>
  );
}

export default App;