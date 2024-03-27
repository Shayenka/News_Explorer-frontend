import React, { useContext, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function SavedNewsHeader({ savedCards, savedCardsCount, allSearchQueries }) {
  const {
    user: { name },
  } = useContext(CurrentUserContext);
  const [showAllQueries, setShowAllQueries] = useState(false);

  const capitalizeAndLowercase = (word) => {
    const str = String(word);

    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const capitalizedQueries = allSearchQueries
    ? allSearchQueries.map((query) => capitalizeAndLowercase(query))
    : [];

  let displayedQueries = [];

  if (savedCards.length > 0) {
    const uniqueQueriesSet = new Set(capitalizedQueries);
    const uniqueQueriesArray = Array.from(uniqueQueriesSet);

    if (showAllQueries) {
      displayedQueries = uniqueQueriesArray;
    } else {
      displayedQueries = uniqueQueriesArray.slice(0, 2);

      if (uniqueQueriesArray.length > 2) {
        const remainingCount =
          uniqueQueriesArray.length - displayedQueries.length;
        displayedQueries.push(
          <span
            className="show-more-link"
            onClick={() => setShowAllQueries(true)}
            key="show-more"
          >
            {` y ${remainingCount} más`}
          </span>
        );
      }
    }
  }

  return (
    <div className="saved-news-header">
      <h2 className="saved-news-header__title">Artículos guardados</h2>
      <p className="saved-news-header__count">{`${name}, tienes ${savedCardsCount} artículos guardados`}</p>
      {displayedQueries.length > 0 && (
        <>
          <span className="saved-news-header__queries">
            Por palabras clave:{" "}
          </span>
          <span className="saved-news-header__keywords">
            {displayedQueries.map((query, index) => (
              <span key={index}>
                {query}
                {index < displayedQueries.length - 1 && ", "}
              </span>
            ))}
          </span>
        </>
      )}
    </div>
  );
}

export default SavedNewsHeader;
