import React from 'react';

function Preloader() {
    return (
      <div className="preloader">
        <p className="preloader__title">Buscando noticias...</p>
        <div className="preloader__circle"></div>
      </div>
    );
  }
  
  export default Preloader;