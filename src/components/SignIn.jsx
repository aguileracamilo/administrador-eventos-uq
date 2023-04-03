import React from "react";

function SignIn() {
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
        <a>
          <label>¿Olvidaste tu contraseña?</label>
        </a>
      </div>
      <button>Ingresar</button>
    </form>
  );
}

export default SignIn;
