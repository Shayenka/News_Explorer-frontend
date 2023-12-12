import React, { useContext, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import SearchForm from "../SearchForm/SearchForm";
import NewsCard from "../NewsCard/NewsCard";
import Api from "../../utils/api";
import NoResultsFound from "../../images/not-found_image.svg";
import Preloader from "../Preloader/Preloader";

// CLAVE API: 016f14e7761d4baca1c75b200bde1015
function Main() {
  const currentUser = useContext(CurrentUserContext);
  const [error, setError] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleCards, setVisibleCards] = useState(3);
  const [query, setQuery] = useState(''); 
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

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
      const from = sevenDaysAgo.toISOString().split('T')[0];
      const to = new Date().toISOString().split('T')[0];

      // Realizar la solicitud a la API
      const response = await api._useFetch(
        null,
       // `${api.address}/v2/everything?q=Brazil&apiKey=${api.apiKey}&from=${from}&to=${to}&pageSize=100`,
       `https://newsapi.org/v2/everything?q=${query}&from=2023-11-12&sortBy=publishedAt&apiKey=${api.apiKey}`, 
        "GET"
      );

      // Actualizar los resultados de la búsqueda en el estado
      setSearchResults(response.articles);
      setError(''); // Limpiar el mensaje de error en caso de éxito
    } catch (error) {
      console.error("Error en la búsqueda de noticias:", error.message);
      setError('Lo sentimos, algo ha salido mal durante la solicitud. Por favor, inténtelo de nuevo.');
    } finally {
      setIsLoading(false);
      setQuery('');
    }
  };

  const handleShowMore = () => {
    if (!isLoading) {
      setVisibleCards((prev) => prev + 3); // Incrementar la carga
      setIsButtonDisabled(true); // Deshabilitar el botón 
      handleSearch();  // Realizar la carga adicional
    }
  };

  return (
    <main>
      <section className="main">
        <h1 className="main__title">¿Qué está pasando en el mundo?</h1>
        <h2 className="main__subtitle">Encuentra las últimas noticias sobre cualquier tema y guárdalas en tu cuenta personal.</h2>

        <SearchForm onSearch={handleSearch} />
      </section>

      {searchResults.length > 0 && (
      <section className="main_cards">
        {isLoading && <Preloader />}

        {/* Mostrar solo las tarjetas visibles */}
        {searchResults.slice(0, visibleCards).map((article) => (
          <NewsCard
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
           <button onClick={handleShowMore} disabled={isButtonDisabled}>
           Mostrar más
         </button>
        )}

        {/* Mensaje de no resultados */}
        {searchResults.length === 0 && query && (
          <div className="NoResultsFound__container">
            <>
              <img className="NoResultsFound-image" src={NoResultsFound} alt="No Results Found" />
              <p className="NoResultsFound-mesageMain">No se encontró nada</p>
              <p className="NoResultsFound-mesage">Lo sentimos, pero no hay nada que coincida con tus términos de búsqueda.</p>
            </>
          </div>
        )}

        {error && <p className="searchResults__mesageError" style={{ color: 'red' }}>{error}</p>}
      </section>
)}
</main>
);
}

export default Main;
