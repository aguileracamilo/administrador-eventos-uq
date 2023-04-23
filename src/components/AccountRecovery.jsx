import React from "react";
import { sendCode } from "../js/services/user.js";

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
          const emailInput = document.getElementById("email-recovery-input");
          const email = emailInput.value;
          emailInput.setCustomValidity("asdas");
          emailInput.reportValidity();
          if (email != "" && email.includes("@")) {
            sendCode(email);
            next(e, "form-account-recovery", "form-send-code");
          }
        }}
      >
        Ingresar
      </button>
    </form>
  );
}

export default AccountRecovery;
