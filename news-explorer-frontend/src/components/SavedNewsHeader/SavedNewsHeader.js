import React, { useContext } from 'react';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function SavedNewsHeader({ savedCardsCount, searchQueries}) {
    const currentUser = useContext(CurrentUserContext);
    let queries = searchQueries.slice(0, 2);

    if (searchQueries.length > 2) {
        const queriesCount = searchQueries.length - 2;
        queries.push(`y ${queriesCount} más`);
      }

  return (
    <div className="saved-news-header">
      <h2 className="saved-news-header__title">Artículos guardados</h2>
      <p className="saved-news-header__count">{`${currentUser.name}, tienes ${savedCardsCount} artículos guardados`}</p>
      <p className="saved-news-header__queries">Por palabras clave: {queries.join(', ')}</p>
    </div>
  );
}

export default SavedNewsHeader;