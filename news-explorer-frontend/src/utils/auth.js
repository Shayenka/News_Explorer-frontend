const BASE_URL = "http://127.0.0.1:3000";


// export const registerUser = async (email, password, name) => {
//     return fetch(`${BASE_URL}/signup`, {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email, password, name }),
//     })
//       .then((response) => {
//         if (response.status === 201) {
//           return response.json();
//         }
//       })
//       .then((res) => {
//         return res;
//       });
//   };

export const registerUser = async (email, password, name) => {
    console.log("Start registration process");
  
    // Simulate a server request (using setTimeout to simulate a delay)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("Simulating server response...");
  
        // Check if the email is already registered (simulation)
        const isEmailTaken = localStorage.getItem(email);
        if (isEmailTaken) {
          console.log("Email already registered. Registration failed.");
          reject("El correo electrónico ya está registrado.");
        } else {
          // Store user information in local storage
          localStorage.setItem(email, JSON.stringify({ email, password, name }));
          console.log("Registration successful.");
          resolve({ message: "Registro exitoso." });
        }
      }, 1000); // Simulate a delay of 1 second
    });
  };

// export const authorize = async (email, password) => {
//   try {
//     const response = await fetch(`${BASE_URL}/signin`, {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email, password}),
//     });

//     if (response.ok) {
//       const data = await response.json();
//       if (data && data.token) {
//         localStorage.setItem("jwt", data.token);
//         return data;
//       } else {
//         console.error("La respuesta del servidor no contiene un token válido.");
//       }
//     } else {
//       console.error("Error en la respuesta del servidor:", response.status);
//     }
//   } catch (err) {
//     console.error("Error en la solicitud:", err);
//   }
// };

export const authorize = async (email, password) => {
    // Simular una solicitud al servidor (usando setTimeout para simular una demora)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Obtener la información del usuario del almacenamiento local
        const userDataString = localStorage.getItem(email);
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          // Verificar la contraseña (simulación)
          if (userData.password === password) {
            resolve({ token: "fakeToken", user: userData });
          } else {
            reject("Contraseña incorrecta.");
          }
        } else {
          reject("Usuario no encontrado.");
        }
      }, 1000); // Simular una demora de 1 segundo
    });
  };

export const checkTokenValidity = async (token) => {
  const response = await fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error("Token inválido");
  }
};