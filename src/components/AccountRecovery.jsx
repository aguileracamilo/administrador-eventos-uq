import React from "react";

function AccountRecovery({ next }) {
  return (
    <form
      id="form-account-recovery"
      style={{ display: "none" }}
      onClick={(e) => next(e, "form-account-recovery", "form-send-code")}
    >
      <h3>
        <strong>Recupera tu cuenta</strong>
      </h3>
      <label>Ingrese tu correo para recuperar la contraseña</label>
      <input />
      <button className="only-button">Ingresar</button>
    </form>
  );
}

export default AccountRecovery;
