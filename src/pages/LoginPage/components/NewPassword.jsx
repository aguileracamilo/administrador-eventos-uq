import React from "react";
import { changePassword } from "../../../js/services/user.js";

function NewPassword() {
  return (
    <form id="form-new-password" style={{ display: "none" }}>
      <h3>
        <strong>Cambiar contraseña</strong>
      </h3>
      <label htmlFor="new-password-input">Nueva Contraseña</label>
      <input id="new-password-input" type="password" />
      <label htmlFor="new-password-confirmed-input">
        Confirme nueva contraseña
      </label>
      <input id="new-password-confirmed-input" type="password" />
      <button
        className="only-button"
        onClick={(e) => {
        //e.preventDefault();
          confirmChanges(changePassword);
        }}
      >
        Confirmar
      </button>
    </form>
  );
}

function confirmChanges(changePassword) {
  const emailInput = document.getElementById("email-recovery-input");
  const email = emailInput.value;
  const passwordInput = document.getElementById("new-password-input");
  const password = passwordInput.value;
  const passworConfirmedInput = document.getElementById(
    "new-password-confirmed-input"
  );
  const passwordConfirmed = passworConfirmedInput.value;
  const token = localStorage.getItem("tokenRecovery");
  console.log(token);

  console.log({
    email: email,
    token: token,
    password: password,
    passwordConfirmed: passwordConfirmed,
  });
  changePassword({
    email: email,
    token: token,
    password: password,
    passwordConfirmed: passwordConfirmed,
  });
}

export default NewPassword;
