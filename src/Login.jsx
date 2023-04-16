import React, { useState, useEffect } from "react";
import "./css/Login.css";
import SignIn from "./components/SignIn";
import AccountRecovery from "./components/AccountRecovery";
import NewPassword from "./components/NewPassword";
import FormStepper from "./components/FormStepper";
import back from "./assets/back.png";
import logo from "./assets/uniquindio-logo.png";
import SendCode from "./components/SendCode";

function Login() {
  const [content, setContent] = useState(<></>);

  useEffect(() => {
    //  init();
  }, []);

  return (
    <>
      <div className="background-mobile">
        <div className="login-area">
          <img src={logo} alt="Logo Uniquindio" />
          <SignIn next={next} />
          <AccountRecovery next={next} />
          <SendCode next={next} />
          <NewPassword next={next} />
          <section id="guide-section" style={{ display: "none" }}>
            <a onClick={backToSignIn} id="back" className="text-center">
              <img id="back-icon" src={back} />
              <label>Volver a la página anterior</label>
            </a>
            <FormStepper></FormStepper>
          </section>
        </div>
      </div>
      <div className="background-login"></div>
    </>
  );
}

function next(event, current, nextId) {
  event.preventDefault();
  let currentPage = document.getElementById(current);
  let nextPage = document.getElementById(nextId);
  let step = document.getElementsByClassName("selected-step");
  let nextStep;
  switch (step[0]?.id) {
    case "step-1":
      step[0].classList.replace("selected-step", "step");
      nextStep = document.getElementById("step-2");
      nextStep.classList.replace("step", "selected-step");

      break;
    case "step-2":
      step[0].classList.replace("selected-step", "step");
      nextStep = document.getElementById("step-3");
      nextStep.classList.replace("step", "selected-step");

      break;
    case "step-3":
      break;

    default:
      let step1 = document.getElementById("step-1");
      let guide = document.getElementById("guide-section");

      step1.classList.add("selected-step");
      guide.style.display = "flex";
  }
  currentPage.style.display = "none";
  nextPage.style.display = "flex";
}

function backToSignIn(current, before) {
  let signIn = document.getElementById("form-sign-in");
  let accountRecovery = document.getElementById("form-account-recovery");
  let sendCode = document.getElementById("form-send-code");
  let newPassword = document.getElementById("form-new-password");

  let guide = document.getElementById("guide-section");

  let step = document.getElementsByClassName("selected-step");

  console.log(step[0].id);

  let backStep;
  switch (step[0].id) {
    case "step-1":
      signIn.style.display = "flex";
      guide.style.display = "none";
      let step1 = document.getElementById("step-1");
      step1.classList.remove("selected-step");
      accountRecovery.style.display = "none";

      break;
    case "step-2":
      accountRecovery.style.display = "flex";
      sendCode.style.display = "none";
      step[0].classList.replace("selected-step", "step");
      backStep = document.getElementById("step-1");
      backStep.classList.replace("step", "selected-step");
      break;
    case "step-3":
      sendCode.style.display = "flex";
      newPassword.style.display = "none";
      step[0].classList.replace("selected-step", "step");
      backStep = document.getElementById("step-2");
      backStep.classList.replace("step", "selected-step");
      break;

    default:
      alert("error");
  }
}
export default Login;
