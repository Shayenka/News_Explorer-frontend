import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { checkTokenValidityMock } from "../../utils/auth";

export default function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  function loadUserData() {
    const storedToken = localStorage.getItem("jwt");
    const storedEmail = localStorage.getItem("email");
    const storedUsers = JSON.parse(localStorage.getItem("registeredUsers"));

    if (storedUsers) {
      const authorizedUser = storedUsers.find(
        (user) => user.email === storedEmail
      );

      if (storedToken) {
        checkTokenValidityMock({ token: storedToken, authorizedUser })
          .then((userData) => {
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
  }

  useEffect(() => {
    loadUserData();
  }, []);

  async function handleLoginUser({ token, authorizedUser }) {
    try {
      const userData = await checkTokenValidityMock({ token, authorizedUser });

      localStorage.setItem("jwt", token);
      localStorage.setItem("email", userData.email);

      setCurrentUser(userData);
      setToken(token);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Error al obtener la información del usuario:", error);
    }
  }

  function handleLogout() {
    console.log("Logging out...");
    localStorage.removeItem("jwt");
    setToken(null);
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/signin");
  }

  return (
    <CurrentUserContext.Provider
      value={{
        user: currentUser,
        isLoggedIn,
        loadUserData,
        handleLoginUser,
        handleLogout,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
}
