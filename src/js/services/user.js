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
 export async function sendCode(email) {
  await fetch("http://localhost:8080/sendcode", {
    headers: {
      email: email,
    },
    method: "POST",
  })
    .then((respuesta) => respuesta.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

export default loginUser;

