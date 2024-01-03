import React, { useState } from "react";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import NewsCardList from "../NewsCardList/NewsCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function SavedNews({ cards = [], isLoggedIn, onDeleteCard, searchQueries }) {
  console.log("SavedNews component rendered");

  const savedCardsCount = cards ? cards.length : 0;

  return (
    <>
      {isLoggedIn ? (
        <section className="savedNews-container">
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
              <p>No hay tarjetas guardadas.</p>
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
