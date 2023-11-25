import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ValidateEmail, ValidatePassword } from "./utils/validator";
import { authorize } from "./utils/auth";
import ModalWithForm from "./components/ModalWithForm/ModalWithForm.js"
import { PopUpFailedLogin } from "./components/InfoTooltip/InfoTooltip"

function Login({ onLoggedIn, loggedIn, isOpen, onClose, handleRegisterPopUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [showPopupFailedLogin, setShowPopupFailedLogin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  function handleEmailChange(evt) {
    const newEmail = evt.target.value;
    setEmail(newEmail);
    const error = ValidateEmail(newEmail);
    setEmailError(error);
    updateFormValidity(newEmail, password);
  }

  function handlePasswordChange(evt) {
    const newPassword = evt.target.value;
    setPassword(newPassword);
    const error = ValidatePassword(newPassword);
    setPasswordError(error);
    updateFormValidity(email, newPassword);
  }

  function updateFormValidity(email, password) {
    // Verifica si ambos campos tienen contenido (para desactivar boton "iniciar sesión")
    setIsFormValid(email.trim() !== "" && password.trim() !== "");
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!email || !password) {
        setShowPopupFailedLogin(true)
        setTimeout(() => {
            navigate("/signin");
          },2000)
      return;
    }
    authorize(email, password)
      .then((data) => {
        if (data.token) {
          onLoggedIn(data);
          navigate("/");
          setShowPopupFailedLogin(false)
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <ModalWithForm
      name="loginUser"
      title="Iniciar sesión"
      submitButtonText="Iniciar sesión"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isFormValid} //Para activar o desactivar boton "iniciar sesión"
      handleRegisterPopUp={handleRegisterPopUp}
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
      {showPopupFailedLogin && (
        <PopUpFailedLogin 
          isOpen={true}
          onClose={() => setShowPopupFailedLogin(false)}
        />
      )} 
    </ModalWithForm>
  );
}

export default Login;