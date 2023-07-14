import MenuBar from "../../components/MenuBar";
import "./home.css";
import logo from "../../assets/prueba.png";
import plus from "../../assets/plus.png";
import search from "../../assets/search.png";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllEvents } from "../../js/services/user.js";
 function  Home() {
  const [allEvents, setAllEvents] = useState([]);
  
  useEffect(() => {
  
    return async() => {
     setAllEvents( await getAllEvents());
    }
  },[])

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
        {allEvents.map((item, index) => (
          <Link to="/user/create-event" state={item} className="grid-item" key={index}>
            <img src={item.photo} alt="Logo" />
            <label>
             {item.title}
            </label>
          </Link>
        ))}

        <Link to="/user/create-event">
          <button id="create-event-button">
            <label>Crear un evento</label>
            <img src={plus} />
          </button>
        </Link>
      </section>
    </>
  );
}

export default Home;
