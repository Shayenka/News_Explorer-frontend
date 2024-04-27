import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import NewsCardList from "../NewsCardList/NewsCardList";
import useNewsContext from "../Hooks/useNewsContext";
import useUserContext from "../Hooks/useUserContext";

function SavedNews() {
  const { isLoggedIn } = useUserContext();
  const { fetchSavedCards, savedCards, allSearchQueries, handleDeleteCard } = useNewsContext();
  
  const savedCardsCount = savedCards ? savedCards.length : 0;
  const location = useLocation();

  useEffect(() => {
    // Llamar a la función para obtener las tarjetas guardadas cuando el componente se monta
    fetchSavedCards();
  }, []); 

  if (isLoggedIn && location.pathname === "/saved-news") {
    return (
      <section>
        <SavedNewsHeader
          savedCards={savedCards}
          savedCardsCount={savedCardsCount}
          allSearchQueries={allSearchQueries}
        />
        <div className="saved-news__cards">
          {savedCards.length > 0 ? (
            savedCards.map((card, index) => (
              <NewsCardList
                key={card.url}
                card={card}
                onDelete={() => handleDeleteCard(index)}
              />
            ))
          ) : (
            <p className="saved-news_NoCardsFound">
              No hay tarjetas guardadas.
            </p>
          )}
        </div>
      </section>
    );
  } else {
    return null;
  }
}

export default SavedNews;
