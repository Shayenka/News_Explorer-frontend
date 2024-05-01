import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import NewsCard from "../NewsCard/NewsCard";
import NoResultsFound from "../../images/not-found_image.svg";
import Preloader from "../Preloader/Preloader";
import SavedNews from "../SavedNews/SavedNews";
import About from "../About/About";
import SearchBanner from "../SearchBanner/SearchBanner";
import useNewsContext from "../Hooks/useNewsContext";
import useUserContext from "../Hooks/useUserContext";
import useSearchContext from "../Hooks/useSearchContext";

function Main() {
  const { isLoggedIn } = useUserContext();
  const { savedCards, fetchSavedCards, isSavedCardsFetched } = useNewsContext();
  const {
    query,
    setQuery,
    handleSearch,
    searchResults,
    isLoading,
    searchProcess,
  } = useSearchContext();
  const [visibleCards, setVisibleCards] = useState(3);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    console.log(isSavedCardsFetched);
    // Llama a fetchSavedCards solo si no se ha llamado previamente
    // y estamos en la página de "Artículos guardados"
    if (!isSavedCardsFetched && location.pathname === "/saved-news") {
      fetchSavedCards();
    }
  }, [fetchSavedCards, isSavedCardsFetched, location.pathname]);


  const handleShowMore = async () => {
    if (!isLoading) {
      setIsButtonDisabled(true);
      try {
        setVisibleCards((prev) => prev + 3);

        // await handleSearch();
      } finally {
        setIsButtonDisabled(false);
      }
    }
  };

  return (
    <>
      <SearchBanner
        handleSearch={handleSearch}
        setQuery={setQuery}
        query={query}
      />

      {searchResults.length > 0 ? (
        <>
        <div className="container_Results__message_Main">
          <h3 className="Results__message_Main">Resultados de la búsqueda</h3>
          </div>
          <section className="container__main__cards">
          <div className="main__cards">
            {isLoading && <Preloader />}

            {searchResults.slice(0, visibleCards).map((article, index) => (
              <NewsCard
                key={index}
                isLoggedIn={isLoggedIn}
                card={article}
                sourceName={article.source.name}
                title={article.title}
                publishedAt={article.publishedAt}
                description={article.description}
                urlToImage={article.urlToImage}
              />
            ))}
            </div>
            {visibleCards < searchResults.length && (
              <button
                className="main__cards_button-ShowMore"
                style={{ margin: "0 auto" }}
                onClick={handleShowMore}
                disabled={isButtonDisabled}
              >
                Ver más
              </button>
            )}

          </section>
        </>
      ) : (
        <>
          {searchProcess && (
            <div className="NoResultsFound__container">
              <img
                className="NoResultsFound-image"
                src={NoResultsFound}
                alt="No Results Found"
              />
              <p className="NoResultsFound-messageMain">No se encontró nada</p>
              <p className="NoResultsFound-message">
                Lo sentimos, pero no hay nada que coincida con tus términos de
                búsqueda.
              </p>
            </div>
          )}
        </>
      )}

      {savedCards.length > 0 ? (
        <SavedNews />
      ) : (
        <SavedNews
          savedCards={[]}
          handleDeleteCard={() => {}}
          searchQueries={[]}
        />
      )}
      <About />
    </>
  );
}

export default Main;
