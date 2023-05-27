import React from "react";
import LOGO from "../assets/logo.png";
import home from "../assets/home.png";
import activity from "../assets/activity.png";
import news from "../assets/news.png";
import user from "../assets/user.png";
import logout from "../assets/logout.png";

function MenuBar() {
  return (
    <div className="bar">
      <section className="info-user">
        <img src={LOGO} loading="lazy" className="avatar-img" />
        <div style={{ fontWeight: "bold", fontSize: "27px", height: "30px" }}>
          Jefersona gutierrez
        </div>
        <div style={{ fontSize: "20px" }}>sjkadjsisdak@gmail.com</div>
      </section>
      <hr />

      <div className="option-contain">
        <section className="options-section">
          <div className="element-page">
            <img className="icon" src={home}></img>
            <div>Inicio</div>
          </div>
          <div className="element-page">
            <img className="icon" src={news}></img>
            <div>Crear publicación</div>
          </div>
          <div className="element-page">
            <img className="icon" src={activity}></img>
            <div>Crear actividades</div>
          </div>
          <div className="element-page">
            <img className="icon" src={user}></img>
            <div>Agregar administradores</div>
          </div>
          <div className="element-page">
            <img className="icon" src={logout}></img>
            <div>Cerrar sesion</div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default MenuBar;
