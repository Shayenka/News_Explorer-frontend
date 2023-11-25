import React from "react";
import { Link } from "react-router-dom";
import closePopUp from "../../images/close.svg";

export function PopUpSuccessfulRegister(props) {
  return (
    <section
      className={`popup__container-register ${
        props.isOpen ? "" : "popup_closed"
      }`}
    >
      <img
        className="popup__close-icon-register"
        src={closePopUp}
        alt="Icono de una X para cerrar ventana emergente."
        onClick={props.onClose}
      />
      <h3>¡El registro se ha completado con éxito!</h3>
      <Link
          to="/signin"
          className="popup__link-register"
          style={{ textDecoration: "none" }}
        >
          Iniciar sesión
        </Link>
    </section>
  );
}

export function PopUpFailedRegister(props) {
  return (
    <section
      className={`popup__container-register ${
        props.isOpen ? "" : "popup_closed"
      }`}
    >
      <img
        className="popup__close-icon-register"
        src={closePopUp}
        alt="Icono de una X para cerrar ventana emergente."
        onClick={props.onClose}
      />
       <h3>¡El registro no se pudo completar con éxito!</h3>
       <Link
          to="/signup"
          className="popup__link-register"
          style={{ textDecoration: "none" }}
        >
          Inscribirse
        </Link>
    </section>
  );
}

export function PopUpFailedLogin(props) {
    return (
      <section
        className={`popup__container-register ${
          props.isOpen ? "" : "popup_closed"
        }`}
      >
        <img
          className="popup__close-icon-register"
          src={closePopUp}
          alt="Icono de una X para cerrar ventana emergente."
          onClick={props.onClose}
        />
         <h3>¡No estas registrado!</h3>
         <Link
            to="/signup"
            className="popup__link-register"
            style={{ textDecoration: "none" }}
          >
            Inscribirse
          </Link>
      </section>
    );
  }