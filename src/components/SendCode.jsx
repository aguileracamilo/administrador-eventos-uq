import React from "react";
import { generateCode, validateCode } from "../js/services/user.js";

function SendCode({ next }) {
  return (
    <form id="form-send-code" style={{ display: "none" }}>
      <h3>
        <strong>Código de seguridad</strong>
      </h3>
      <label>Ingresa código de seguridad</label>
      <input id="code-input" />
      <button
        className="only-button"
        onClick={(e) => {
          e.preventDefault();
          sendValidateCode(next);
        }}
      >
        Ingresar
      </button>

      <a
        className="text-center"
        onClick={() => {
          const emailInput = document.getElementById("email-recovery-input");
          const email = emailInput.value;
          generateCode(email);
          alert("Código envíado");
        }}
      >
        <label>¿No recibiste el código? Click para enviar</label>
      </a>
    </form>
  );
}

async function sendValidateCode(next) {
  const emailInput = document.getElementById("email-recovery-input");
  const email = emailInput.value;
  const codeInput = document.getElementById("code-input");
  const code = codeInput.value;

  let response = await validateCode(email, code);

  console.log(response.message);
  if (response.message === "incorrect-code") {
    codeInput.setCustomValidity("Código incorrecto");
    codeInput.reportValidity();
  } else if (response.message === "no-more-tries") {
    codeInput.setCustomValidity("Demasiados intentos");
    codeInput.reportValidity();
  } else if (response.message === "invalid-code") {
    codeInput.setCustomValidity("El código expiró");
    codeInput.reportValidity();
  } else {
    next("form-send-code", "form-new-password");
  }
}
export default SendCode;
