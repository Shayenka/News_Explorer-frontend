import React, { useContext, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import SearchForm from "../SearchForm/SearchForm";
import NewsCard from "../NewsCard/NewsCard";
import Api from "../../utils/api";
import NoResultsFound from "../../images/not-found_image.svg"

// CLAVE API: 016f14e7761d4baca1c75b200bde1015
function Main() {
  const currentUser = useContext(CurrentUserContext);
  const [error, setError] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const api = new Api({
    address: "https://newsapi.org",
    apiKey: "016f14e7761d4baca1c75b200bde1015", 
  });

  // Función que se ejecutará cuando se envíe el formulario de búsqueda
  const handleSearch = async (query) => {
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
        null, // Puedes agregar el token si es necesario
        `/everything?q=${query}&apiKey=${api.apiKey}&from=${from}&to=${to}&pageSize=100`,
        "GET"
      );

      // Actualizar los resultados de la búsqueda en el estado
      setSearchResults(response.articles);
      setError(''); // Limpiar el mensaje de error en caso de éxito
    } catch (error) {
      console.error("Error en la búsqueda de noticias:", error.message);
      setError('Hubo un error al obtener las noticias. Por favor, inténtelo de nuevo.');
    } finally {
      setIsLoading(false);
    }
    {isLoading && <p className="searchResults__lookingNews-mesage">Buscando noticias...</p>}
  };


  return (
    <main>
      <section className="main">
        <h1 className="main__title">¿Qué está pasando en el mundo?</h1>
        <h2 className="main__subtitle">Encuentra las últimas noticias sobre cualquier tema y guárdalas en tu cuenta personal.</h2>

        <SearchForm onSearch={handleSearch} />
      </section>

      <section className="main_cards">
        {/* Mostrar mensaje de carga o resultados de la búsqueda o mensaje de no resultados */}
        {isLoading ? (
          <p className="searchResults__lookingNews-mesage">Buscando noticias...</p>
        ) : searchResults.length > 0 ? (
          searchResults.map((article) => (
            <NewsCard
              key={article.url}
              title={article.title}
              description={article.description}
              urlToImage={article.urlToImage}
              // Otras propiedades según tus necesidades
            />
          ))
        ) : (
          <div className="NoResultsFound__container">
            <img className="NoResultsFound-image" src={NoResultsFound} alt="No Results Found" />
            <p className="NoResultsFound-mesageMain">No se encontró nada</p>
            <p className="NoResultsFound-mesage">Lo sentimos, pero no hay nada que coincida con tus términos de búsqueda.</p>
          </div>
        )}
      </section>

      {/* Mostrar mensaje de error */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </main>
  );
}

export default Main;
