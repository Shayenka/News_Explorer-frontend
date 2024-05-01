import React, { useState, useEffect } from "react";
import savedCard from "../../images/iconGuardar.svg";
import savedCardClick from "../../images/iconGuardarClick.svg";
import savedCardChangeColor from "../../images/IconGuardarChangeBlue.svg";
import useNewsContext from "../Hooks/useNewsContext";
import { formatDate } from "../../utils/validator";
import randomstring from "randomstring";

function NewsCard(props) {
  const { handleCardSaved } = useNewsContext();
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [savedCardSrc, setSavedCardSrc] = useState(savedCard);

  function handleSavedCard() {
    if (props.isLoggedIn) {
      setIsSaved(true);
      const NewIdCard = randomstring.generate(10);
      const CardWithId = {...props.card, id:NewIdCard}
      handleCardSaved(CardWithId);
      console.log(CardWithId);
    } else {
      setIsSaved(false);
      setShowLoginMessage(true);
    }
  }

  useEffect(() => {
    if (props.isLoggedIn && isSaved) {
      setSavedCardSrc(savedCardChangeColor);
    } else if (!props.isLoggedIn && showLoginMessage) {
      setSavedCardSrc(savedCardClick);
    } else {
      setSavedCardSrc(savedCard);
    }
  }, [isSaved, showLoginMessage, props.isLoggedIn]);

  return (
    <div className="card">
      <div className="card__header">
        <div className="card__icon-container">
          <img
            className="card__icon-saved"
            src={savedCardSrc}
            alt={`Icono para guardar tarjeta`}
            onClick={() => {
              handleSavedCard();
            }}
          />
        </div>
        {!props.isLoggedIn && showLoginMessage && (
          <div className="card__login-message-container">
            <p className="card__login-message">
              Inicia sesión para guardar artículos
            </p>
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
        <h4 className="card__date">{formatDate(props.publishedAt)}</h4>
        <h3 className="card__title">{props.title}</h3>
        <p className="card__description">{props.description}</p>
        <p className="card__source">{props.sourceName}</p>
      </div>
    </div>
  );
}

export default NewsCard;
