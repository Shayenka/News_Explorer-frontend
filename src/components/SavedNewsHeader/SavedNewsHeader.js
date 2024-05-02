import React, { useContext, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function SavedNewsHeader({ savedCards, savedCardsCount }) {
  const {
    user: { name },
  } = useContext(CurrentUserContext);
  const [showAllQueries, setShowAllQueries] = useState(false);

  const capitalizeAndLowercase = (word) => {
    const str = String(word);
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  function countKeywords(savedCards) {
    const keywordCounts = {};
    if (savedCards && savedCards.length > 0) {
      savedCards.forEach((card) => {
        const searchQueries = card.searchQueries;
        if (searchQueries && searchQueries.length > 0) {
          searchQueries.forEach((keyword) => {
            const normalizedKeyword = capitalizeAndLowercase(keyword);
            if (keywordCounts[normalizedKeyword]) {
              keywordCounts[normalizedKeyword]++;
            } else {
              keywordCounts[normalizedKeyword] = 1;
            }
          });
        }
      });
    }
    return keywordCounts;
  }

  function sortKeywordsByFrequency(keywordCounts) {
    const keywordArray = Object.entries(keywordCounts);
    keywordArray.sort((a, b) => b[1] - a[1]);
    const sortedKeywords = keywordArray.map(([keyword, _]) => keyword);
    return sortedKeywords;
  }

  const keywordCounts = countKeywords(savedCards);
  const sortedKeywords = sortKeywordsByFrequency(keywordCounts);
  const displayedKeywords = showAllQueries
    ? sortedKeywords
    : sortedKeywords.slice(0, 2);
  const remainingKeywords = showAllQueries ? [] : sortedKeywords.slice(2);

  return (
    <div className="saved-news-header">
      <h2 className="saved-news-header__title">Artículos guardados</h2>
      <p className="saved-news-header__count">{`${name}, tienes ${savedCardsCount} artículos guardados`}</p>
      {displayedKeywords.length > 0 && (
        <>
          <span className="saved-news-header__queries">
            Por palabras clave:{" "}
          </span>
          <span className="saved-news-header__keywords">
            {displayedKeywords.map((keyword, index) => (
              <span key={index}>
                {keyword}
                {index < displayedKeywords.length - 1 && ", "}
              </span>
            ))}
            {remainingKeywords.length > 0 ? (
              <span
                className="show-more-link"
                onClick={() => setShowAllQueries(true)}
              >
                {" "}
                y {remainingKeywords.length} más
              </span>
            ) : null}
          </span>
        </>
      )}
    </div>
  );
}

export default SavedNewsHeader;
