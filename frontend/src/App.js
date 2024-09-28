import React from 'react';
import './App.css';
import Description from './components/Description';
import './components/Header';
import Header from './components/Header';
import './components/Button';
import Button from './components/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';





function App() {
  return (
    <div className="App">
      <div className="text-container">
        <Header />
        <Description />
        <Button />
      </div>
      
    </div>
  );
}


export default App;
