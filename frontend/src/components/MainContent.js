// src/components/MainContent.js

import React from 'react';
import Navbar from './Navbar';
import Description from './Description';
import Button from './Button';
import HomepageFooter from './Homepage_footer';
import IntegrantComponents from './Integrant_components';

function MainContent() {
  return (
    <div style={{ minHeight: '100vh', paddingBottom: '50px' }}>
      <Description />
      <Button />
      <HomepageFooter />
      
    </div>
  );
}

export default MainContent;
