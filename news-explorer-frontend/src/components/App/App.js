import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import NewsProvider from "../Providers/NewsProviders";
import UserProvider from "../Providers/UserProviders";
import Main from "../Main/Main";
import Header from "../Header/Header";
import Register from "../../Register";
import Login from "../../Login";
import SavedNews from "../SavedNews/SavedNews";
import Footer from "../Footer/Footer";
import { registerUserMock } from "../../utils/auth";

function App() {
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
  const [isSavedNewsClicked, setIsSavedNewsClicked] = useState(false);

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

  function handleSavedNewsClick() {
    setIsSavedNewsClicked(false);
  }

  return (
    <NewsProvider>
      <UserProvider>
        <div
          className={`body ${
            isSavedNewsClicked ? "app-container_savedNews" : "app-container"
          }`}
        >
          <Header
            handleLoginPopUp={handleLoginPopUp}
            handleSavedNewsClick={handleSavedNewsClick}
            isSavedNewsClicked={isSavedNewsClicked}
            onSavedNewsClick={() => setIsSavedNewsClicked(true)}
          />
          <main>
            <Routes>
              <Route
                path="/signin"
                element={
                  <Login
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
                        component={SavedNews}
                        isSavedNewsClicked={isSavedNewsClicked}
                      />
                    </div>
                  }
                />
              )}

              <Route path="/" element={<Main />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </UserProvider>
    </NewsProvider>
  );
}

export default App;
