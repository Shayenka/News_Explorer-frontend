import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Logout from "../../images/logout.svg";

function Header({ handleLoginPopUp, isLoggedIn, onLogout }) {
  const currentUser = useContext(CurrentUserContext);
  console.log("isLoggedIn in Header:", isLoggedIn);

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
          <div className="header__user-container">
            <Link
              to="/saved-news"
              className="header__link_text"
              style={{ textDecoration: "none" }}
            >
              Articulos guardados
            </Link>
            <Link
              to="/"
              className="header__link_text-border"
              style={{
                textDecoration: "none",
                border: "1px solid white",
                padding: "1px 20px",
                borderRadius: "30px",
              }}
              onClick={() => {
                onLogout();
              }}
            >
              {currentUser.name}
              <img
                className="header__icon-logout"
                src={Logout}
                alt="Icono de logout"
              />
            </Link>
          </div>
        ) : (
          <Link
            to="/signin"
            className="header__link_text-border"
            style={{
              textDecoration: "none",
              border: "1px solid white",
              padding: "1px 40px",
              borderRadius: "30px",
            }}
            onClick={() => {
              handleLoginPopUp();
            }}
          >
            Iniciar sesión
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
