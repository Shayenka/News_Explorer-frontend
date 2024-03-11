import React from "react";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import NewsCardList from "../NewsCardList/NewsCardList";
import useNewsContext from "../Hooks/useNewsContext";
import useUserContext from "../Hooks/useUserContext";

function SavedNews({ isSavedNewsClicked }) {
  const { isLoggedIn } = useUserContext();
  const { savedCards, allSearchQueries, handleDeleteCard } = useNewsContext();;
  const savedCardsCount = savedCards ? savedCards.length : 0;

  console.log("Cards in SavedNews:", savedCards);
  console.log("allSearchQueries in SavedNews:", allSearchQueries)
  

  if (isLoggedIn && isSavedNewsClicked) {
  return (
    // <>
    //   {isLoggedIn ? (
        <section>
          {/* <Header isLoggedIn={isLoggedIn} /> */}
          <SavedNewsHeader
            savedCards={savedCards}
            savedCardsCount={savedCardsCount}
            allSearchQueries={allSearchQueries}
          />
          <div className="saved-news__cards">
            {savedCards.length > 0 ? (
              // Mostrar tarjetas si hay alguna
              savedCards.map((card, index) => (
                <NewsCardList
                  key={index}
                  card={card}
                  onDelete={() => handleDeleteCard(index)}
                />
              ))
            ) : (
              // Mostrar mensaje si no hay tarjetas
              <p className="saved-news_NoCardsFound">No hay tarjetas guardadas.</p>
            )}
          </div>
      </section>
    );
  } else {
    // Renderizar algo diferente o nada si no cumple con las condiciones
    return null;
  }
}

export default SavedNews;

// import React from "react";
// import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
// import NewsCardList from "../NewsCardList/NewsCardList";
// import useNewsContext from "../Hooks/useNewsContext";

// function SavedNews({ isLoggedIn, isSavedNewsClicked }) {
//   const { savedCards, allSearchQueries, handleDeleteCard } = useNewsContext();;
//   const savedCardsCount = savedCards ? savedCards.length : 0;

//   console.log("Cards in SavedNews:", savedCards);
//   console.log("allSearchQueries in SavedNews:", allSearchQueries)
  

//   if (isLoggedIn && isSavedNewsClicked) {
//   return (
//     // <>
//     //   {isLoggedIn ? (
//         <section>
//           {/* <Header isLoggedIn={isLoggedIn} /> */}
//           <SavedNewsHeader
//             savedCards={savedCards}
//             savedCardsCount={savedCardsCount}
//             allSearchQueries={allSearchQueries}
//           />
//           <div className="saved-news__cards">
//             {savedCards.length > 0 ? (
//               // Mostrar tarjetas si hay alguna
//               savedCards.map((card, index) => (
//                 <NewsCardList
//                   key={index}
//                   card={card}
//                   onDelete={() => handleDeleteCard(index)}
//                 />
//               ))
//             ) : (
//               // Mostrar mensaje si no hay tarjetas
//               <p className="saved-news_NoCardsFound">No hay tarjetas guardadas.</p>
//             )}
//           </div>
//       </section>
//     );
//   } else {
//     // Renderizar algo diferente o nada si no cumple con las condiciones
//     return null;
//   }
// }

// export default SavedNews;
