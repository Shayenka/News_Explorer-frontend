import React from 'react';
//import preloaderGif from "";

function Preloader() {
    return (
      <div className="preloader">
        <p className="preloader__title">Cargando...</p>
        <img className="preloader__gif" src={preloaderGif} alt="Preloader" />
      </div>
    );
  }
  
  export default Preloader;