import React from "react";
import LOGO from "../assets/logo.png";
import homeIcon from "../assets/home.png";
import activityIcon from "../assets/activity.png";
import newsIcon from "../assets/news.png";
import userIcon from "../assets/user.png";
import logoutIcon from "../assets/logout.png";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

function MenuBar() {
  const location = useLocation();
  const state = location.state;


  return (
    <div className="bar">
      <section className="info-user">
        <img
          src={/*state.param3*/userIcon}
          alt="Logo"
          loading="lazy"
          className="avatar-img"
        />
        <div className="user-name">dmkfksdd</div>
        <div className="user-email">sdkdkk</div>
      </section>
      <hr />

      <div className="option-contain">
        <section className="options-section">
          <a className="element-page">
            <img className="icon" src={homeIcon} alt="Home" />
            <div>Inicio</div>
          </a>
          <Link to="/user/news">
            <div className="element-page">
              <img className="icon" src={newsIcon} alt="Crear publicación" />
              <div>Crear publicación</div>
            </div>
          </Link>
          <div className="element-page">
            <img className="icon" src={activityIcon} alt="Crear actividades" />
            <div>Crear actividades</div>
          </div>
          <div className="element-page">
            <img
              className="icon"
              src={userIcon}
              alt="Agregar administradores"
            />
            <div>Agregar administradores</div>
          </div>
          <div className="element-page">
            <img className="icon" src={logoutIcon} alt="Cerrar sesión" />
            <div>Cerrar sesión</div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default MenuBar;
