import React, { useState, useEffect } from "react";
import "./css/Login.css";
import SignIn from "./components/SignIn";
import AccountRecovery from "./components/AccountRecovery";
import logo from "./assets/uniquindio-logo.png";

function Login() {
  const [content, setContent] = useState(<></>);

  function setAccountRecovery() {
    setContent(<AccountRecovery />);
  }
  function setSinIn() {
    setContent(<SignIn forget={setAccountRecovery} />);
  }
  useEffect(() => {
    console.log("eee");
    setContent(<SignIn forget={setAccountRecovery} />);
  }, []);

  return (
    <>
      <div className="background-mobile">
        <div className="login-area">
          <img src={logo} alt="Logo Uniquindio" />
          {content}
        </div>
      </div>
      <div className="background-login"></div>
    </>
  );
}

export default Login;
