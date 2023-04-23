import React from "react";

function SendCode({ next }) {
  return (
    <form id="form-send-code" style={{ display: "none" }}>
      <h3>
        <strong>Código de seguridad</strong>
      </h3>
      <label>Ingresa código de seguridad</label>
      <input />
      <button
        className="only-button"
        onClick={(e) => next(e, "form-send-code", "form-new-password")}
      >
        Ingresar
      </button>

      <a className="text-center">
        <label>¿No recibiste el código? Click para enviar</label>
      </a>
    </form>
  );
}

export default SendCode;
