import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import NewsProvider from "../Providers/NewsProviders";
import SearchProvider from "../Providers/SearchProviders";
import UserProvider from "../Providers/UserProviders";
import Main from "../Main/Main";
import Header from "../Header/Header";
import Register from "../../Register";
import Login from "../../Login";
import SavedNews from "../SavedNews/SavedNews";
import Footer from "../Footer/Footer";
import { registerUser } from "../../utils/auth";
import PublicOnlyRoute from "../PublicRoute"; 

function App() {
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
  const [isSavedNewsClicked, setIsSavedNewsClicked] = useState(false);

  const location = useLocation();

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
      const response = await registerUser(email, password, name);
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
      <SearchProvider>
      <UserProvider>
        <div
          className={`body ${
            location.pathname === "/saved-news" ? "app-container_savedNews" : "app-container"
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
                  <PublicOnlyRoute
                  isSavedNewsClicked={isSavedNewsClicked}
                  >
                  <Login
                    isOpen={isLoginPopupOpen}
                    onClose={closeAllPopups}
                    handleRegisterPopUp={handleRegisterPopUp}
                    setIsLoginPopupOpen={setIsLoginPopupOpen}
                  />
                  </PublicOnlyRoute>
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
              {/* {isSavedNewsClicked && ( */}
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
              {/* )} */}

              <Route path="/" element={<Main />} />
            </Routes>
          </main>
          <Footer 
          isSavedNewsClicked={isSavedNewsClicked}
          handleSavedNewsClick={handleSavedNewsClick}
          />
        </div>
      </UserProvider>
      </SearchProvider>
    </NewsProvider>
  );
}

export default App;
