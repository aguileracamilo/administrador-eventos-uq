import React from "react";

function SignIn({ forget }) {
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
        <a onClick={next}>
          <label>¿Olvidaste tu contraseña?</label>
        </a>
      </div>
      <button>Ingresar</button>
    </form>
  );
}

function next() {
  let accountRecovery = document.getElementById("form-account-recovery");
  let sign = document.getElementById("form-sign-in");
  sign.style.display="none"
  accountRecovery.style.display = "flex";
}
export default SignIn;
