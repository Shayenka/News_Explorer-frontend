import React, { useContext, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function SavedNewsHeader({ savedCards, savedCardsCount, allSearchQueries }) {
  const {
    user: { name },
  } = useContext(CurrentUserContext);

  const [showAllQueries, setShowAllQueries] = useState(false);

  // Función para transformar la primera letra en mayúscula de una palabra
  const capitalizeFirstLetter = (word) => {
    // Asegurarse de que word sea una cadena de texto
    const str = String(word);
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // Transformar la primera letra en mayúscula de cada palabra en allSearchQueries
  const capitalizedQueries = allSearchQueries
    ? allSearchQueries.map((query) => capitalizeFirstLetter(query))
    : [];

  let displayedQueries = [];

  if (savedCards.length > 0) {
    if (capitalizedQueries.length > 0) {
      const uniqueQueriesSet = new Set(capitalizedQueries);
      const uniqueQueriesArray = Array.from(uniqueQueriesSet);

      if (showAllQueries) {
        displayedQueries = uniqueQueriesArray;
      } else {
        displayedQueries = uniqueQueriesArray.slice(0, 2);

        if (uniqueQueriesArray.length > 2) {
          const remainingCount = uniqueQueriesArray.length - displayedQueries.length;
          displayedQueries.push(
            <span
              className="show-more-link"
              onClick={() => setShowAllQueries(true)}
              key="show-more"
            >
              {` y ${capitalizeFirstLetter(remainingCount)} más`}
            </span>
          );
        }
      }
    }
  }

  return (
    <div className="saved-news-header">
      <h2 className="saved-news-header__title">Artículos guardados</h2>
      <p className="saved-news-header__count">{`${name}, tienes ${savedCardsCount} artículos guardados`}</p>
      {displayedQueries.length > 0 && (
        <p className="saved-news-header__queries">
          Por palabras clave: {displayedQueries.map((query, index) => (
            <span key={index}>
              {query}
              {index < displayedQueries.length - 1 && ", "}
            </span>
          ))}
        </p>
      )}
    </div>
  );
}

export default SavedNewsHeader;
