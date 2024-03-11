import React, { useContext } from "react";
import { Link } from "react-router-dom";
import useUserContext from "../Hooks/useUserContext";
import Logout from "../../images/logout.svg";
import LogoutBlack from "../../images/logout-black.svg";

function Header({
  handleLoginPopUp,
  onSavedNewsClick,
  handleSavedNewsClick,
  isSavedNewsClicked,
}) {
  const { user: currentUser, isLoggedIn, handleLogout } = useUserContext();
  // const { user: currentUser } = useUserContext();

  return (
    <header className="header">
      {isLoggedIn ? (
        <>
          <h2
            className={`header__text ${
              isSavedNewsClicked ? "header__text_SavedNews" : ""
            }`}
          >
            {" "}
            NewsExplorer{" "}
          </h2>
          {/* <h2 className="header__text_SavedNews"> NewsExplorer </h2> */}
          <div className={"header__container-texts_SavedNews"}>
            <Link
              to="/"
              className={`header__link_text ${
                isSavedNewsClicked ? "header__link_text_SavedNews" : ""
              }`}
              style={{ textDecoration: "none" }}
              onClick={() => {
                handleSavedNewsClick();
              }}
            >
              Inicio
            </Link>
            <div className="header__container_SavedNews">
              <Link
                to="/saved-news"
                className={`header__link_text ${
                  isSavedNewsClicked ? "header__link_text_SavedNews" : ""
                }`}
                style={{ textDecoration: "none" }}
                onClick={() => {
                  onSavedNewsClick();
                }}
              >
                Articulos guardados
              </Link>
              <Link
                to="/"
                className={`header__link_text-border ${
                  isSavedNewsClicked ? "header__link_text-border_SavedNews" : ""
                }`}
                style={{
                  textDecoration: "none",
                  padding: "1px 20px",
                  borderRadius: "30px",
                }}
                onClick={() => {
                  handleLogout();
                  handleSavedNewsClick();
                }}
              >
                {currentUser && currentUser.name && <>{currentUser.name}</>}
                <img
                  className="header__icon-logout"
                  src={isSavedNewsClicked ? LogoutBlack : Logout}
                  alt="Icono de logout"
                />
              </Link>
            </div>
          </div>
        </>
      ) : (
        <>
          <h2 className="header__text"> NewsExplorer </h2>
          <div className="header__container-texts">
            <Link
              to="/"
              className="header__link_text"
              style={{ textDecoration: "none" }}
            >
              Inicio
            </Link>
            <Link
              to="/signin"
              className="header__link_text-border"
              style={{
                textDecoration: "none",
                border: "1px solid white",
                padding: "1px 40px",
                borderRadius: "30px",
              }}
              onClick={() => {
                handleLoginPopUp();
              }}
            >
              Iniciar sesión
            </Link>
          </div>
        </>
      )}
    </header>
  );
}

export default Header;

// import React, { useContext } from "react";
// import { Link } from "react-router-dom";
// import useUserContext from "../Hooks/useUserContext";
// import Logout from "../../images/logout.svg";
// import LogoutBlack from "../../images/logout-black.svg";

// function Header({ handleLoginPopUp, isLoggedIn, onLogout, onSavedNewsClick, handleSavedNewsClick, isSavedNewsClicked  }) {
//   // const currentUser = useContext(CurrentUserContext);
//   const { user: currentUser } = useUserContext();

//   return (
//     <header className="header">
//       {isLoggedIn ? (
//         <>
//           <h2 className={`header__text ${isSavedNewsClicked ? 'header__text_SavedNews' : ''}`}> NewsExplorer </h2>
//           {/* <h2 className="header__text_SavedNews"> NewsExplorer </h2> */}
//           <div className={"header__container-texts"}>
//           <Link
//   to="/"
//   className={`header__link_text ${isSavedNewsClicked ? 'header__link_text_SavedNews' : ''}`}
//   style={{ textDecoration: "none" }}
//   onClick={() => {
//     handleSavedNewsClick();
//   }}
// >
//   Inicio
// </Link>
//             <div className="header__container_SavedNews">
//               <Link
//                 to="/saved-news"
//                 className={`header__link_text ${isSavedNewsClicked ? 'header__link_text_SavedNews' : ''}`}
//                 style={{ textDecoration: "none" }}
//                 onClick={() => {
//                   onSavedNewsClick();
//                 }}
//               >
//                 Articulos guardados
//               </Link>
//               <Link
//                 to="/"
//                 className={`header__link_text-border ${isSavedNewsClicked ? 'header__link_text-border_SavedNews' : ''}`}
//                 style={{
//                   textDecoration: "none",
//                   padding: "1px 20px",
//                   borderRadius: "30px",
//                 }}
//                 onClick={() => {
//                   onLogout();
//                   handleSavedNewsClick();
//                 }}
//               >
//                 {currentUser && currentUser.name && (
//                   <>
//                     {currentUser.name}
//                   </>
//                 )}
//                 <img
//                   className="header__icon-logout"
//                   src={isSavedNewsClicked ? LogoutBlack : Logout}
//                   alt="Icono de logout"
//                 />
//               </Link>
//             </div>
//           </div>
//         </>
//       ) : (
//         <>
//           <h2 className="header__text"> NewsExplorer </h2>
//           <div className="header__container-texts">
//             <Link
//               to="/"
//               className="header__link_text"
//               style={{ textDecoration: "none" }}
//             >
//               Inicio
//             </Link>
//             <Link
//               to="/signin"
//               className="header__link_text-border"
//               style={{
//                 textDecoration: "none",
//                 border: "1px solid white",
//                 padding: "1px 40px",
//                 borderRadius: "30px",
//               }}
//               onClick={() => {
//                 handleLoginPopUp();
//               }}
//             >
//               Iniciar sesión
//             </Link>
//           </div>
//         </>
//       )}
//     </header>
//   );
// }

// export default Header;
