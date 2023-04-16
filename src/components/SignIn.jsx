import React from "react";

function SignIn({ next }) {
  return (
    <form id="form-sign-in">
      <h3>
        <strong>Inicio de Sesión</strong>
      </h3>
      <label>Correo institucional</label>
      <input type="text" />
      <label>Contraseña</label>
      <input type="text" />
      <div>
        <a onClick={(e) => next(e, "form-sign-in", "form-account-recovery")}>
          <label>¿Olvidaste tu contraseña?</label>
        </a>
      </div>
      <button>Ingresar</button>
    </form>
  );
}

export default SignIn;
