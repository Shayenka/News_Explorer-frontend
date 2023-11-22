import React, { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import SearchForm from "../SearchForm/SearchForm"; // Asegúrate de proporcionar la ruta correcta

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

        {/* Agrega el componente SearchForm */}
        <SearchForm onSearch={handleSearch} />
      </section>
    </main>
  );
}

export default Main;


      {/* <section className="elements">
        {props.cards.map((card) => (
          <Card
            card={card}
            key={card._id}
            owner={card.owner}
            name={card.name}
            link={card.link}
            onCardAdd={props.onCardAdd}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </section> */}
//     </main>
//   );
// }

// export default Main;