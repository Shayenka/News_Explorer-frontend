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
  const [isSavedCardsFetched, setIsSavedCardsFetched] = useState(false);

  const fetchSavedCards = async () => {
    setIsSavedCardsFetched(true);
    try {
      const response = await api.getSavedArticles();
      if (response && response.length > 0) {
        setSavedCards(response);
        setIsSavedCardsFetched(true);
      } else {
        console.log("No se encontraron tarjetas guardadas.");
      }
    } catch (error) {
      console.error("Error al obtener las tarjetas guardadas:", error);
    }
  };

  const handleCardSaved = async (card) => {
    const isCardAlreadySaved = savedCards.some(
      (savedCard) => savedCard.id === card.id
    );

    if (!isCardAlreadySaved) {
      const updatedSearchQueries = [...searchQueries];
      const cardWithQueries = {
        ...card,
        searchQueries: updatedSearchQueries,
      };

      try {
        await api.saveArticle(cardWithQueries);

        const storedCards =
          JSON.parse(localStorage.getItem("savedCards")) || [];

        const updatedCards = [...storedCards, cardWithQueries];

        localStorage.setItem("savedCards", JSON.stringify(updatedCards));

        setSavedCards((prevSavedCards) => {
          const updatedCards = [...prevSavedCards, cardWithQueries];
          return updatedCards;
        });

        setAllSearchQueries((prevQueries) => {
          const updatedQueries = [...prevQueries, ...searchQueries];
          return updatedQueries;
        });
      } catch (error) {
        console.error("Error al guardar la tarjeta en la API:", error);
      }
    }
  };

  const handleDeleteCard = async (index) => {
    const updatedCards = [...savedCards];
    const deletedCard = updatedCards.splice(index, 1)[0];
    setSavedCards(updatedCards);

    const deletedCardSearchQueries = deletedCard.searchQueries || [];
    setAllSearchQueries((prevQueries) => {
      const updatedQueries = prevQueries.filter(
        (query) => !deletedCardSearchQueries.includes(query)
      );
      return updatedQueries;
    });

    try {
      await api.deleteArticle(`${deletedCard.id}`);
      console.log("Tarjeta eliminada en la API con éxito");
    } catch (error) {
      console.error("Error al eliminar la tarjeta en la API:", error);
      setSavedCards([...updatedCards, deletedCard]);
      setAllSearchQueries((prevQueries) => [
        ...prevQueries,
        ...deletedCardSearchQueries,
      ]);
    }
  };

  return (
    <NewsContext.Provider
      value={{
        fetchSavedCards,
        isSavedCardsFetched,
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
