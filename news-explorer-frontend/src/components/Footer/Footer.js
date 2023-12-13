import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
     
      <div className="footer__container">
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
