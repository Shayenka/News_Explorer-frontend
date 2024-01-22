import React, { useContext, useState, useEffect } from "react";
import savedCard from "../../images/iconGuardar.svg";
import savedCardClick from "../../images/iconGuardarClick.svg";
import savedCardChangeColor from "../../images/IconGuardarChangeBlue.svg";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { formatDate } from "../../utils/validator";

function NewsCard(props) {
  const currentUser = useContext(CurrentUserContext);
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const [isSaved , setIsSaved ] = useState(false);
  const [clickedOnce, setClickedOnce] = useState(false);
  const [savedCardSrc, setSavedCardSrc] = useState(savedCard);

  function handleSavedCard() {
    console.log("handleSavedCard called"); 
    if (props.isLoggedIn) {
      console.log("User is logged in");
      console.log(props.isLoggedIn)
      setIsSaved(true);
      props.onCardSaved(props.card);
      console.log("card guardada:", props.card)
    } else {
      console.log("User is not logged in");
      console.log("login:", props.isLoggedIn)
      setIsSaved(false); 
      console.log("setIsSaved:",isSaved);
      setShowLoginMessage(true);
      console.log("Popup showLoginMessage:", showLoginMessage);
      setClickedOnce(true);
    }
  }

  function handleclickCard() {
    if (!props.isLoggedIn && showLoginMessage && clickedOnce){
      setSavedCardSrc(savedCard);
      setShowLoginMessage(false);
    } else if (props.isLoggedIn && isSaved) {
      setSavedCardSrc(savedCard);
      props.onCardDelete(props.card);
      setIsSaved(false);
      console.log("card eliminada:", props.card);
    }
  }

  useEffect(() => {
    console.log("Component re-rendered");
    console.log("Updated isSaved:", isSaved);
  console.log("Updated showLoginMessage:", showLoginMessage);

    if (props.isLoggedIn && isSaved) {
      setSavedCardSrc(savedCardChangeColor);
    } else if (!props.isLoggedIn && showLoginMessage) {
      setSavedCardSrc(savedCardClick);
    } else {
      setSavedCardSrc(savedCard);
    }

    console.log("Final showLoginMessage:", showLoginMessage);
  }, [isSaved, showLoginMessage, props.isLoggedIn]);

  return (
    <div className="card">
      <div className="card__header">
      <div className="card__icon-container">
        <img
          className= "card__icon-saved"
          src={savedCardSrc}
          alt={`Icono para guardar tarjeta`}
          onClick={() => {
            handleSavedCard();
            handleclickCard();
          }}
        />
        </div>
        {!props.isLoggedIn && showLoginMessage && (
          <div className="card__login-message-container">
          <p className="card__login-message">Inicia sesión para guardar artículos</p>
          </div>
        )}
      </div>
      <img
        className="card__image"
        src={props.urlToImage}
        alt={props.title}
        style={{ backgroundImage: `url(${props.urlToImage})` }}
      />
      <div className="card__footer-image">
        <h4 className="card__date">{formatDate(props.publishedAt)}</h4>
        <h3 className="card__title">{props.title}</h3>
        <p className="card__description">{props.description}</p>
        <p className="card__source">{props.sourceName}</p>
      </div>
    </div>
  );
}

export default NewsCard;







// import React, { useContext, useState, useEffect } from "react";
// import savedCard from "../../images/iconGuardar.svg";
// import savedCardClick from "../../images/iconGuardarClick.svg";
// import savedCardChangeColor from "../../images/IconGuardarChangeBlue.svg";
// import { CurrentUserContext } from "../../contexts/CurrentUserContext";
// import { formatDate } from "../../utils/validator";

// function NewsCard(props) {
//   const currentUser = useContext(CurrentUserContext);
//   const [showLoginMessage, setShowLoginMessage] = useState(false);
//   const [isSaved , setIsSaved ] = useState(false);
//   const [savedCardSrc, setSavedCardSrc] = useState(savedCard);

//   function handleSavedCard() {
//     console.log("handleSavedCard called"); 
//     if (props.isLoggedIn) {
//       console.log("User is logged in");
//       console.log(props.isLoggedIn)
//       // setIsSaved(true);
//       setIsSaved((prevIsSaved) => !prevIsSaved);
//       props.onCardSaved(props.card);
//       console.log(props.card)
//     } else {
//       console.log("User is not logged in");
//       console.log("login:", props.isLoggedIn)
//       setIsSaved(false); 
//       console.log("setIsSaved:",isSaved);
//       // setSavedCardSrc(savedCardClick); // Cambiamos la imagen directamente aquí
//       setShowLoginMessage(true);
//       console.log("Popup showLoginMessage:", showLoginMessage);
//     }
//   }

//   console.log("linea34:", showLoginMessage);

//   // function hideLoginMessage() {
//   //   setShowLoginMessage(false);
//   // }

//   // function handleIconSavedCardSrc() {
//   //   if (props.isLoggedIn && isSaved) {
//   //     setSavedCardSrc(savedCardChangeColor);
//   //   } else if (!props.isLoggedIn && showLoginMessage) {
//   //     setSavedCardSrc(savedCardClick);
//   //   }
//   // }

//   useEffect(() => {
//     console.log("Component re-rendered");
//     console.log("Updated isSaved:", isSaved);
//   console.log("Updated showLoginMessage:", showLoginMessage);

//     if (props.isLoggedIn && isSaved) {
//       setSavedCardSrc(savedCardChangeColor);
//     } else if (!props.isLoggedIn && showLoginMessage) {
//       setSavedCardSrc(savedCardClick);
//     } else {
//       setSavedCardSrc(savedCard);
//     }

//     console.log("Final showLoginMessage:", showLoginMessage);
//   }, [isSaved, showLoginMessage, props.isLoggedIn]);

//   return (
//     <div className="card">
//       <div className="card__header">
//       <div className="card__icon-container">
//         <img
//           className= "card__icon-saved"
//           src={savedCardSrc}
//           alt={`Icono para guardar tarjeta`}
//           onClick={() => {
//             // handleIconSavedCardSrc();
//             handleSavedCard();
//             // hideLoginMessage();
//           }}
//         />
//         </div>
//         {!props.isLoggedIn && showLoginMessage && (
//           <div className="card__login-message-container">
//           <p className="card__login-message">Inicia sesión para guardar artículos</p>
//           </div>
//         )}
//       </div>
//       <img
//         className="card__image"
//         src={props.urlToImage}
//         alt={props.title}
//         style={{ backgroundImage: `url(${props.urlToImage})` }}
//       />
//       <div className="card__footer-image">
//         <h4 className="card__date">{formatDate(props.publishedAt)}</h4>
//         <h3 className="card__title">{props.title}</h3>
//         <p className="card__description">{props.description}</p>
//         <p className="card__source">{props.sourceName}</p>
//       </div>
//     </div>
//   );
// }

// export default NewsCard;