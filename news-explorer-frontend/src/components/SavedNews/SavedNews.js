import React, { useContext } from "react";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import NewsCardList from "../NewsCardList/NewsCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function SavedNews({ cards = [], isLoggedIn, onDeleteCard, searchQueries, isSavedNewsClicked}) {
  const savedCardsCount = cards ? cards.length : 0;

  if (isLoggedIn && isSavedNewsClicked) {
  return (
    // <>
    //   {isLoggedIn ? (
        <section className="savedNews">
          {/* <Header isLoggedIn={isLoggedIn} /> */}
          <SavedNewsHeader
            savedCardsCount={savedCardsCount}
            searchQueries={searchQueries}
          />
          <div className="saved-news">
            {cards.length > 0 ? (
              // Mostrar tarjetas si hay alguna
              cards.map((card, index) => (
                <NewsCardList
                  key={index}
                  card={card}
                  onDelete={() => onDeleteCard(index)}
                />
              ))
            ) : (
              // Mostrar mensaje si no hay tarjetas
              <p className="saved-news_NoCardsFound">No hay tarjetas guardadas.</p>
            )}
          </div>
      </section>
    );
  } else {
    // Renderizar algo diferente o nada si no cumple con las condiciones
    return null;
  }
}

export default SavedNews;
