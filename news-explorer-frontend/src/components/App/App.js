import "./App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
// import ProtectedRoute from "../components/ProtectedRoute";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import Main from "../Main/Main";
import Header from "../Header/Header";
import Register from "../../Register";
import Footer from "../Footer/Footer";
import Login from "../../Login";

// import Api from "../utils/api.js";
import { registerUser, checkTokenValidity } from "../../utils/auth";

function App() {
//   const [isLoginProfilePopupOpen, setIsLoginProfilePopupOpen] = useState(false);
//   const [isRegisterProfilePopupOpen, setIsRegisterProfilePopupOpen] =
//     useState(false);

//   // const [cards, setCards] = useState([]);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);

  const [token, setToken] = useState(null);

//   const api = new Api({
//     address: "http://127.0.0.1:3000",
//   });

  const [currentUser, setCurrentUser] = useState({ email: null });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (token) {
      checkTokenValidity(token)
        .then((userData) => {
          setToken(token);
          setIsLoggedIn(true);
          setCurrentUser(userData);
          navigate("/");
        })
        .catch((error) => {
          console.error("Error de token:", error);
        });
    } else {
      setIsLoggedIn(false);
    }
  }, []);

//   useEffect(() => {
//     if (token) {
//       api
//         .getUserInfo(token)
//         .then((response) => {
//           setCurrentUser(response.user);
//         })
//         .catch((error) => {
//           console.log("Error al obtener los datos del usuario:", error);
//         });
//     }
//   }, [token]);

  function handleloginUser() {
    setIsLoginPopupOpen(true);
  }

  function handlelRegisterUser() {
    setIsRegisterPopupOpen(true);
  }

  async function handleRegisterUser(email, password, name) {
    try {
      const response = await registerUser(email, password, name);
      return response;
    } catch (error) {
      console.error("Error en el registro de usuario:", error);
      throw error;
    }
  }

  function handleLogin(data) {
    localStorage.setItem("jwt", data.token);
    setToken(data.token);
    setIsLoggedIn(true);
  }

  function handleLogout() {
    console.log("Logging out...");
    localStorage.removeItem("jwt");
    setToken(null);
    setIsLoggedIn(false);
    navigate("/signin");
  }

//   function handleCardAdd(card) {
//     //     const isLiked = card.likes.some((owner) => owner === currentUser._id);

//     //     api.changeLikeCardStatus(token, card._id, !isLiked).then((newCard) => {
//     //       setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
//     //     });
//     //   }

//     function handleCardDelete(card) {
//       api.deleteCard(token, card._id).then(() => {
//         setCards(
//           cards.filter((item) => {
//             return item._id !== card._id;
//           })
//         );
//       });
//     }
function closeAllPopups() {
    setIsLoginPopupOpen(false);
    setIsRegisterPopupOpen(false);
    
  }


    return (
      <div className="body">
        <div className="page">
          <CurrentUserContext.Provider value={currentUser}>
             <Header handleLoginPopUp={handleloginUser} loggedIn={isLoggedIn} onLogout={handleLogout} />
            <Routes>
              <Route
                path="/signin"
                element={
                  <Login onLoggedIn={handleLogin} loggedIn={isLoggedIn} isOpen={isLoginPopupOpen} onClose={closeAllPopups} handleRegisterPopUp={handlelRegisterUser}/>
                }
              />
              <Route
                path="/signup"
                element={
                  <Register
                    onRegister={handleRegisterUser}
                    loggedIn={isLoggedIn}
                    isOpen={isRegisterPopupOpen}
                    onClose={closeAllPopups}
                  />
                }
              />
              <Route path="/" element={<Main />} />
            </Routes>

            <Footer />
          </CurrentUserContext.Provider>
        </div>
      </div>
    );
  }

export default App;
