import "./Header.css";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Header({ isLoggedIn, onLogout }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <header className="header">
      <h2 className="header__text"> NewsExplorer </h2>
      <div className="header__container-texts">
        <Link
          to="/"
          className="header__link_text"
          style={{ textDecoration: "none" }}
        >
          Inicio
        </Link>
        {isLoggedIn ? (
          <>
            <Link
              to="/saved-news"
              className="header__link_text"
              style={{ textDecoration: "none" }}
            >
              Articulos guardados
            </Link>
            <Link
              to="/"
              className="header__link_text"
              style={{ textDecoration: "none" }}
            >
              Elise [->;
            </Link>
          </>
        ) : (
          <Link
            to="/signin"
            className="header__link_text-signin"
            style={{ textDecoration: "none", border: "1px solid white", padding: "1px 35px", borderRadius: "30px" }}
          >
            Iniciar sesión
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;