import React from "react";
import FormStepper from "./FormStepper";
import back from "../assets/back.png";

function AccountRecovery() {
  return (
    <section id="form-account-recovery" style={{ display: "none" }}>
      <form>
        <h3>
          <strong>Recupera tu cuenta</strong>
        </h3>
        <label>Ingrese tu correo para recuperar la contraseña</label>
        <input />
        <button className="only-button">Ingresar</button>
      </form>
      <a onClick={a} id="back">
        <img id="back-icon" src={back} />
        <label>Volver a la página anterior</label>
      </a>

      <FormStepper></FormStepper>
    </section>
  );
}
function a() {
  let accountRecovery = document.getElementById("form-account-recovery");
  let sign = document.getElementById("form-sign-in");
  sign.style.display = "flex";
  accountRecovery.style.display = "none";
}

export default AccountRecovery;
