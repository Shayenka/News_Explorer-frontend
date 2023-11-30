// import React from "react";
import { Link } from "react-router-dom";
import authorImage from "../../images/InicioImage.jpg";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__author">
        <img
          className="footer__author_image"
          src={authorImage}
          alt="Fotogafía del autor"
        />
        <div className="footer__author_text">
          <h3 className="footer__author_title">Acerca del autor</h3>
          <h3 className="footer__author_about">Texto</h3>
        </div>
      </div>
      <div className="footer__link">
      <p className="footer__copyright">
        &copy; 2021 Supercite, Powered by News API
      </p>
      <Link
          to="/"
          className="footer__link_text"
          style={{ textDecoration: "none" }}
        >
          Inicio
        </Link>
        <Link
          to=""
          className="footer__link_text"
          style={{ textDecoration: "none" }}
        >
          Practicum
        </Link>
        </div>
    </footer>
  );
}

export default Footer;
