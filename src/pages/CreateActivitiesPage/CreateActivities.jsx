import React, { useState, useEffect } from "react";
import "./createActivities.css";
import { useLocation } from "react-router-dom";
import { getAllEvents } from "../../js/services/user.js";
import {
  createActivity,
  updateActivity,
  deleteActivity,
} from "../../js/services/user.js";
import { Link } from "react-router-dom";

function CreateActivities() {
  const { state } = useLocation();
  const [allEvents, setAllEvents] = useState([]);

  useEffect(() => {
    const fetchAllEvents = async () => {
      const events = await getAllEvents();
      setAllEvents(events);
    };

    fetchAllEvents();
  }, []);

  useEffect(() => {
    if (state) {
      const selectElement = document.getElementById("combo-box-events");
      if (selectElement) {
        const options = selectElement.getElementsByTagName("option");

        for (let i = 0; i < options.length; i++) {
          if (state.idevent == options[i].value) {
            options[i].selected = true;
          }
        }
      }
    }
  }, [allEvents]);

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

  function confirmDataCreateOrUpdate(createActivity, updateActivity, state) {
    const titleInput = document.getElementById("title-activity-input");
    const title = titleInput.value.trim();
    const placeInput = document.getElementById("place-input");
    const place = placeInput.value.trim();

    const eventSelect = document.getElementById("combo-box-events");
    const event = eventSelect.value;
    const authorsInput = document.getElementById("authors-input");
    const authors = authorsInput.value.trim();
    const startHourInput = document.getElementById("start-hour-input");
    const startHour = startHourInput.value.trim();
    const endHourInput = document.getElementById("end-hour-input");
    const endHour = endHourInput.value.trim();
    const dateInput = document.getElementById("date-input");
    const date = dateInput.value.trim();

    const duration = calculatorTime(startHour, endHour);

    if (!title) {
      titleInput.setCustomValidity("El título es obligatorio");
      titleInput.reportValidity();
      return;
    }

    if (!place) {
      placeInput.setCustomValidity("La ubicación es obligatoria");
      placeInput.reportValidity();
      return;
    }

    if (!date) {
      dateInput.setCustomValidity("La fecha es obligatoria");
      dateInput.reportValidity();
      return;
    }

    if (!startHour) {
      startHourInput.setCustomValidity("La hora de inicio es obligatoria");
      startHourInput.reportValidity();
      return;
    }

    if (!endHour) {
      endHourInput.setCustomValidity("La hora de fin es obligatoria");
      endHourInput.reportValidity();
      return;
    }

    if (duration <= 0) {
      startHourInput.setCustomValidity(
        "La hora de inicio debe ser anterior a la hora de fin"
      );
      startHourInput.reportValidity();
      return;
    }

    if (!authors) {
      authorsInput.setCustomValidity("Los autores son obligatorios");
      authorsInput.reportValidity();
      return;
    }

    if (state) {
      updateActivity({
        id: state.id,
        title: title,
        room: place,
        idevent: parseInt(event),
        date: date + "T" + startHour,
        duration: duration,
        authors: authors,
      });
    } else {
      createActivity({
        title: title,
        room: place,
        idevent: parseInt(event),
        date: date + "T" + startHour,
        duration: duration,
        authors: authors,
      });
    }
  }

  function calculatorTime(time1, time2) {
    var fechaBase = new Date("1970-01-01");
    var fecha1 = new Date(fechaBase.toISOString().split("T")[0] + "T" + time1);
    var fecha2 = new Date(fechaBase.toISOString().split("T")[0] + "T" + time2);

    var diferenciaMs = fecha2.getTime() - fecha1.getTime();

    var diferenciaMinutos = Math.abs(diferenciaMs / (1000 * 60));

    return diferenciaMinutos;
  }

  return (
    <div className="create-event-page">
      <h2>Modificar/Crear actividad</h2>
      <label>Titulo*</label>
      <input
        id="title-activity-input"
        defaultValue={state ? state.title : ""}
        required
      />
      <label>Ubicación*</label>
      <input id="place-input" defaultValue={state ? state.room : ""} required />
      <div className="horizontal-dates">
        <div className="activities-group">
          <div className="vertical-element">
            <label>Hora inicio*</label>
            <input
              id="start-hour-input"
              type="time"
              defaultValue={state ? getHourStart(state.date) : ""}
              required
            />
          </div>
          <div className="vertical-element">
            <label>Hora fin*</label>
            <input
              id="end-hour-input"
              type="time"
              defaultValue={state ? getHourEnd(state.date, state.duration) : ""}
              required
            />
          </div>
        </div>
        <div className="activities-group">
          <div className="vertical-element">
            <label>Fecha*</label>
            <input
              id="date-input"
              type="date"
              defaultValue={state ? state.date.split("T")[0] : ""}
              required
            />
          </div>
          <div className="activities-group">
            <div className="vertical-element">
              <label>Evento relacionado</label>
              <select
                id="combo-box-events"
                defaultValue={state ? state.idevent : "option1"}
              >
                <option value="option1">Ninguno</option>
                {allEvents.map((item, index) => (
                  <option value={item.id} key={index}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      <label>Autores*</label>
      <input
        id="authors-input"
        defaultValue={state ? state.authors : ""}
        required
      />
      <div className="event-buttons activities-buttons">
        <Link to="/user/activities">
          <button
            className="modify-button delete-button"
            onClick={(e) => {
              deleteActivity(state.id);
            }}
          >
            Eliminar
          </button>
        </Link>
        <button
          onClick={(e) => {
            confirmDataCreateOrUpdate(createActivity, updateActivity, state);
          }}
          className="modify-button"
        >
          Guardar
        </button>
      </div>
    </div>
  );
}

export default CreateActivities;
