//import address from "../utils/constants.js";

export async function loginUser(loginData) {
  await fetch("http://localhost:8080/login", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(loginData),
  })
    .then((respuesta) => respuesta.json())
    .then((data) => {
      console.log(data);
      //localStorage.setItem('token', data.token);
      const token = localStorage.getItem("token");
      console.log(token);
    })
    .catch((error) => {
      console.log(error);
    });
}
export async function generateCode(email) {
  const respuesta = await fetch("http://localhost:8080/sendcode", {
    headers: {
      email: email,
    },
    method: "POST",
  });
  const data = await respuesta.json();
  return data.message;
}

export async function validateCode(email, code) {
  const url =
    "http://localhost:8080/validateCode?email=" + email + "&code=" + code;

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error en la respuesta del servidor.");
      }
    })
    .then((jsonResponse) => {
      console.log(jsonResponse);
      localStorage.setItem("tokenRecovery", jsonResponse.tokenRecovery);
      return jsonResponse;
    })
    .catch((error) => {
      console.error(error);
    });
}
export async function changePassword(newPassword) {
  const url = "http://localhost:8080/changePassword";

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPassword),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error en la respuesta del servidor.");
      }
    })
    .then((jsonResponse) => {
      console.log(jsonResponse);

      return jsonResponse;
    })
    .catch((error) => {
      console.error(error);
    });
}

export default loginUser;
