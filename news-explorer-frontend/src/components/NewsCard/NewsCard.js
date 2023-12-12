import React, { useContext, useState } from "react";
import savedCard from "../../images/iconGuardar.svg";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { formatDate } from "../../utils/validator"

function NewsCard(props) {
  const currentUser = useContext(CurrentUserContext);
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

  const cardSaveButtonClassName = `card__icon-saved ${
    props.isLoggedIn ? "card__icon-saved_changeColor" : "card__icon-savedClick"
  }`;


  return (
    <div className="card">
      <div className="card__header">
      <div className="card__icon-container">
        <img
          className={cardSaveButtonClassName}
          src={savedCard}
          alt={`Icono para guardar tarjeta`}
          onClick={() => {
            handleSavedCard();
            hideLoginMessage();
          }}
        />
        </div>
        {!props.isLoggedIn && showLoginMessage && (
          <div className="card__login-message-container">
          <p className="card__login-message">Inicia sesión para guardar artículos</p>
          </div>
        )}
      </div>
      <img
        className="card__image"
        src={props.urlToImage}
        alt={props.title}
        style={{ backgroundImage: `url(${props.urlToImage})` }}
      />
      <div className="card__footer-image">
        <h4 className="card__date">{formatDate(publishedAt)}</h4>
        <h3 className="card__title">{props.title}</h3>
        <p className="card__description">{props.description}</p>
        <p className="card__source">{props.source.name}</p>
      </div>
    </div>
  );
}

export default NewsCard;