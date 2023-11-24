export function ValidateEmail(email) {
    let emailError = "";
  
    if (!email) {
      emailError = "El correo electrónico es requerido";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      emailError = "Formato de correo inválido.";
    }
  
    return emailError;
  }
  
  export function ValidatePassword(password) {
    let passwordError = "";
  
    if (!password) {
      passwordError = "La contraseña es requerida";
    } else if (password.length < 6) {
      passwordError = "La contraseña debe contener 6 caracteres como mínimo";
    }
  
    return passwordError;
  }

  export function ValidateName(name) {
    let nameError = "";

    if (!name.trim()) {
        nameError = "El nombre de usuario es requerido";
      } else if (name.length < 2) {
        nameError = "El nombre debe contener 2 caracteres como mínimo";
      }
    
      return nameError;

  }

  