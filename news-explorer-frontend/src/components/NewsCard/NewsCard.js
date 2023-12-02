import React, { useContext, useState } from "react";
import savedCard from "../../images/Guardar.svg";
// import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function NewsCard(props) {
  // const currentUser = useContext(CurrentUserContext);
  const [showLoginMessage, setShowLoginMessage] = useState(false);

  function handleSavedCard() {
    if (props.isLoggedIn) {
      props.onCardSaved(props.card);
    } else {
      setShowLoginMessage(true);
    }
  }

  function hideLoginMessage() {
    setShowLoginMessage(false);
  }

  return (
    <div className="card" key={props.card._id}>
      <div className="card__header">
        <img
          className={`card__icon-saved ${props.isLoggedIn ? "card__icon-saved_changeColor" : ""}`}
          src={savedCard}
          alt={`Icono para ${props.isLoggedIn ? "guardar en" : "quitar de"} favoritos`}
          onClick={() => {
            handleSavedCard();
            hideLoginMessage();
          }}
        />
        {!props.isLoggedIn && showLoginMessage && (
          <p className="card__login-message">Inicia sesión para guardar artículos</p>
        )}
      </div>
      <img
        className="card__image"
        src={props.link}
        alt={props.name}
        style={{ backgroundImage: `url(${props.link})` }}
      />
      <div className="card__footer-image">
        <h4 className="card__date">{props.date}</h4>
        <h3 className="card__title">{props.title}</h3>
        <h3 className="card__description">{props.description}</h3>
      </div>
    </div>
  );
}

export default NewsCard;