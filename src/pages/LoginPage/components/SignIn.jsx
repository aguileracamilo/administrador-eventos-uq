import React from "react";
import { loginUser } from "../../../js/services/user.js";

function SignIn({ next }) {
  return (
    <form id="form-sign-in">
      <h3>
        <strong>Inicio de Sesión</strong>
      </h3>
      <label htmlFor="email-input">Correo institucional</label>
      <input id="email-input" type="email" required />
      <label htmlFor="password-input">Contraseña</label>
      <input id="password-input" type="password" />
      <div>
        <a
          onClick={(e) => {
            next("form-sign-in", "form-account-recovery");
            e.preventDefault();
          }}
        >
          <label>¿Olvidaste tu contraseña?</label>
        </a>
      </div>
      <button onClick={login}>Ingresar</button>
    </form>
  );
}
function login(event) {
  event.preventDefault();

  const emailInput = document.getElementById("email-input");
  const passwordInput = document.getElementById("password-input");

  if (validateSignIn()) {
    loginUser({
      email: emailInput.value,
      password: passwordInput.value,
    });
  }
}
function validateSignIn() {
  const emailInput = document.getElementById("email-input");
  const email = emailInput.value;
  const passwordInput = document.getElementById("password-input");
  const password = passwordInput.value;

  if (!email.includes("@")) {
    emailInput.setCustomValidity("Debe contener por lo menos un @");
    emailInput.reportValidity();
  } else if (email === "@") {
    emailInput.setCustomValidity("El campo no debe ser vacío");
    emailInput.reportValidity();
  } else if (password.length < 8) {
    passwordInput.setCustomValidity(
      "La contraseña debe contener mínimo 8 dígitos"
    );
    passwordInput.reportValidity();
  } else {
    return true;
  }
  return false;
}
export default SignIn;
