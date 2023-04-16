import React from "react";

function NewPassword() {
  return (
    <form id="form-new-password" style={{ display: "none" }}>
      <h3>
        <strong>Cambiar contraseña</strong>
      </h3>
      <label>Nueva Contraseña</label>
      <input />
      <label>Confirme nueva contraseña</label>
      <input />
      <button className="only-button">Confirmar</button>
    </form>
  );
}

export default NewPassword;
