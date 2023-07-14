import React, { useState, useEffect } from "react";
import "./createActivities.css";
import { useLocation } from "react-router-dom";
import { getAllEvents } from "../../js/services/user.js";

function CreateActivities() {
  const { state } = useLocation();
  const [allEvents, setAllEvents] = useState([]);
  useEffect(() => {
    return async () => {
      setAllEvents(await getAllEvents());
    };
  }, []);
  function getHourStart(date) {
    let hour = date.split("T")[1];

    let array_date = hour.split(":");

    return array_date[0] + ":" + array_date[1];
  }
  function getHourEnd(date, duration) {
    let hour = date.split("T")[1];

    let array_date = hour.split(":");

    const fecha = new Date();
    fecha.setHours(array_date[0]);
    fecha.setMinutes(array_date[1]);
    const added_date = new Date(fecha.getTime());
    added_date.setMinutes(fecha.getMinutes() + duration);

    return added_date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }

  return (
    <div className="create-event-page">
      <h2>Modificar/Crear actividad</h2>
      <label>Titulo*</label>
      <input defaultValue={(state)? state.title :""} />
      <label>Ubicación*</label>
      <input defaultValue={state?state.room:""} />
      <div className="horizontal-dates">
        <div className="activities-group">
          <div className="vertical-element">
            <label>Hora inicio*</label>
            <input type="time" defaultValue={(state)?getHourStart(state.date): ""} />
          </div>
          <div className="vertical-element">
            <label>Hora fin*</label>
            <input
              type="time"
              defaultValue={state?getHourEnd(state.date, state.duration):""}
            />
          </div>
        </div>
        <div className="activities-group">
          <div className="vertical-element">
            <label>Fecha*</label>
            <input type="date" defaultValue={state?state.date.split("T")[0]:""} />
          </div>
          <div className="activities-group">
            <div className="vertical-element">
              <label>Evento relacionado</label>
              <select id="combo-box-events">
                <option value="option1">Ninguno</option>
                {allEvents.map((item, index) => (
                  <option value="option2" key={index}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      <label>Autores*</label>
      <input />
      <div className="event-buttons activities-buttons">
        <button className="modify-button">Visualizar</button>
        <button className="modify-button">Guardar</button>
      </div>
    </div>
  );
}

export default CreateActivities;
