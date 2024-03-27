import React, { useState } from "react";
import useUserContext from "./components/Hooks/useUserContext.js";
import { useNavigate, useLocation } from "react-router-dom";
import { ValidateEmail, ValidatePassword } from "./utils/validator";
import { authorizeMock } from "./utils/auth";
import ModalWithForm from "./components/ModalWithForm/ModalWithForm.js";
import {
  PopUpFailedInput,
  PopUpFailedLogin,
} from "./components/InfoTooltip/InfoTooltip";
import SearchBanner from "./components/SearchBanner/SearchBanner.js";
import About from "./components/About/About.js";
import useSearchContext from "./components/Hooks/useSearchContext.js";

function Login({ isOpen, onClose, handleRegisterPopUp }) {
  const { handleLoginUser } = useUserContext();
  const { query, setQuery, handleSearch } = useSearchContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPopupFailedInputLogin, setShowPopupFailedInputLogin] =
    useState(false);
  const [showPopupFailedLogin, setShowPopupFailedLogin] = useState(false);
  const [isLoginPopupVisible, setLoginPopupVisible] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  function handleEmailChange(evt) {
    const newEmail = evt.target.value;
    setEmail(newEmail);
    const error = ValidateEmail(newEmail);
    setEmailError(error);
  }

  function handlePasswordChange(evt) {
    const newPassword = evt.target.value;
    setPassword(newPassword);
    const error = ValidatePassword(newPassword);
    setPasswordError(error);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!email || !password) {
      setShowPopupFailedInputLogin(true);
      console.log(
        () => showPopupFailedInputLogin,
        "prueba setShowPopupFailedInputLogin"
      );
      setLoginPopupVisible(false);
      setTimeout(() => {
        navigate("/signin");
      }, 2000);
      return;
    }
    authorizeMock(email, password)
      .then((data) => {
        console.log(data);
        if (data.token) {
          handleLoginUser(data);
          navigate("/");
        } else {
          setShowPopupFailedLogin(true);
          setLoginPopupVisible(false);
          setTimeout(() => {
            navigate("/signup");
          }, 2000);
        }
      })
      .catch((err) => {
        setLoginPopupVisible(false);
        setShowPopupFailedLogin(true);
        console.log(err);
      });
  }

  return (
    <>
      <SearchBanner
        handleSearch={handleSearch}
        setQuery={setQuery}
        query={query}
        isLogin={true}
      />
      {isLoginPopupVisible && (
        <ModalWithForm
          name="loginUser"
          title="Iniciar sesión"
          submitButtonText="Iniciar sesión"
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
          handleRegisterPopUp={handleRegisterPopUp}
          isLoginPopUp={true}
        >
          <div>
            <h3 className="popup__subtitle-input">Correo eléctronico</h3>
            <input
              type="text"
              id="email"
              placeholder="Introduce tu correo eléctronico"
              className="popup__text-input"
              required
              minLength="2"
              maxLength="20"
              value={email || ""}
              onChange={handleEmailChange}
            />
            <span className="popup__input-error" id="email-error">
              {emailError}
            </span>
            <h3 className="popup__subtitle-input">Contraseña</h3>
            <input
              type="password"
              id="password"
              placeholder="Introduce tu contraseña"
              className="popup__text-input"
              required
              minLength="2"
              maxLength="20"
              value={password || ""}
              onChange={handlePasswordChange}
            />
            <span className="popup__input-error" id="password-error">
              {passwordError}
            </span>
          </div>
        </ModalWithForm>
      )}
      {showPopupFailedInputLogin && (
        <PopUpFailedInput
          isOpen={true}
          onClose={() => setShowPopupFailedInputLogin(false)}
          onOpenLogin={() => setLoginPopupVisible(true)}
        />
      )}

      {showPopupFailedLogin && (
        <PopUpFailedLogin
          isOpen={true}
          onClose={() => setShowPopupFailedLogin(false)}
          onOpenLogin={() => setLoginPopupVisible(true)}
        />
      )}
      <About />
    </>
  );
}

export default Login;
