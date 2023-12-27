const BASE_URL = "http://127.0.0.1:3000";

// CLAVE API: 016f14e7761d4baca1c75b200bde1015
// export const registerUserMock = async (email, password, name) => {
//   return new Promise((resolve, reject) => {
//     const user = {
//       email, password, name
//     }
//     localStorage.setItem('dummyUser', JSON.stringify(user));
//     resolve(user);
//   })
// }

export const registerUserMock = async (email, password, name) => {
  return new Promise((resolve, reject) => {
    // Obtener usuarios registrados del localStorage
    const storedUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];

    // Verificar si el usuario ya está registrado por su dirección de correo electrónico
    const isUserRegistered = storedUsers.some(user => user.email === email);

    if (isUserRegistered) {
      // Usuario ya registrado
      resolve(null);
      console.log("El usuario ya está registrado");
    } else {
      // Usuario no registrado, proceder con el registro
      const user = { email, password, name };

      // Agregar nuevo usuario a la lista de usuarios registrados
      storedUsers.push(user);
      localStorage.setItem('registeredUsers', JSON.stringify(storedUsers));

      resolve(user);
      console.log("El usuario registrado", user);
    }
  });
};


 export const authorizeMock = async (email, password) => {
  return new Promise((resolve, reject) => {
    const storedUsers = JSON.parse(localStorage.getItem('registeredUsers'));
    console.log('storedUsers:', storedUsers);

    const authorizedUser = storedUsers.find(user => user.email === email && user.password === password);

    if (authorizedUser) {
      resolve({ token: 'token' });
    } else {
      console.log('Invalid credentials');
      reject(new Error("Not found"));
    }
  });
}


// const newUser = { email: 'nuevo@gmail.com', password: 'nuevacontraseña', name: 'Nuevo Usuario' };
// localStorage.setItem('dummyUser', JSON.stringify(newUser));


 export const checkTokenValidityMock = async (token) => {
  return new Promise((resolve, reject) => {
    const dummyUser = localStorage.getItem('dummyUser');
    resolve(JSON.parse(dummyUser));
  })
 }


 //  export const authorizeMock = async (email, password) => {
//   return new Promise((resolve, reject) => {
    
//     const dummyUser = JSON.parse(localStorage.getItem('dummyUser'));
//     if(dummyUser.email === email && dummyUser.password === password){
//       resolve({token: 'token'});
//       return;
//     }
//     reject(new Error("Not found"));
//   })
//  }




// export const registerUser = async (email, password, name) => {
//   try {
//     const response = await fetch(`${BASE_URL}/signup`, {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email, password, name }),
//     });

//     if (response.ok) {
//       const data = await response.json();
//       return data;
//     } else {
//       const errorData = await response.json();
//       console.error("Error during registration:", errorData);
//       throw new Error("Registration failed");
//     }
//   } catch (error) {
//     console.error("Error during registration:", error);
//     throw error;
//   }
// };

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

// export const checkTokenValidity = async (token) => {
//   const response = await fetch(`${BASE_URL}/users/me`, {
//     method: "GET",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   if (response.ok) {
//     const data = await response.json();
//     return data;
//   } else {
//     throw new Error("Token inválido");
//   }
// };