import React from "react";
import { generateCode } from "../../../js/services/user.js";

function AccountRecovery({ next }) {
  return (
    <form id="form-account-recovery" style={{ display: "none" }}>
      <h3>
        <strong>Recupera tu cuenta</strong>
      </h3>
      <label htmlFor="email-recovery">
        Ingrese tu correo para recuperar la contraseña
      </label>
      <input
        type="email"
        id="email-recovery-input"
        name="email-recovery"
        required
      />
      <button
        className="only-button"
        onClick={(e) => {
          sendEmail(e, next);
        }}
      >
        Ingresar
      </button>
    </form>
  );
}

async function sendEmail(e, next) {
  e.preventDefault();
  let response;
  const emailInput = document.getElementById("email-recovery-input");
  const email = emailInput.value;

  if (!email.includes("@")) {
    emailInput.setCustomValidity("Debe contener por lo menos un @");
    emailInput.reportValidity();
  } else if (email != "") {
    response = await generateCode(email);
  }

  if (response === "code-sent") {
    next("form-account-recovery", "form-send-code");
  } else if (response === "user-no-found") {
    emailInput.setCustomValidity("El correo no está registrado");
    emailInput.reportValidity();
  } else if (response === "error-to-generate-code") {
    alert("Lo sentimos el código no se envió vuelve a intentar más tarde");
  }
}

export default AccountRecovery;
