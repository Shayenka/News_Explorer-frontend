import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import Main from "../Main/Main";
import Header from "../Header/Header";
import Register from "../../Register";
import Footer from "../Footer/Footer";
import Login from "../../Login";
import About from "../About/About";
import SavedNews from "../SavedNews/SavedNews";

import { registerUserMock, checkTokenValidityMock } from "../../utils/auth";

function App() {
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);

  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  // const [currentUser, setCurrentUser] = useState({
  //   email: "",
  //   password: "",
  //   name: "",
  // });

  const navigate = useNavigate();

  function loadUserData() {
    const storedToken = localStorage.getItem("jwt");

    if (storedToken) {
      checkTokenValidityMock(storedToken)
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
      console.log("Before registerUserMock");
      const response = await registerUserMock(email, password, name);
      console.log("Registration successful. Response:", response);
      return response;
    } catch (error) {
      console.error("Error in the registration process:", error);
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
      <CurrentUserContext.Provider value={currentUser}>
        {/* Contenedor para rutas principales */}
        <div className="app-container">
          <Header
            handleLoginPopUp={handleLoginPopUp}
            isLoggedIn={isLoggedIn}
            onLogout={handleLogout}
          />
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
            <Route path="/" element={<Main isLoggedIn={isLoggedIn} />} />
          </Routes>
        </div>
  
        {/* Contenedor para la ruta especial */}
        <Routes>
          <Route
            path="/saved-news"
            element={
              <div className="saved-news-container">
                <ProtectedRoute loggedIn={isLoggedIn} component={SavedNews} />
              </div>
            }
          />
        </Routes>
  
        <About />
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
