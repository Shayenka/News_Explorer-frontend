import { useState } from "react";
import { NewsContext } from "../../contexts/NewsContext";

export default function NewsProvider({children}) {
  const [savedCards, setSavedCards] = useState([]);
  const [searchQueries, setSearchQueries] = useState([]);
  const [allSearchQueries, setAllSearchQueries] = useState([]);

  //Funciones para las cards
  const handleCardSaved = (card) => {
    // Verificar si la tarjeta ya está guardada
    const isCardAlreadySaved = savedCards.some(
      (savedCard) => savedCard.title === card.title
    );

    // Si la tarjeta no está guardada, agregarla
    if (!isCardAlreadySaved) {
      const cardWithQueries = {
        ...card,
        searchQueries: [...searchQueries],
      };

      setSavedCards((prevSavedCards) => {
        const updatedCards = [...prevSavedCards, cardWithQueries];
        console.log("Cards in main:", updatedCards);

        //Actualizar las palabras clave solo cuando se guarda la tarjeta
        setAllSearchQueries((prevQueries) => {
          const updatedQueries = [...prevQueries, ...searchQueries];
          return updatedQueries;
        });

        return updatedCards;
      });
    }
  };

  const handleDeleteCard = (index) => {
    // Eliminar la tarjeta del estado de savedCards
    const updatedCards = [...savedCards];
    updatedCards.splice(index, 1);
    setSavedCards(updatedCards);

    // Obtener las palabras clave de la tarjeta que se va a eliminar
    const deletedCard = savedCards[index];
    const deletedCardSearchQueries = deletedCard.searchQueries || [];

    // Filtrar las palabras clave de la tarjeta eliminada de allSearchQueries
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
