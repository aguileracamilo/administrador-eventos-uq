import "../HomePage/home.css";
import "./activities.css";
import logo from "../../assets/prueba.png";
import plus from "../../assets/plus.png";
import search from "../../assets/search.png";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { getAllActivities,getAllEvents } from "../../js/services/user.js";

function Activities() {
  function changeDate(date) {
    let months = {
      "01": "Ene",
      "02": "Feb",
      "03": "Mar",
      "04": "Abr",
      "05": "May",
      "06": "Jun",
      "07": "Jul",
      "08": "Ago",
      "09": "Sep",
      10: "Oct",
      11: "Nov",
      12: "Dic",
    };
    let date_whitout_hour = date.split("T")[0];

    let array_date = date_whitout_hour.split("-");

    let inicial_months = months[array_date[1]];
    return array_date[2] + " " + inicial_months;
  }
  function getHour(date,duration) {
    let hour = date.split("T")[1];

    let array_date = hour.split(":");

    const fecha = new Date();
    fecha.setHours(array_date[0]);
    fecha.setMinutes(array_date[1]);
    const added_date =new Date(fecha.getTime())
    added_date.setMinutes(fecha.getMinutes() + duration);
   
    return fecha.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })+"-"+added_date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }

  const [allNews, setAllActivities] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  useEffect(() => {
    return async () => {
      setAllActivities(await getAllActivities());
      setAllEvents(await getAllEvents())
    };
  }, []);
  return (
    <>
      <h2>Actividades</h2>
      <div className="search">
        <select>
          <option value="option1">
            Ninguno
          </option>
          {allEvents.map((item, index) => (
          <option value="option2" key={index}>{item.title}</option>))}
        </select>
        <input />{" "}
        <button id="search-button">
          <label>Buscar</label>
          <img src={search}></img>
        </button>
      </div>
      <section className="grid-container">
        {allNews.map((item, index) => (
          <Link
            to="/user/create-activities"
            state={item}
            className="grid-itema"
            key={index}
          >
            <label className="date-style">{changeDate(item.date)}</label>
            <label className="title-style">{item.title}</label>
            <label className="hour-style">{getHour(item.date,item.duration)}</label>
          </Link>
        ))}
        <Link to="/user/create-activities">
          <button id="create-event-button">
            <label>Crear publicación</label>
            <img src={plus} />
          </button>
        </Link>
      </section>
    </>
  );
}

export default Activities;
