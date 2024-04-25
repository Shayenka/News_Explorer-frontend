import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useUserContext from "../Hooks/useUserContext";
import Logout from "../../images/logout.svg";
import LogoutBlack from "../../images/logout-black.svg";
import MenuMovile from "../../images/menu-movile.svg";
import closeMenuSavedNews from "../../images/close_menu.svg";
import closeMenu from "../../images/closeMenu.svg"; 
import MenuMovileSavedNews from "../../images/menu_SavedNews.svg";

function Header({
  handleLoginPopUp,
  onSavedNewsClick,
  handleSavedNewsClick,
  // isSavedNewsClicked,
}) {
  const { user: currentUser, isLoggedIn, handleLogout } = useUserContext();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isSavedNewsRoute = location.pathname === "/saved-news";

  console.log(currentUser);
  console.log(currentUser.name);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <header className="header">
      {isLoggedIn ? (
        <>
          <h2
            className={`header__text ${
              isSavedNewsRoute? "header__text_movile_SavedNews" : ""
            }`}
          >
            {" "}
            NewsExplorer{" "}
          </h2>
          <button
            onClick={handleClick}
            className={`header__button-menu header__button-menu_nav ${
              isSavedNewsRoute ? "header__button-menu_SavedNews" : "header__button-menu_main"
            }`}
          >
            <img
              src={isSavedNewsRoute ? MenuMovileSavedNews : MenuMovile}
              alt="Menú"
            />
          </button>
          <div
            className={`header__container-texts-movile ${
              isSavedNewsRoute
                ? "header__container-texts-movile-savedNews"
                : ""
            } ${
              open
                ? isSavedNewsRoute
                  ? "header__container-texts-movile_open-SavedNews"
                  : "header__container-texts-movile_open"
                : ""
            }`}
          >
            <div className="header__container_movile">
              <h2
                className={`header__text_movile ${
                  isSavedNewsRoute ? "header__text_movile_SavedNews" : ""
                }`}
              >
                NewsExplorer
              </h2>
              <button onClick={handleClick} className={`header__button-menu ${
                  isSavedNewsRoute ? "header__button-menu_SavedNews" : "header__button-menu_main"
                }`}
                >
                <img
                 src={isSavedNewsRoute? closeMenuSavedNews : closeMenu}
                  alt="Icono de una X para cerrar el menú."
                />
              </button>
            </div>
            <div className="header__container__links_movile">
              <Link
                to="/"
                className={`header__link_text ${
                  isSavedNewsRoute ? "header__link_text_SavedNews" : ""
                }`}
                style={{ textDecoration: "none" }}
                onClick={() => {
                  handleSavedNewsClick();
                }}
              >
                Inicio
              </Link>
              <Link
                to="/saved-news"
                className={`header__link_text ${
                  isSavedNewsRoute ? "header__link_text_SavedNews" : ""
                }`}
                style={{ textDecoration: "none" }}
                onClick={() => {
                  onSavedNewsClick();
                }}
              >
                Artículos guardados
              </Link>
              <Link
                to="/"
                className={`header__link_text-border ${
                  isSavedNewsRoute? "header__link_text-border_SavedNews" : ""
                }`}
                style={{
                  textDecoration: "none",
                  padding: "1px 20px",
                  borderRadius: "30px",
                }}
                onClick={() => {
                  handleLogout();
                  handleSavedNewsClick();
                }}
              >
                {currentUser && currentUser.name && <>{currentUser.name}</>}
                <img
                  className="header__icon-logout"
                  src={ isSavedNewsRoute ? LogoutBlack : Logout}
                  alt="Icono de logout"
                />
              </Link>
            </div>
          </div>

          <div className={"header__container-texts-desktop"}>
            <Link
              to="/"
              className={`header__link_text ${
                isSavedNewsRoute ? "header__link_text_SavedNews" : ""
              }`}
              style={{ textDecoration: "none" }}
              onClick={() => {
                handleSavedNewsClick();
              }}
            >
              Inicio
            </Link>
            <Link
              to="/saved-news"
              className={`header__link_text ${
                isSavedNewsRoute ? "header__link_text_SavedNews" : ""
              }`}
              style={{ textDecoration: "none" }}
              onClick={() => {
                onSavedNewsClick();
              }}
            >
              Artículos guardados
            </Link>
            <Link
              to="/"
              className={`header__link_text-border ${
                isSavedNewsRoute ? "header__link_text-border_SavedNews" : ""
              }`}
              style={{
                textDecoration: "none",
                padding: "1px 20px",
                borderRadius: "30px",
              }}
              onClick={() => {
                handleLogout();
                handleSavedNewsClick();
              }}
            >
              {currentUser && currentUser.name && <>{currentUser.name}</>}
              <img
                className="header__icon-logout"
                src={isSavedNewsRoute ? LogoutBlack : Logout}
                alt="Icono de logout"
              />
            </Link>
          </div>
        </>
      ) : (
        <>
          <h2 className="header__text"> NewsExplorer </h2>
          <button
            onClick={handleClick}
            className="header__button-menu header__button-menu_main header__button-menu_nav"
          >
            <img src={MenuMovile} alt="Menú" />
          </button>
          <div
            className={`header__container-texts-movile ${
              open ? `header__container-texts-movile_open` : ""
            }`}
          >
            <div className="header__container_movile">
              <h2 className="header__text_movile"> NewsExplorer </h2>
              <button onClick={handleClick} className="header__button-menu_main header__button-menu">
                <img
                  src={closeMenu}
                  alt="Icono de una X para cerrar el menú."
                />
              </button>
            </div>
            <div className="header__container__links_movile">
              <Link
                to="/"
                className="header__link_text"
                style={{ textDecoration: "none" }}
              >
                Inicio
              </Link>
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
            </div>
          </div>

          <div className="header__container-texts-desktop">
            <Link
              to="/"
              className="header__link_text"
              style={{ textDecoration: "none" }}
            >
              Inicio
            </Link>
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
          </div>
        </>
      )}
    </header>
  );
}

export default Header;
