import React, { useState, useEffect } from "react";
import deleteCard from "../../images/deleteCard.svg";
import deleteCardClick from "../../images/deleteCardClick.svg";
import { formatDate } from "../../utils/validator";

function NewsCardList({ card, onDelete }) {
  // const [showDeleteMessage, setShowDeleteMessage] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  // const [deleteCardSrc, setDeleteCardSrc] = useState(deleteCard);

  const capitalizeAndLowercase = (word) => {
    const str = String(word);

    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  if (card.keyWord) {
    card.searchQueries = card.keyWord.split(", ").map(word => capitalizeAndLowercase(word));
  }

  function handleMouseEnter() {
    setIsDelete(true);
  }

  function handleMouseLeave() {
    setIsDelete(false);
  }

  function handleDeleteNewsCard() {
    onDelete();
  }

  return (
    <div>
      <div className="card">
        <div className="card__header">
          <div className="card__icon-container">
            <img
              className="cardList__icon-delete"
              src={isDelete ? deleteCardClick : deleteCard}
              alt={`Icono para eliminar tarjeta`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleDeleteNewsCard}
            />
          </div>
          {isDelete && (
            <div className="cardList__delete-message-container">
              <p className="cardList__delete-message">Remove from saved</p>
            </div>
          )}
          <div className="cardList__query-container">
            <p className="cardList__query-text">{card.searchQueries}</p>
          </div>
        </div>
        <img
          className="card__image"
          src={card.urlToImage || card.image}
          alt={card.title}
          style={{ backgroundImage: `url(${card.urlToImage || card.image})` }}
        />
        <div className="card__footer-image">
          <h4 className="card__date">{formatDate(card.publishedAt || card.date)}</h4>
          <h3 className="card__title">{card.title}</h3>
          <p className="card__description">{card.description || card.text}</p>
          <p className="card__source">{card.sourceName || card.source}</p>
        </div>
      </div>
    </div>
  );
}

export default NewsCardList;
