import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import useUserContext from "../Hooks/useUserContext";
import Logout from "../../images/logout.svg";
import LogoutBlack from "../../images/logout-black.svg";
import MenuMovile from "../../images/menu-movile.svg";
import closePopUp from "../../images/close.svg";

function Header({
  handleLoginPopUp,
  onSavedNewsClick,
  handleSavedNewsClick,
  isSavedNewsClicked,
}) {
  const { user: currentUser, isLoggedIn, handleLogout } = useUserContext();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  }
 

  return (
    <header className="header">
      {isLoggedIn ? (
        <>
        <h2
            className={`header__text ${
              isSavedNewsClicked ? "header__text_SavedNews" : ""
            }`}
          >
            {" "}
            NewsExplorer{" "}
          </h2>
          <button onClick={handleClick} className="header__button header__button_nav">
            <img src={MenuMovile} alt="Menú" />
          </button>
          {/* <div className={`header__container-texts-movile ${
  open ? (isSavedNewsClicked ? "header__container-texts-movile_open-SavedNews" : "header__container-texts-movile_open") : ""
}`}> */}

<div className={`header__container-texts-movile ${isSavedNewsClicked ? 'header__container-texts-movile-savedNews' : ''} ${ open ? (isSavedNewsClicked ? "header__container-texts-movile_open-SavedNews" : "header__container-texts-movile_open") : ""
}`}>
          <h2 className="header__text"> NewsExplorer </h2>
          <button onClick={handleClick} className="header__button">
          <img src={closePopUp} alt="Icono de una X para cerrar el menú." />
          </button>
          
            <Link
              to="/"
              className={`header__link_text ${
                isSavedNewsClicked ? "header__link_text_SavedNews" : ""
              }`}
              style={{ textDecoration: "none" }}
              onClick={() => {
                handleSavedNewsClick();
              }}
            >
              Inicio
            </Link>
            {/* <div className="header__container_SavedNews"> */}
              <Link
                to="/saved-news"
                className={`header__link_text ${
                  isSavedNewsClicked ? "header__link_text_SavedNews" : ""
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
                  isSavedNewsClicked ? "header__link_text-border_SavedNews" : ""
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
                  src={isSavedNewsClicked ? LogoutBlack : Logout}
                  alt="Icono de logout"
                />
              </Link>
          </div> 
          {/* <h2
            className={`header__text ${
              isSavedNewsClicked ? "header__text_SavedNews" : ""
            }`}
          >
            {" "}
            NewsExplorer{" "}
          </h2> */}
          {/* <h2 className="header__text_SavedNews"> NewsExplorer </h2> */}
          <div className={"header__container-texts-desktop"}>
            <Link
              to="/"
              className={`header__link_text ${
                isSavedNewsClicked ? "header__link_text_SavedNews" : ""
              }`}
              style={{ textDecoration: "none" }}
              onClick={() => {
                handleSavedNewsClick();
              }}
            >
              Inicio
            </Link>
            {/* <div className="header__container_SavedNews"> */}
              <Link
                to="/saved-news"
                className={`header__link_text ${
                  isSavedNewsClicked ? "header__link_text_SavedNews" : ""
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
                  isSavedNewsClicked ? "header__link_text-border_SavedNews" : ""
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
                  src={isSavedNewsClicked ? LogoutBlack : Logout}
                  alt="Icono de logout"
                />
              </Link>
            {/* </div> */}
          </div>
        </>
      ) : (
        <>
          <h2 className="header__text"> NewsExplorer </h2>
          <button onClick={handleClick} className="header__button header__button_nav">
            <img src={MenuMovile} alt="Menú" />
          </button>
          <div className={`header__container-texts-movile ${
                  open ? `header__container-texts-movile_open` : ""
                }`}> 

          <h2 className="header__text"> NewsExplorer </h2>
          <button onClick={handleClick} className="header__button">
          <img src={closePopUp} alt="Icono de una X para cerrar el menú." />
          </button>
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

