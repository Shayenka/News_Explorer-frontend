import React, { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "./contexts/CurrentUserContext"
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ValidateEmail, ValidatePassword, ValidateName } from "./utils/validator";
import ModalWithForm from "./components/ModalWithForm/ModalWithForm.js"
import { PopUpSuccessfulRegister, PopUpFailedRegister, PopUpUserRegistered } from "./components/InfoTooltip/InfoTooltip";

function Register({ onRegister, loggedIn, isOpen, onClose,  handleLoginPopUp}) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
//   const [isFormValid, setIsFormValid] = useState(false);
  const [showPopupSuccessfulRegister, setShowPopupSuccessfulRegister] =
    useState(false);
  const [showPopupFailedRegister, setShowPopupFailedRegister] = useState(false);
  const [showPopUpUserRegistered, setShowPopUpUserRegistered] = useState(false);
  const [isRegisterPopupVisible, setRegisterPopupVisible] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setEmail(currentUser.email);
    setPassword(currentUser.password);
    setName(currentUser.name);
  }, [currentUser]);

  function handleEmailChange(evt) {
    const newEmail = evt.target.value;
    setEmail(newEmail);
    const error = ValidateEmail(newEmail);
    setEmailError(error);
    // updateFormValidity(newEmail, password, name);
  }

  function handlePasswordChange(evt) {
    const newPassword = evt.target.value;
    setPassword(newPassword);
    const error = ValidatePassword(newPassword);
    setPasswordError(error);
    // updateFormValidity(email, newPassword, name);
  }

  function handleNameChange(evt) {
    const newName = evt.target.value;
    setName(newName);
    
    const error = ValidateName(newName);
    setNameError(error);
    // updateFormValidity(email, password, newName);
  }

//   function updateFormValidity(email, password, name) {
//     // Verifica si ambos campos tienen contenido (para desactivar boton "iniciar sesión")
//     setIsFormValid(email.trim() !== "" && password.trim() !== "" && name.trim() !== "");
//   }

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (!email.trim() || !password.trim() || !name.trim()) {
      // Campos vacíos
      setShowPopupFailedRegister(true);
      setShowPopupSuccessfulRegister(false);
      setRegisterPopupVisible(false);
      return;
    }

    try {
      const userRegistered = await onRegister(email, password, name);
  
      if (!userRegistered) {
        // Usuario ya registrado
        setShowPopUpUserRegistered(true);
        setShowPopupFailedRegister(false);
        setShowPopupSuccessfulRegister(false);
        setRegisterPopupVisible(false);
        console.log("El usuario ya está registrado");
      } else {
        // Usuario registrado correctamente
        setShowPopupSuccessfulRegister(true);
        setShowPopupFailedRegister(false);
        setRegisterPopupVisible(false);
        setShowPopUpUserRegistered(false);
  
        setTimeout(() => {
          navigate("/signin");
        }, 2000);
      }
    } catch (error) {
      console.error("Error en el registo de usuario:", error);
      setShowPopupFailedRegister(true);
    }
  };

  // const handleRegisterPopupClose = () => {
  //   setRegisterPopupVisible(false);
  // };

  return (
    <>
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
    //   isFormValid={isFormValid} //Para activar o desactivar boton "iniciar sesión"
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
      </>
    );
  }
  

export default Register;  