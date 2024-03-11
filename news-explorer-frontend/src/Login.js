import React, { useContext, useState } from "react";
import { CurrentUserContext } from "./contexts/CurrentUserContext.js";//VERIFICAR
import useUserContext from "./components/Hooks/useUserContext.js";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ValidateEmail, ValidatePassword } from "./utils/validator";
import { authorizeMock } from "./utils/auth";
import ModalWithForm from "./components/ModalWithForm/ModalWithForm.js";
import {
  PopUpFailedInput,
  PopUpFailedLogin,
} from "./components/InfoTooltip/InfoTooltip";
import SearchBanner from "./components/SearchBanner/SearchBanner.js";
import About from "./components/About/About.js";


function Login({ loggedIn, isOpen, onClose, handleRegisterPopUp }) {
  const { handleLoginUser } = useUserContext();
  const { handleSearch, setQuery, query } = useContext(CurrentUserContext); //VERIFICAR
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  // const [isFormValid, setIsFormValid] = useState(false);  //
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
    // updateFormValidity(newEmail, password);
  }

  function handlePasswordChange(evt) {
    const newPassword = evt.target.value;
    setPassword(newPassword);
    const error = ValidatePassword(newPassword);
    setPasswordError(error);
    // updateFormValidity(email, newPassword);
  }

  // function updateFormValidity(email, password) {
  //   // Verifica si ambos campos tienen contenido (para desactivar boton "iniciar sesión")
  //   setIsFormValid(email.trim() !== "" && password.trim() !== "");
  // }

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
        console.log(data); // token + authorizedUser
        if (data.token) {
          handleLoginUser(data); // {token, authorizedUser}
          navigate("/");
        } else {
          // Usuario no registrado
          setShowPopupFailedLogin(true);
          setLoginPopupVisible(false);
          setTimeout(() => {
            navigate("/signup");
          }, 2000);
        }
      })
      .catch((err) => {
        // Error en la autenticación
        setLoginPopupVisible(false);
        setShowPopupFailedLogin(true);
        console.log(err);
      });
  }

  return (
    <main className="main">
      <SearchBanner handleSearch={handleSearch} setQuery={setQuery} query={query} />
      {isLoginPopupVisible && (
        <ModalWithForm
          name="loginUser"
          title="Iniciar sesión"
          submitButtonText="Iniciar sesión"
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
          // isFormValid={isFormValid} //Para activar o desactivar boton "iniciar sesión"
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
    <About/>
    </main>
  );
}

export default Login;

// import React, { useContext, useState } from "react";
// import { CurrentUserContext } from "./contexts/CurrentUserContext.js"
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { ValidateEmail, ValidatePassword } from "./utils/validator";
// import { authorizeMock } from "./utils/auth";
// import ModalWithForm from "./components/ModalWithForm/ModalWithForm.js";
// import {
//   PopUpFailedInputLogin,
//   PopUpFailedLogin,
// } from "./components/InfoTooltip/InfoTooltip";
// import SearchBanner from "./components/SearchBanner/SearchBanner.js";
// import About from "./components/About/About.js";


// function Login({ onLoggedIn, isOpen, onClose, handleRegisterPopUp }) {
//   const { handleSearch, setQuery, query } = useContext(CurrentUserContext);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   // const [isFormValid, setIsFormValid] = useState(false);
//   const [showPopupFailedInputLogin, setShowPopupFailedInputLogin] =
//     useState(false);
//   const [showPopupFailedLogin, setShowPopupFailedLogin] = useState(false);
//   const [isLoginPopupVisible, setLoginPopupVisible] = useState(true);
//   const navigate = useNavigate();
//   const location = useLocation();

//   function handleEmailChange(evt) {
//     const newEmail = evt.target.value;
//     setEmail(newEmail);
//     const error = ValidateEmail(newEmail);
//     setEmailError(error);
//     // updateFormValidity(newEmail, password);
//   }

//   function handlePasswordChange(evt) {
//     const newPassword = evt.target.value;
//     setPassword(newPassword);
//     const error = ValidatePassword(newPassword);
//     setPasswordError(error);
//     // updateFormValidity(email, newPassword);
//   }

//   // function updateFormValidity(email, password) {
//   //   // Verifica si ambos campos tienen contenido (para desactivar boton "iniciar sesión")
//   //   setIsFormValid(email.trim() !== "" && password.trim() !== "");
//   // }

//   function handleSubmit(evt) {
//     evt.preventDefault();
//     if (!email || !password) {
//       setShowPopupFailedInputLogin(true);
//       console.log(
//         () => showPopupFailedInputLogin,
//         "prueba setShowPopupFailedInputLogin"
//       );
//       setLoginPopupVisible(false);
//       setTimeout(() => {
//         navigate("/signin");
//       }, 2000);
//       return;
//     }
//     authorizeMock(email, password)
//       .then((data) => {
//         console.log(data); // token + authorizedUser
//         if (data.token) {
//           onLoggedIn(data); // {token, authorizedUser}
//           navigate("/");
//         } else {
//           // Usuario no registrado
//           setShowPopupFailedLogin(true);
//           setLoginPopupVisible(false);
//           setTimeout(() => {
//             navigate("/signup");
//           }, 2000);
//         }
//       })
//       .catch((err) => {
//         // Error en la autenticación
//         setLoginPopupVisible(false);
//         setShowPopupFailedLogin(true);
//         console.log(err);
//       });
//   }

//   return (
//     <main className="main">
//       <SearchBanner handleSearch={handleSearch} setQuery={setQuery} query={query} />
//       {isLoginPopupVisible && (
//         <ModalWithForm
//           name="loginUser"
//           title="Iniciar sesión"
//           submitButtonText="Iniciar sesión"
//           isOpen={isOpen}
//           onClose={onClose}
//           onSubmit={handleSubmit}
//           // isFormValid={isFormValid} //Para activar o desactivar boton "iniciar sesión"
//           handleRegisterPopUp={handleRegisterPopUp}
//           isLoginPopUp={true}
//         >
//           <div>
//             <h3 className="popup__subtitle-input">Correo eléctronico</h3>
//             <input
//               type="text"
//               id="email"
//               placeholder="Introduce tu correo eléctronico"
//               className="popup__text-input"
//               required
//               minLength="2"
//               maxLength="20"
//               value={email || ""}
//               onChange={handleEmailChange}
//             />
//             <span className="popup__input-error" id="email-error">
//               {emailError}
//             </span>
//             <h3 className="popup__subtitle-input">Contraseña</h3>
//             <input
//               type="password"
//               id="password"
//               placeholder="Introduce tu contraseña"
//               className="popup__text-input"
//               required
//               minLength="2"
//               maxLength="20"
//               value={password || ""}
//               onChange={handlePasswordChange}
//             />
//             <span className="popup__input-error" id="password-error">
//               {passwordError}
//             </span>
//           </div>
//         </ModalWithForm>
//       )}
//       {showPopupFailedInputLogin && (
//         <PopUpFailedInputLogin
//           isOpen={true}
//           onClose={() => setShowPopupFailedInputLogin(false)}
//           onOpenLogin={() => setLoginPopupVisible(true)}
//         />
//       )}

//       {showPopupFailedLogin && (
//         <PopUpFailedLogin
//           isOpen={true}
//           onClose={() => setShowPopupFailedLogin(false)}
//           onOpenLogin={() => setLoginPopupVisible(true)}
//         />
//       )}
//     <About/>
//     </main>
//   );
// }

// export default Login;