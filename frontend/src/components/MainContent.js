// src/components/MainContent.js

import React from 'react';
import Description from './Description';
import HomepageFooter from './Homepage_footer';

function MainContent() {
  return (
    <div style={{ minHeight: '50vh', paddingBottom: '50px' }}>
      <Description />
      <HomepageFooter />
      
    </div>
  );
}

export default MainContent;
