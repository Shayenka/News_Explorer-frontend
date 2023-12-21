import React, { useState } from 'react';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function SavedNews({ cards, searchQueries }) {
  return (
    <>
      <Header />
      <div className="saved-news">
        <SavedNewsHeader savedCardsCount={cards.length} searchQueries={searchQueries} />
        <NewsCardList cards={cards} />
      </div>
      <Footer />
    </>
  );
}

export default SavedNews;
