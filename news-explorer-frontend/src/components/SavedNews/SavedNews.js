import React, { useContext } from "react";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import NewsCardList from "../NewsCardList/NewsCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function SavedNews({ cards = [], isLoggedIn, onDeleteCard, searchQueries }) {
  const savedCardsCount = cards ? cards.length : 0;

  return (
    <>
      {isLoggedIn ? (
        <section>
          <Header isLoggedIn={isLoggedIn} />
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
          <Footer />
        </section>
      ) : (
        ""
      )}
    </>
  );
}

export default SavedNews;
