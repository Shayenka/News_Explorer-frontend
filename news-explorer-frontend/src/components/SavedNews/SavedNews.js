import React, { useState } from "react";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import NewsCardList from "../NewsCardList/NewsCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function SavedNews({ cards, onDeleteCard, searchQueries }) {
  return (
    <>
    <section className="savedNews-container">
      <Header />
      <SavedNewsHeader
        savedCardsCount={cards.length}
        searchQueries={searchQueries}
      />
      <div className="saved-news">
        {cards.map((card, index) => (
          <NewsCardList
            key={index}
            card={card}
            onDelete={() => onDeleteCard(index)}
          />
        ))}
      </div>
      <Footer />
      </section>
    </>
  );
}

export default SavedNews;
