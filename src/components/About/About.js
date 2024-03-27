import React from "react";
import AuthorPhoto from "../../images/Author.jpg";

function About() {
  return (
    <div className="about">
      <img
        className="about__author_image"
        src={AuthorPhoto}
        alt="Fotogafía del autor"
      />
      <div className="about__author_container">
        <h3 className="about__author_title">Acerca del autor</h3>
        <p className="about__author_text">
          ¡Hola! Soy Shayenka Alvarado, estudiante de programación en la
          plataforma de TripleTen, en donde desarrollé varios proyectos en el
          lenguaje de JavaScript. Por ultimo, he desarrollado esta aplicación
          que es un buscador de noticias en donde utilicé React para su
          desarrollo. Espero que la expeciencia e interacción con esta apliación
          sea amigable y de tu agrado. ¡Gracias por esta aquí! y a buscar
          noticias... :D
        </p>
      </div>
    </div>
  );
}

export default About;
