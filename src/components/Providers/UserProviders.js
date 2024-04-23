import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { checkTokenValidity } from "../../utils/auth";

export default function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({});
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  function loadUserData() {
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
  }

  useEffect(() => {
    loadUserData();
  }, []);

  async function handleLoginUser(data) {
    try {
      const userData = await checkTokenValidity(data.token);
      setCurrentUser(userData);
      setToken(data.token);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Error al obtener la información del usuario:", error);
    }
  }

  function handleLogout() {
    console.log("Logging out...");
    localStorage.removeItem("jwt");
    setToken("");
    setIsLoggedIn(false);
    setCurrentUser({});
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
