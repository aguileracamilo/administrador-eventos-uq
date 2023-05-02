import React from "react";
import { changePassword } from "../js/services/user.js";

function NewPassword() {
  return (
    <form id="form-new-password" style={{ display: "none" }}>
      <h3>
        <strong>Cambiar contraseña</strong>
      </h3>
      <label>Nueva Contraseña</label>
      <input id="new-password-input" />
      <label>Confirme nueva contraseña</label>
      <input id="new-password-confirmed-input" />
      <button
        className="only-button"
        onClick={(e) => {
          e.preventDefault();
          confirmChanges(changePassword);
        }}
      >
        Confirmar
      </button>
    </form>
  );
}

function confirmChanges(changePassword) {
  console.log("ahhh izquierdosos");
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
