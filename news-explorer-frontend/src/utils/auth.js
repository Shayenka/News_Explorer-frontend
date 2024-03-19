const BASE_URL = "http://127.0.0.1:3000";

export const registerUserMock = async (email, password, name) => {
  return new Promise((resolve, reject) => {
    const storedUsers =
      JSON.parse(localStorage.getItem("registeredUsers")) || [];

    const isUserRegistered = storedUsers.some((user) => user.email === email);

    if (isUserRegistered) {
      resolve(null);
    } else {
      const user = { email, password, name, token: "token" };

      storedUsers.push(user);
      localStorage.setItem("registeredUsers", JSON.stringify(storedUsers));

      resolve(user);
    }
  });
};

export const authorizeMock = async (email, password) => {
  return new Promise((resolve, reject) => {
    const storedUsers = JSON.parse(localStorage.getItem("registeredUsers"));

    const authorizedUser = storedUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (authorizedUser) {
      resolve({ token: "token", authorizedUser });
    } else {
      reject(new Error("Not found"));
    }
  });
};

export const checkTokenValidityMock = async ({ token, authorizedUser }) => {
  return new Promise((resolve, reject) => {
    const storedUsers =
      JSON.parse(localStorage.getItem("registeredUsers")) || [];

    const currentUser = storedUsers.find(
      (user) => user.email === authorizedUser.email
    );

    if (currentUser) {
      resolve(currentUser);
    } else {
      reject(new Error("Usuario no encontrado"));
    }
  });
};
