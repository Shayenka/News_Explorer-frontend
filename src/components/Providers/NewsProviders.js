import { useState } from "react";
import { NewsContext } from "../../contexts/NewsContext";
import Api from "../../utils/api"; 

const api = new Api({
  address: "http://localhost:3001",
});

export default function NewsProvider({ children }) {
  const [savedCards, setSavedCards] = useState([]);
  const [searchQueries, setSearchQueries] = useState([]);
  const [allSearchQueries, setAllSearchQueries] = useState([]);

  const fetchSavedCards = async () => {
    try {
      // Realizar la solicitud GET para obtener las tarjetas guardadas
      const response = await api.getSavedArticles();
      // Verificar si la respuesta contiene datos
      if (response && response.length > 0) {
        setSavedCards(response);
      } else {
        console.log("No se encontraron tarjetas guardadas.");
      }
    } catch (error) {
      console.error("Error al obtener las tarjetas guardadas:", error);
    }
  };

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

  const handleDeleteCard = async (index) => {
    const updatedCards = [...savedCards];
    console.log(index);
    const deletedCard = updatedCards.splice(index, 1)[0]
    ;
    setSavedCards(updatedCards);

    const deletedCardSearchQueries = deletedCard.searchQueries || [];
    setAllSearchQueries((prevQueries) => {
      const updatedQueries = prevQueries.filter(
        (query) => !deletedCardSearchQueries.includes(query)
      );
      return updatedQueries;
    });

    try {
      // Envía la solicitud DELETE a la API para eliminar la tarjeta
      console.log(deletedCard);
      await api.delete(`/articles/${deletedCard.id}`);
      console.log("Tarjeta eliminada en la API con éxito");
    } catch (error) {
      // Maneja los errores de la solicitud DELETE y revierte los cambios en el estado local
      console.error("Error al eliminar la tarjeta en la API:", error);
      setSavedCards([...updatedCards, deletedCard]);
      setAllSearchQueries((prevQueries) => [...prevQueries, ...deletedCardSearchQueries]);
    }
  };

  return (
    <NewsContext.Provider
      value={{
        fetchSavedCards,
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
