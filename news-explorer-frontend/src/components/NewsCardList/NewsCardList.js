import React from 'react';
import NewsCard from '../NewsCard/NewsCard';

function NewsCardList({ cards }) {
  return (
    <div className="news-card-list">
      {cards.map((card, index) => (
        <NewsCard key={index} card={card} />
      ))}
    </div>
  );
}

export default NewsCardList;