import React from "react";
import LOGO from "../assets/logo.png";
import homeIcon from "../assets/home.png";
import activityIcon from "../assets/activity.png";
import newsIcon from "../assets/news.png";
import userIcon from "../assets/user.png";
import logoutIcon from "../assets/logout.png";

import { Link } from "react-router-dom";

function MenuBar() {


  return (
    <div className="bar">
      <section className="info-user">
        <img
          src={localStorage.getItem("photo")}
          alt="Logo"
          loading="lazy"
          className="avatar-img"
        />
        <div className="user-name">{localStorage.getItem("name")}</div>
        <div className="user-email">{localStorage.getItem("email")}</div>
      </section>
      <hr />

      <div className="option-contain">
        <section className="options-section">
          <Link to="/user/" className="link-no-underline">
            <div className="element-page">
              <img className="icon" src={homeIcon} alt="Home" />
              <div>Inicio</div>
            </div>
          </Link>
          <Link to="/user/news" className="link-no-underline">
            <div className="element-page">
              <img className="icon" src={newsIcon} alt="Crear publicación" />
              <div>Crear Noticia</div>
            </div>
          </Link>
          <Link to="/user/activities" className="link-no-underline">
            <div className="element-page">
              <img
                className="icon"
                src={activityIcon}
                alt="Crear actividades"
              />
              <div>Crear actividades</div>
            </div>
          </Link>
          <Link to="/user/create-event" className="link-no-underline">
            <div className="element-page">
              <img
                className="icon"
                src={userIcon}
                alt="Agregar administradores"
              />
              <div>Agregar administradores</div>
            </div>
          </Link>
          <Link to="/" className="link-no-underline">
            <div className="element-page">
              <img className="icon" src={logoutIcon} alt="Cerrar sesión" />
              <div>Cerrar sesión</div>
            </div>
          </Link>
        </section>
      </div>
    </div>
  );
}

export default MenuBar;
