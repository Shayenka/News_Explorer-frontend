import React, { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import SearchForm from "../SearchForm/SearchForm"; 
import NewsCard from "../NewsCard/NewsCard";

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  // Función que se ejecutará cuando se envíe el formulario de búsqueda
  const handleSearch = (query) => {
    console.log(`Usuario está buscando: ${query}`);
    // llamar a la API para obtener resultados de búsqueda.
  };

  return (
    <main>
      <section className="main">
        <h1 className="main__title">¿Qué está pasando en el mundo?</h1>
        <h2 className="main__subtitle">Encuentra las últimas noticias sobre cualquier tema y guárdalas en tu cuenta personal.</h2>

        <SearchForm onSearch={handleSearch} />
      </section>

      <section className="cards">
        {props.cards.map((card) => (
          <NewsCard
            card={card}
            key={card._id}
            // owner={card.owner}
            name={card.name}
            link={card.link}
            salves={card.salves}
            onCardSaved={props.onCardSaved}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
