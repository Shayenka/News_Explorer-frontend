import React from "react";
import { Link,  useNavigate } from "react-router-dom";
import closePopUp from "../../images/close.svg";

export function PopUpSuccessfulRegister(props) {

  return (
    <section
      className={`popup__info-container ${
        props.isOpen ? "" : "popup__info-closed"
      }`}
    >
      <img
        className="popup__info-CloseIcon"
        src={closePopUp}
        alt="Icono de una X para cerrar ventana emergente."
        onClick={props.onClose}
      />
      <h3 className="popup__info-text">
        ¡El registro se ha completado con éxito!
      </h3>
      <Link
        to="/signin"
        className="popup__info-link"
        style={{ textDecoration: "none" }}
        onClick={() => {
          props.onClose(); 
          props.onOpenLogin();
        }}
      >
        Iniciar sesión
      </Link>
    </section>
  );
}

export function PopUpFailedRegister(props) {
  return (
    <section
      className={`popup__info-container ${
        props.isOpen ? "" : "popup__info-closed"
      }`}
    >
      <img
        className="popup__info-CloseIcon"
        src={closePopUp}
        alt="Icono de una X para cerrar ventana emergente."
        onClick={props.onClose}
      />
      <h3 className="popup__info-text">
        ¡El registro no se pudo completar con éxito!
      </h3>
      <Link
        to="/signup"
        className="popup__info-link"
        style={{ textDecoration: "none" }}
        onClick={() => {
          props.onClose(); 
          props.onOpenRegister(); 
        }}
      >
        Inscribirse
      </Link>
    </section>
  );
}

export function PopUpUserRegistered(props) {
  // const navigate = useNavigate();

  // const handleClosePopup = () => {
  //   props.onClose();
  //   navigate("/"); 
  // };
  return (
    <section
      className={`popup__info-container ${
        props.isOpen ? "" : "popup__info-closed"
      }`}
    >
      <img
        className="popup__info-CloseIcon"
        src={closePopUp}
        alt="Icono de una X para cerrar ventana emergente."
        onClick={props.onClose}
      />
      <h3 className="popup__info-text">¡El usuario ya existe!</h3>
      <Link
        to="/signup"
        className="popup__info-link"
        style={{ textDecoration: "none" }}
        onClick={() => {
          props.onClose(); 
          props.onOpenRegister(); 
        }}
      >
        Inscribirse
      </Link>
    </section>
  );
}

export function PopUpFailedInput(props) {
  return (
    <section
      className={`popup__info-container ${
        props.isOpen ? "" : "popup__info-closed"
      }`}
    >
      <img
        className="popup__info-CloseIcon"
        src={closePopUp}
        alt="Icono de una X para cerrar ventana emergente."
        onClick={props.onClose}
      />
      <h3 className="popup__info-text">¡Debes completar los datos!</h3>
      <Link
        to="/signin"
        className="popup__info-link"
        style={{ textDecoration: "none" }}
        onClick={() => {
          props.onClose(); 
          props.onOpenLogin();
        }}
      >
        Iniciar sesión
      </Link>
    </section>
  );
}

export function PopUpFailedLogin(props) {
  const navigate = useNavigate();

  const handleClosePopup = () => {
    props.onClose();
    navigate("/"); 
  };

  return (
    <section
      className={`popup__info-container ${
        props.isOpen ? "" : "popup__info-closed"
      }`}
    >
      <img
        className="popup__info-CloseIcon"
        src={closePopUp}
        alt="Icono de una X para cerrar ventana emergente."
        onClick={handleClosePopup}
        
      />
      <h3 className="popup__info-text">¡Usuario no registrado!</h3>
      <Link
        to="/signin"
        className="popup__info-link"
        style={{ textDecoration: "none" }}
        onClick={() => {
          props.onClose(); 
          props.onOpenLogin();
        }} 
      >
        Inscribirse
      </Link>
    </section>
  );
}
