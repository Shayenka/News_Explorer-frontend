import React from "react";
import authorImage from "../../images/imageMain.jpg";

function About() {
  return (
    <div className="about">
      <img
        className="about__author_image"
        src={authorImage}
        alt="Fotogafía del autor"
      />
      <div className="about__author_container">
        <h3 className="about__author_title">Acerca del autor</h3>
        <p className="about__author_text">Texto</p>
      </div>
    </div>
  );
}

export default About;
