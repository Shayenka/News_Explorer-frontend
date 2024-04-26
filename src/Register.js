import React, { useState, useEffect, useContext, useCallback } from "react";
import { CurrentUserContext } from "./contexts/CurrentUserContext";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ValidateEmail,
  ValidatePassword,
  ValidateName,
} from "./utils/validator";
import ModalWithForm from "./components/ModalWithForm/ModalWithForm.js";
import {
  PopUpSuccessfulRegister,
  PopUpFailedRegister,
  PopUpUserRegistered,
} from "./components/InfoTooltip/InfoTooltip";
import SearchBanner from "./components/SearchBanner/SearchBanner.js";
import About from "./components/About/About.js";
import useSearchContext from "./components/Hooks/useSearchContext.js";

function Register({ onRegister, isOpen, onClose, handleLoginPopUp, setIsRegisterPopupOpen }) {
  const { query, setQuery, handleSearch } = useSearchContext();
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [showPopupSuccessfulRegister, setShowPopupSuccessfulRegister] =
    useState(false);
  const [showPopupFailedRegister, setShowPopupFailedRegister] = useState(false);
  const [showPopUpUserRegistered, setShowPopUpUserRegistered] = useState(false);
  const [isRegisterPopupVisible, setRegisterPopupVisible] = useState(true);
  const [isRegisterButtonDisabled, setIsRegisterButtonDisabled] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsRegisterPopupOpen(true);
    setEmail(currentUser.email);
    setPassword(currentUser.password);
    setName(currentUser.name);
  }, [currentUser]);

  const handleEmailChange = useCallback((evt) => {
    const newEmail = evt.target.value;
    setEmail(newEmail);
    const error = ValidateEmail(newEmail);
    setEmailError(error);
    setIsRegisterButtonDisabled(error || !newEmail || !password || !name);
  }, [email, password, name]);

  const handlePasswordChange = useCallback((evt) => {
    const newPassword = evt.target.value;
    setPassword(newPassword);
    const error = ValidatePassword(newPassword);
    setPasswordError(error);
    setIsRegisterButtonDisabled(error || !email || !newPassword || !name);
  }, [email, password, name]);

  const handleNameChange = useCallback((evt) => {
    const newName = evt.target.value;
    setName(newName);
    const error = ValidateName(newName);
    setNameError(error);
    setIsRegisterButtonDisabled(error || !email || !password || !newName);
  }, [email, password, name]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      if (!email?.trim() || !password?.trim() || !name?.trim()) {
        setShowPopupFailedRegister(true);
        setShowPopupSuccessfulRegister(false);
        setShowPopUpUserRegistered(false);
        setIsRegisterButtonDisabled(true);
        return;
      }

      const userRegistered = await onRegister(email, password, name);

      if (!userRegistered) {
        setShowPopUpUserRegistered(true);
        setShowPopupFailedRegister(false);
        setShowPopupSuccessfulRegister(false);
        setIsRegisterButtonDisabled(true);
      } else {
        setShowPopupSuccessfulRegister(true);
        setShowPopupFailedRegister(false);
        setShowPopUpUserRegistered(false);

        setTimeout(() => {
          navigate("/signin");
        }, 2000);
      }
    } catch (error) {
      console.error("Error en el registro de usuario:", error);
      setShowPopupFailedRegister(true);
      setShowPopupSuccessfulRegister(false);
      setShowPopUpUserRegistered(false);
      setIsRegisterButtonDisabled(true);
    }
  };

  return (
    <main className="main">
      <SearchBanner
        handleSearch={handleSearch}
        setQuery={setQuery}
        query={query}
        isRegister={true}
      />
      {isOpen && (
        <ModalWithForm
          name="registerUser"
          title="Inscribirse"
          submitButtonText="Inscribirse"
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
          handleLoginPopUp={handleLoginPopUp}
          isLoginPopUp={false}
          isDisabled={isRegisterButtonDisabled}
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
            <h3 className="popup__subtitle-input"> Nombre de usuario</h3>
            <input
              type="text"
              id="name"
              placeholder="Introduce tu nombre de usuario"
              className="popup__text-input"
              required
              minLength="2"
              maxLength="20"
              value={name || ""}
              onChange={handleNameChange}
            />
            <span className="popup__input-error" id="name-error">
              {nameError}
            </span>
          </div>
        </ModalWithForm>
      )}

      {showPopupSuccessfulRegister && (
        <PopUpSuccessfulRegister
          isOpen={true}
          onClose={() => setShowPopupSuccessfulRegister(false)}
        />
      )}
      {showPopupFailedRegister && (
        <PopUpFailedRegister
          isOpen={true}
          onClose={() => setShowPopupFailedRegister(false)}
          onOpenRegister={() => setRegisterPopupVisible(true)}
        />
      )}
      {showPopUpUserRegistered && (
        <PopUpUserRegistered
          isOpen={true}
          onClose={() => setShowPopUpUserRegistered(false)}
          onOpenRegister={() => setRegisterPopupVisible(true)}
        />
      )}
      <About />
    </main>
  );
}

export default Register;
