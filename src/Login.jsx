import React from "react";
import "./css/Login.css";
import SignIn from "./components/SignIn";
import logo from "./assets/uniquindio-logo.png";

function Login() {
  return (
    <><div className="background-mobile">

      <div className="login-area">
        <img src={logo} alt="Logo Uniquindio" />
        <SignIn />
      </div>
    </div>
      <div className="background-login"></div>
    </>
  );
}

export default Login;
