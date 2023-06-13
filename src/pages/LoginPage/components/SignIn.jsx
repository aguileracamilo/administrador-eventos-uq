import React from "react";
import { loginUser } from "../../../js/services/user.js";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function SignIn({ next }) {
  const navigateTo = useNavigate();
  async function handleLoginClick(event) {
    const success = await login(event);
    if (success.success) {
      navigateTo('/user',{ state: { param1: success.userInfo[0], param2: success.userInfo[1],param3:success.userInfo[2] } });
    }
  }
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
      
        <button onClick={handleLoginClick}>Ingresar</button>
     
    </form>
  );
}
async function login(event) {
  event.preventDefault();
  const emailInput = document.getElementById("email-input");
  const passwordInput = document.getElementById("password-input");
  let resp;
  let val = validateSignIn();
  let preventDefault = false; // Bandera para controlar si se debe prevenir la acción predeterminada

  if (val) {
    resp = await loginUser({
      email: emailInput.value,
      password: passwordInput.value,
    }).then((data) => data);

    if (!resp.success) {
      emailInput.setCustomValidity("Datos incorrectos");
      emailInput.reportValidity();
      preventDefault = true;
      return resp; // Establece la bandera en true para prevenir la acción predeterminada
    }
  }
  if (!val || preventDefault) {
    event.preventDefault();
    return resp; // Previene la acción predeterminada si se cumple alguna de las condiciones
  }
  return resp;
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
