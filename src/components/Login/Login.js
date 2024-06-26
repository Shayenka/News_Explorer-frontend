import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUserContext from "../Hooks/useUserContext.js";
import { ValidateEmail, ValidatePassword } from "../../utils/validator.js";
import { authorize } from "../../utils/auth.js";
import ModalWithForm from "../ModalWithForm/ModalWithForm.js";
import {
  PopUpFailedInput,
  PopUpFailedLogin,
} from "../InfoTooltip/InfoTooltip.js";
import SearchBanner from "../SearchBanner/SearchBanner.js";
import About from "../About/About.js";
import useSearchContext from "../Hooks/useSearchContext.js";

function Login({ isOpen, onClose, handleRegisterPopUp, setIsLoginPopupOpen }) {
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
  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoginPopupOpen(true);
  }, []);

  const handleEmailChange = useCallback(
    (evt) => {
      const newEmail = evt.target.value;
      setEmail(newEmail);
      const error = ValidateEmail(newEmail);
      setEmailError(error);
      setIsLoginButtonDisabled(error || !newEmail || !password);
    },
    [email, password]
  );

  const handlePasswordChange = useCallback(
    (evt) => {
      const newPassword = evt.target.value;
      setPassword(newPassword);
      const error = ValidatePassword(newPassword);
      setPasswordError(error);
      setIsLoginButtonDisabled(error || !email || !newPassword);
    },
    [email, password]
  );

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      if (!email?.trim() || !password?.trim()) {
        setShowPopupFailedInputLogin(true);
        setIsLoginButtonDisabled(true);
        setLoginPopupVisible(false);
        setTimeout(() => {
          navigate("/signin");
        }, 2000);
        return;
      }
      authorize(email, password)
        .then((data) => {
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
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
    }
  };

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
          isDisabled={isLoginButtonDisabled}
        >
          <div>
            <h3 className="popup__subtitle-input">Correo eléctronico</h3>
            <input
              type="email"
              id="email"
              placeholder="Introduce tu correo eléctronico"
              className="popup__text-input"
              required
              minLength="2"
              maxLength="50"
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
              maxLength="50"
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
