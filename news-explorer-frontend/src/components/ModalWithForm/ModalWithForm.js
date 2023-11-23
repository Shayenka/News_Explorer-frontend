import React from "react";
import { Link } from "react-router-dom";
import closePopUp from "../../images/close.svg";

function ModalWithForm(props) {
  return (
    <section className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <form className="popup__container" id={props.name} noValidate>
        <img
          className="popup__close-icon"
          src={closePopUp}
          alt="Icono de una X para cerrar ventana emergente."
          onClick={props.onClose}
        />
        <h3 className="popup__title">{props.title}</h3>
        {props.children}
        <button
          type="submit"
          className="popup__button"
          onClick={props.onSubmit}
          disabled={!props.isFormValid}
        >
          {props.submitButtonText}
        </button>
        <div className="popup__container-footer">
        <p className="popup__text_footer">ó</p>
        <Link
          to="/signup"
          className="popup__link_signup"
          style={{ textDecoration: "none" }}
        >
          inscribirse
        </Link>
        </div>
      </form>
    </section>
  );
}

export default ModalWithForm;