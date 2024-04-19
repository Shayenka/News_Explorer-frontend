import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import closePopUp from "../../images/close.svg";

function ModalWithForm(props) {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        props.onClose();
      }
    };

    const handleClickOutside = (event) => {
      if (event.target.classList.contains("popup_opened")) {
        props.onClose();
      }
    };

    if (props.isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [props.isOpen, props.onClose]);

  return (
    <section
      className={`popup popup_type_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <form
        className="popup__container"
        id={props.name}
        noValidate
        onSubmit={props.onSubmit}
      >
        <img
          className="popup__close-icon"
          src={closePopUp}
          alt="Icono de una X para cerrar ventana emergente."
          onClick={props.onClose}
        />
        <h3 className="popup__title">{props.title}</h3>
        {props.children}
        <button type="submit" className="popup__button" disabled={props.isDisabled}>
          {props.submitButtonText}
        </button>
        <div className="popup__container-footer">
          <p className="popup__text_footer">ó</p>
          <Link
            to={props.isLoginPopUp ? "/signup" : "/signin"}
            className="popup__link_signup"
            style={{ textDecoration: "none" }}
            onClick={() => {
              props.isLoginPopUp
                ? props.handleRegisterPopUp()
                : props.handleLoginPopUp();
            }}
          >
            {props.isLoginPopUp ? "Inscribirse" : "Iniciar sesión"}
          </Link>
        </div>
      </form>
    </section>
  );
}

export default ModalWithForm;
