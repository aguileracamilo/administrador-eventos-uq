import React from "react";
import { loginUser } from "../js/services/user.js";

function SignIn({ next }) {
  return (
    <form id="form-sign-in">
      <h3>
        <strong>Inicio de Sesión</strong>
      </h3>
      <label>Correo institucional</label>
      <input id="email-input" type="text" />
      <label>Contraseña</label>
      <input id="password-input" type="text" />
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

  loginUser({
    email: emailInput.value,
    password: passwordInput.value,
  });
}

export default SignIn;
