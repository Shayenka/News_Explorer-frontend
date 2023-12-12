import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
// import ProtectedRoute from "";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import Main from "../Main/Main";
import Header from "../Header/Header";
import Register from "../../Register";
import Footer from "../Footer/Footer";
import Login from "../../Login";
import About from "../About/About";

import { registerUser, checkTokenValidity } from "../../utils/auth";

function App() {
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);

  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ email: "", password: "", name: "" });

  const navigate = useNavigate();

  function loadUserData() {
    const storedToken = localStorage.getItem("jwt");

    if (storedToken) {
      checkTokenValidity(storedToken)
        .then((userData) => {
          setToken(storedToken);
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
  }

  useEffect(() => {
    loadUserData();
  }, []);

  // useEffect(() => {
  //   if (token) {
  //     api
  //       .getUserInfo(token)
  //       .then((response) => {
  //         setCurrentUser(response.user);
  //       })
  //       .catch((error) => {
  //         console.log("Error al obtener los datos del usuario:", error);
  //       });
  //   }
  // }, [token]);


  function handleLoginPopUp() {
    setIsLoginPopupOpen(true);
  }

  function handleRegisterPopUp() {
    setIsRegisterPopupOpen(true);
  }

  function closeAllPopups() {
    setIsLoginPopupOpen(false);
    setIsRegisterPopupOpen(false);
    
  }

//   async function handleCardSalved(card) {
//     if (isLoggedIn) {
//       setIsSaved(true);
//       try {
//         const savedCard = await api.changeSalvedCardStatus(token, card._id, isSaved);
//         setCards((state) => state.map((c) => (c._id === card._id ? savedCard : c)));
//     } catch (error) {
//       console.error("Error saving card:", error.message);
//     }
//   }
// }

//   async function handleCardDelete(card) {
//     try {
//       await api.deleteCard(token, card._id);
  
//       setCards((Cards) =>
//         Cards.filter((item) => item._id !== card._id)
//       );
//     } catch (error) {
//       console.error("Error deleting card:", error.message);
//     }
//   }

  async function handleRegisterUser(email, password, name) {
    try {
      const response = await registerUser(email, password, name);
      return response;
    } catch (error) {
      console.error("Error en el registro de usuario:", error);
      throw error;
    }
  }

  function handleLoginUser(data) {
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

    return (
      <div className="body">
        <div className="page">
          <CurrentUserContext.Provider value={currentUser}>
             <Header handleLoginPopUp={handleLoginPopUp} loggedIn={isLoggedIn} onLogout={handleLogout} />
            <Routes>
              <Route
                path="/signin"
                element={
                  <Login onLoggedIn={handleLoginUser} loggedIn={isLoggedIn} isOpen={isLoginPopupOpen} onClose={closeAllPopups} handleRegisterPopUp={handleRegisterPopUp}/>
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
              <Route
               path="/"
               element={<Main
              />}
            />
            </Routes>
            <About />
            <Footer />
          </CurrentUserContext.Provider>
        </div>
      </div>
    );
  }

export default App;