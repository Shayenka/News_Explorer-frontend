import React, { useContext } from "react";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import NewsCardList from "../NewsCardList/NewsCardList";
import { NewsContext } from "../../contexts/CurrentUserContext";

function SavedNews({ isLoggedIn, isSavedNewsClicked }) {
  const { savedCards, searchQueries, handleDeleteCard } = useContext(NewsContext);
  const savedCardsCount = savedCards ? savedCards.length : 0;

  console.log("Cards in SavedNews:", savedCards);
  

  if (isLoggedIn && isSavedNewsClicked) {
  return (
    // <>
    //   {isLoggedIn ? (
        <section>
          {/* <Header isLoggedIn={isLoggedIn} /> */}
          <SavedNewsHeader
            savedCardsCount={savedCardsCount}
            searchQueries={searchQueries}
          />
          <div className="saved-news__cards">
            {savedCards.length > 0 ? (
              // Mostrar tarjetas si hay alguna
              savedCards.map((card, index) => (
                <NewsCardList
                  key={index}
                  card={card}
                  onDelete={() => handleDeleteCard(index)}
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
