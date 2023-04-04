import React from "react";

function SignIn({forget}) {
  return (
    <form>
      <h3>
        <strong>Inicio de Sesión</strong>
      </h3>
      <label>Correo institucional</label>
      <input type="text" />
      <label>Contraseña</label>
      <input type="text" />
      <div>
        <a onClick={forget}>
          <label>¿Olvidaste tu contraseña?</label>
        </a>
      </div>
      <button>Ingresar</button>
    </form>
  );
}

export default SignIn;
