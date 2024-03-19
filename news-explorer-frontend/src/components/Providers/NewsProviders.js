import { useState } from "react";
import { NewsContext } from "../../contexts/NewsContext";

export default function NewsProvider({ children }) {
  const [savedCards, setSavedCards] = useState([]);
  const [searchQueries, setSearchQueries] = useState([]);
  const [allSearchQueries, setAllSearchQueries] = useState([]);

  const handleCardSaved = (card) => {
    const isCardAlreadySaved = savedCards.some(
      (savedCard) => savedCard.title === card.title
    );

    if (!isCardAlreadySaved) {
      const cardWithQueries = {
        ...card,
        searchQueries: [...searchQueries],
      };

      setSavedCards((prevSavedCards) => {
        const updatedCards = [...prevSavedCards, cardWithQueries];
        console.log("Cards in main:", updatedCards);

        setAllSearchQueries((prevQueries) => {
          const updatedQueries = [...prevQueries, ...searchQueries];
          return updatedQueries;
        });

        return updatedCards;
      });
    }
  };

  const handleDeleteCard = (index) => {
    const updatedCards = [...savedCards];
    updatedCards.splice(index, 1);
    setSavedCards(updatedCards);

    const deletedCard = savedCards[index];
    const deletedCardSearchQueries = deletedCard.searchQueries || [];

    setAllSearchQueries((prevQueries) => {
      const updatedQueries = prevQueries.filter(
        (query) => !deletedCardSearchQueries.includes(query)
      );
      return updatedQueries;
    });
  };

  return (
    <NewsContext.Provider
      value={{
        handleCardSaved,
        savedCards,
        setSearchQueries,
        searchQueries,
        handleDeleteCard,
        allSearchQueries,
        setAllSearchQueries,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
}
