import React, { useContext, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import SearchForm from "../SearchForm/SearchForm";
import NewsCard from "../NewsCard/NewsCard";
import Api from "../../utils/api";
import NoResultsFound from "../../images/not-found_image.svg";
import Preloader from "../Preloader/Preloader";
import SavedNews from "../SavedNews/SavedNews";
import About from "../About/About";
import Footer from "../Footer/Footer";
import SearchBanner from "../SearchBanner/SearchBanner";

// CLAVE API: 016f14e7761d4baca1c75b200bde1015
function Main({ isLoggedIn }) {
  // const { setQuery, query } = useContext(CurrentUserContext);
  const [error, setError] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleCards, setVisibleCards] = useState(3);
  const [query, setQuery] = useState(''); 
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [savedCards, setSavedCards] = useState([]);
  const [searchQueries, setSearchQueries] = useState([]);
  const [searchProcess, setSearchProcess] = useState([null]);

  const api = new Api({
    address: "https://newsapi.org",
    apiKey: "016f14e7761d4baca1c75b200bde1015",
  });

  // Función que se ejecutará cuando se envíe el formulario de búsqueda
  const handleSearch = async () => {
    setError('');
    setIsLoading(true);
    try {
      // Obtener la fecha actual menos 7 días
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      // Formatear la fecha a YYYY-MM-DD
      const fromDate = sevenDaysAgo.toISOString().split('T')[0];
      const toDate = new Date().toISOString().split('T')[0];

      // Realizar la solicitud a la API
      const response = await api.get('/v2/everything', {
        q: query,
        apiKey: api.apiKey,
        from: fromDate,
        to: toDate,
        pageSize: 100,
      });
      
      console.log(response.articles);
      // Actualizar los resultados de la búsqueda en el estado
      setSearchResults(response.articles);
      setError(''); // Limpiar el mensaje de error en caso de éxito
      setSearchQueries((prevQueries) => [...prevQueries, query]);
      setSearchProcess(true);

  
    } catch (error) {
      console.error("Error en la búsqueda de noticias:", error.message);
      setError('Lo sentimos, algo ha salido mal durante la solicitud. Por favor, inténtelo de nuevo.');
    } finally {
      setIsLoading(false);
      setQuery('');
    }
  };

  const handleShowMore = async () => {
    if (!isLoading) {
      setIsButtonDisabled(true); // Deshabilitar el botón 
      try {
        // Incrementar la carga
        setVisibleCards((prev) => prev + 3);
        // Realizar la carga adicional
        await handleSearch();
      } finally {
        setIsButtonDisabled(false); // Habilitar el botón
      }
    }
  };

  const handleCardSaved = (card) => {
    const cardWithQueries = {
      ...card,
      searchQueries: [...searchQueries],
    };
  
    setSavedCards((prevSavedCards) => [...prevSavedCards, cardWithQueries]);
    console.log(savedCards);
  };

  const handleDeleteCard = (index) => {
    const updatedCards = [...savedCards];
    updatedCards.splice(index, 1);
    setSavedCards(updatedCards);
    console.log(savedCards);
  };

  console.log(searchResults);
  console.log(isLoading);


  return (
    <>
      <SearchBanner handleSearch={handleSearch} setQuery={setQuery} query={query} />
      {searchResults.length > 0 ? (
        <section className="main__cards">
          {isLoading && <Preloader />}
          {/* Mostrar solo las tarjetas visibles */}
          {searchResults.slice(0, visibleCards).map((article, index) => (
            <NewsCard
              key={index}
              isLoggedIn={isLoggedIn}
              onCardSaved={handleCardSaved} 
              onCardDelete={handleDeleteCard}
              card={article} 
              sourceName={article.source.name}
              title={article.title}
              publishedAt={article.publishedAt}
              description={article.description}
              urlToImage={article.urlToImage}
              // Otras propiedades
            />
          ))}
          {/* Botón "Mostrar más" */}
          {visibleCards < searchResults.length && (
            <button className="main__cards_button-ShowMore" onClick={handleShowMore} disabled={isButtonDisabled}>
              Mostrar más
            </button>
          )}
          {/* Mensaje de no resultados
          {(searchResults.length === 0 && isLoading) && (
            <div className="NoResultsFound__container">
              <img className="NoResultsFound-image" src={NoResultsFound} alt="No Results Found" />
              <p className="NoResultsFound-messageMain">No se encontró nada</p>
              <p className="NoResultsFound-message">Lo sentimos, pero no hay nada que coincida con tus términos de búsqueda.</p>
            </div>
          )} */}
        </section>
      ):(
        <>
         {/* Mensaje de no resultados */}
         {(searchProcess) && (
            <div className="NoResultsFound__container">
              <img className="NoResultsFound-image" src={NoResultsFound} alt="No Results Found" />
              <p className="NoResultsFound-messageMain">No se encontró nada</p>
              <p className="NoResultsFound-message">Lo sentimos, pero no hay nada que coincida con tus términos de búsqueda.</p>
            </div>
          )}

        </>
      )}
      {/* Pasar las tarjetas guardadas a SavedNews */}
      {savedCards.length > 0 ? (
        <SavedNews cards={savedCards} onDeleteCard={handleDeleteCard} searchQueries={searchQueries} />
      ) : (
        <SavedNews cards={[]} isLoggedIn={isLoggedIn} onDeleteCard={() => {}} searchQueries={[]} />
      )}
      <About />
      {/* <Footer /> */}
    </>
  );
}

export default Main;
