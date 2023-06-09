import MenuBar from "../../components/MenuBar";
import "./home.css";
import logo from "../../assets/prueba.png";
import plus from "../../assets/plus.png";
import search from "../../assets/search.png";
import React, { useState, useEffect } from "react";

function Home() {

  return (
    <>
      <h2>Eventos Activos</h2>
      <div className="search">
        <input />{" "}
        <button id="search-button">
          <label>Buscar</label>
          <img src={search}></img>
        </button>
      </div>
      <section className="grid-container">
        <div className="grid-item">
          <img src={logo} alt="Logo" />
          <label>
            Comunicado | Comité Electoral de la Universidad del Quindío | 10 de
            marzo
          </label>
        </div>
        <div className="grid-item">
          <img src={logo} alt="Logo" />
          <label>
            Comunicado | Comité Electoral de la Universidad del Quindío | 10 de
            marzo
          </label>
        </div>
        <div className="grid-item">
          <img src={logo} alt="Logo" />
          <label>
            Comunicado | Comité Electoral de la Universidad del Quindío | 10 de
            marzo
          </label>
        </div>
        <div className="grid-item">
          <img src={logo} alt="Logo" />
          <label>
            Comunicado | Comité Electoral de la Universidad del Quindío | 10 de
            marzo
          </label>
        </div>
        <div className="grid-item">
          <img src={logo} alt="Logo" />
          <label>
            Comunicado | Comité Electoral de la Universidad del Quindío | 10 de
            marzo
          </label>
        </div>
        <div className="grid-item">
          <img src={logo} alt="Logo" />
          <label>
            Comunicado | Comité Electoral de la Universidad del Quindío | 10 de
            marzo
          </label>
        </div>
        <div className="grid-item">
          <img src={logo} alt="Logo" />
          <label>
            Comunicado | Comité Electoral de la Universidad del Quindío | 10 de
            marzo
          </label>
        </div>
        <div className="grid-item">
          <img src={logo} alt="Logo" />
          <label>
            Comunicado | Comité Electoral de la Universidad del Quindío | 10 de
            marzo
          </label>
        </div>
        <div className="grid-item">
          <img src={logo} alt="Logo" />
          <label>
            Comunicado | Comité Electoral de la Universidad del Quindío | 10 de
            marzo
          </label>
        </div>
        <button id="create-event-button">
          <label>Crear un evento</label>
          <img src={plus} />
        </button>
      </section>
    </>
  );
}

export default Home;
