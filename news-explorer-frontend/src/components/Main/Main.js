import React, { useState } from "react";
import NewsCard from "../NewsCard/NewsCard";
import Api from "../../utils/api";
import NoResultsFound from "../../images/not-found_image.svg";
import Preloader from "../Preloader/Preloader";
import SavedNews from "../SavedNews/SavedNews";
import About from "../About/About";
import SearchBanner from "../SearchBanner/SearchBanner";
import useNewsContext from "../Hooks/useNewsContext";
import useUserContext from "../Hooks/useUserContext";

function Main() {
  const { isLoggedIn } = useUserContext();
  const { savedCards, setSearchQueries } = useNewsContext();
  const [error, setError] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleCards, setVisibleCards] = useState(3);
  const [query, setQuery] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [searchProcess, setSearchProcess] = useState(false);

  const api = new Api({
    address: "https://newsapi.org",
    apiKey: "016f14e7761d4baca1c75b200bde1015",
  });

  const handleSearch = async () => {
    setError("");
    setIsLoading(true);
    try {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const fromDate = sevenDaysAgo.toISOString().split("T")[0];
      const toDate = new Date().toISOString().split("T")[0];

      const response = await api.get("/v2/everything", {
        q: query,
        apiKey: api.apiKey,
        from: fromDate,
        to: toDate,
        pageSize: 100,
      });

      setSearchResults(response.articles);
      setError("");
      setSearchQueries((prevQueries) => {
        const finalQuery = [query];

        return finalQuery;
      });
      setSearchProcess(true);
    } catch (error) {
      console.error("Error en la búsqueda de noticias:", error.message);
      setError(
        "Lo sentimos, algo ha salido mal durante la solicitud. Por favor, inténtelo de nuevo."
      );
    } finally {
      setIsLoading(false);
      setQuery("");
    }
  };

  const handleShowMore = async () => {
    if (!isLoading) {
      setIsButtonDisabled(true);
      try {
        setVisibleCards((prev) => prev + 3);

        await handleSearch();
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
          <h3 className="Results__message_Main">Resultados de la búsqueda</h3>
          <section className="main__cards">
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

            {visibleCards < searchResults.length && (
              <button
                className="main__cards_button-ShowMore"
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
