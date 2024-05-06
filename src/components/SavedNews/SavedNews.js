import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import NewsCardList from "../NewsCardList/NewsCardList";
import useNewsContext from "../Hooks/useNewsContext";
import useUserContext from "../Hooks/useUserContext";

function SavedNews() {
  const { isLoggedIn } = useUserContext();
  const { fetchSavedCards, isSavedCardsFetched, savedCards, handleDeleteCard } = useNewsContext();
  
  const savedCardsCount = savedCards ? savedCards.length : 0;
  const location = useLocation();

  useEffect(() => {
    console.log(isSavedCardsFetched);
    // Llama a fetchSavedCards solo si no se ha llamado previamente
    if (!isSavedCardsFetched) {
      fetchSavedCards();
    }
  }, [fetchSavedCards, isSavedCardsFetched]);

  if (isLoggedIn && location.pathname === "/saved-news") {
    return (
      <section>
        <SavedNewsHeader
          savedCards={savedCards}
          savedCardsCount={savedCardsCount}
          // allSearchQueries={allSearchQueries}
        />
        <div className="saved-news__cards">
          {savedCards.length > 0 ? (
            savedCards.map((card, index) => (
              <NewsCardList
                key={card.id}
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
