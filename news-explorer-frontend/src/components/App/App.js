import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import Main from "../Main/Main";
import Header from "../Header/Header";
import Register from "../../Register";
import Login from "../../Login";
import SavedNews from "../SavedNews/SavedNews";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import Footer from "../Footer/Footer";

import { registerUserMock, checkTokenValidityMock } from "../../utils/auth";

function App() {
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);

  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [query, setQuery] = useState('');
  const [isSavedNewsClicked, setIsSavedNewsClicked] = useState(false);
 
  const navigate = useNavigate();

  function loadUserData() {
    const storedToken = localStorage.getItem("jwt");
    const storedEmail = localStorage.getItem("email");

    const storedUsers = JSON.parse(localStorage.getItem("registeredUsers"));

    const authorizedUser = storedUsers.find(
    (user) => user.email === storedEmail
  );

    if (storedToken) {
      checkTokenValidityMock( {token: storedToken, authorizedUser} )
        .then((userData) => {
          // Actualiza el estado solo si hay datos de usuario
          if (userData) {
            setToken(storedToken);
            setIsLoggedIn(true);
            console.log("currentUser in App in loadUserData:", currentUser);
            setCurrentUser(userData);
            navigate("/");
          } else {
            console.error(
              "No se encontró el usuario correspondiente al token."
            );
          }
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

  async function handleRegisterUser(email, password, name) {
    try {
      const response = await registerUserMock(email, password, name);
      return response;
    } catch (error) {
      console.error("Error in the registration process:", error);
      throw error;
    }
  }

  async function handleLoginUser({ token, authorizedUser }) {

    // Obtener la información del usuario usando el token
    try {
      const userData = await checkTokenValidityMock({ token, authorizedUser });

      localStorage.setItem("jwt", token);
      localStorage.setItem("email", userData.email);


      setCurrentUser(userData);
      setToken(token);
      setIsLoggedIn(true);
      
    } catch (error) {
      console.error("Error al obtener la información del usuario:", error);
      // Puedes manejar el error según tus necesidades
    }
  }

  function handleLogout() {
    console.log("Logging out...");
    localStorage.removeItem("jwt");
    setToken(null);
    setIsLoggedIn(false);
    setCurrentUser(null);
    setIsSavedNewsClicked(false);
    navigate("/signin");
  }

  return (
    // <div className="body">
      <CurrentUserContext.Provider value={{ user: currentUser }}>
        {/* <div className={`body ${isSavedNewsPage ? '' : 'app-container'}`}> */}
        {/* Contenedor para rutas principales */}
        <div className="app-container">
          <Header
            handleLoginPopUp={handleLoginPopUp}
            isLoggedIn={isLoggedIn}
            onLogout={handleLogout}
            isSavedNewsClicked={isSavedNewsClicked}
            onSavedNewsClick={() => setIsSavedNewsClicked(true)}
          />
          {/* <Main> */}
          <Routes>
              <Route
                path="/signin"
                element={
                  <Login
                    onLoggedIn={handleLoginUser}
                    loggedIn={isLoggedIn}
                    isOpen={isLoginPopupOpen}
                    onClose={closeAllPopups}
                    handleRegisterPopUp={handleRegisterPopUp}
                  />
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
                  handleLoginPopUp={handleLoginPopUp}
                />
              }
            />

          {isSavedNewsClicked && (
            <Route
              path="/saved-news"
              element={
                <div className="saved-news-container">
                  <ProtectedRoute
                    isLoggedIn={isLoggedIn}
                    component={SavedNews}
                    isSavedNewsClicked={isSavedNewsClicked}
                  />
                </div>
              }
            />
          )}   

            <Route path="/" element={<Main isLoggedIn={isLoggedIn} />} />
          </Routes>
          {/* </Main> */}
          <Footer />
        </div>
      </CurrentUserContext.Provider>
      );
    }

    export default App;