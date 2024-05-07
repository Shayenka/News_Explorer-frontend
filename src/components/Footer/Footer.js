import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container_movile">
        <div className="footer__container_links_movile">
          <span className="footer__link_movile">
            <Link
              to="/"
              className="footer__link_text_movile"
              style={{ textDecoration: "none" }}
              // onClick={() => {
              //   if(isSavedNewsClicked) {
              //     handleSavedNewsClick();
              //   }
              // }}
            >
              Inicio
            </Link>
          </span>
          <span className="footer__link_movile">
            <Link
              to="https://tripleten.com/"
              className="footer__link_text_movile"
              style={{ textDecoration: "none" }}
            >
              Practicum
            </Link>
          </span>
        </div>
        <p className="footer__copyright_movile">
          &copy; 2021 Supercite, Powered by News API
        </p>
      </div>

      <div className="footer__container_desktop">
        <p className="footer__copyright">
          &copy; 2021 Supercite, Powered by News API
        </p>
        <div className="footer__container_links">
          <Link
            to="/"
            className="footer__link_text"
            style={{ textDecoration: "none" }}
            // onClick={() => {
            //   if(isSavedNewsClicked) {
            //     handleSavedNewsClick();
            //   }
            // }}
          >
            Inicio
          </Link>
          <Link
            to="https://tripleten.com/"
            className="footer__link_text"
            style={{ textDecoration: "none" }}
          >
            Practicum
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
