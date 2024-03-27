import React from "react";

function Preloader() {
  return (
    <div className="preloader">
      <div className="preloader__circle"></div>
      <p className="preloader__title">Buscando noticias...</p>
    </div>
  );
}

export default Preloader;
