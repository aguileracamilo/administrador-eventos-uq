import React, { useState, useEffect } from "react";
import "./css/Login.css";
import SignIn from "./components/SignIn";
import AccountRecovery from "./components/AccountRecovery";
import logo from "./assets/uniquindio-logo.png";

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
          <SignIn />
          <AccountRecovery />
        </div>
      </div>
      <div className="background-login"></div>
    </>
  );
}
function init() {
  let accountRecovery = document.getElementById("form-account-recovery");
  accountRecovery.style.display = "none";
}

export default Login;
