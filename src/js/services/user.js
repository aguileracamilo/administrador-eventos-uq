import address from "../utils/constants.js";

export default async function loginUser(loginData) {
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
    })
    .catch((error) => {
      console.log(error);
    });
}
