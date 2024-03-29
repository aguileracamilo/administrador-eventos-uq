import React, { useState, useEffect } from "react";
import axios from "axios";
import "./createEvent.css";
import { useLocation } from "react-router-dom";
import {
  createEvent,
  deleteEvent,
  updateEvent,
} from "../../js/services/user.js";
import { Link } from "react-router-dom";

function CreateEvent() {
  const { state } = useLocation();
  const [previewImage, setPreviewImage] = useState(null);
  useEffect(() => {
    const [datePart, timePart] =
      state && state.date ? state.date.split("T") : ["", ""];

    // Actualizar los estados de fecha y hora con los valores seleccionados
    setSelectedDate(datePart);
    setSelectedTime(timePart.slice(0, -3));
    setPreviewImage(
      state
        ? state.photo
        : "https://res.cloudinary.com/dntd2pmgs/image/upload/v1692054291/elk91xyyn4ebvrrcaqlm.jpg"
    );
  }, [state]);

  const preset_key = "r5yvbaa0";
  const cloud_name = "dntd2pmgs";
  const [image, setImage] = useState();

  function handleFile(event) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset_key);
    axios
      .post(
        `https://api.cloudinary.com/v1_1/dntd2pmgs/image/upload?upload_preset=tuo4xq9t`,
        formData
      )
      .then((res) => res)
      .then((response) => {
        console.log(response.data.url);
        if (response) {
          setPreviewImage(response.data.url);
        }
      })
      .catch((err) => console.log(err));
  }

  function confirmDataCreateOrUpdate(
    createEvent,
    updateEvent,
    previewImage,
    state
  ) {
    const titleInput = document.getElementById("title-input");
    const title = titleInput.value.trim();
    const descriptionInput = document.getElementById("description-input");
    const description = descriptionInput.value.trim();
    const placeConfirmedInput = document.getElementById("place-input");
    const place = placeConfirmedInput.value.trim();
    const typeSelect = document.getElementById("combo-box-type");
    const type = typeSelect.value;
    const stateSelect = document.getElementById("combo-box-states");
    const stateEvent = stateSelect.value;

    if (!title) {
      titleInput.setCustomValidity("El título es obligatorio");
      titleInput.reportValidity();
      return;
    }else if(title.length<3){
      titleInput.setCustomValidity("El título es obligatorio");
      titleInput.reportValidity();
      return;
    }

    if (!description) {
      descriptionInput.setCustomValidity("La descripción es obligatoria");
      descriptionInput.reportValidity();
      return;
    }

    if (!place) {
      placeConfirmedInput.setCustomValidity("La ubicación es obligatoria");
      placeConfirmedInput.reportValidity();
      return;
    }

    if (!type) {
      typeSelect.setCustomValidity("El tipo de evento es obligatorio");
      typeSelect.reportValidity();
      return;
    }

    if (!stateEvent) {
      stateSelect.setCustomValidity("El estado del evento es obligatorio");
      stateSelect.reportValidity();
      return;
    }

    if (state) {
      updateEvent({
        id: state.id,
        title: title,
        description: description,
        place: place,
        eventType: type,
        eventState: stateEvent,
        photo: previewImage,
        date: handleDateTime(),
      });
    } else {
      createEvent({
        title: title,
        description: description,
        place: place,
        eventType: type,
        eventState: stateEvent,
        photo: previewImage,
        date: handleDateTime(),
      });
    }
  }
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleDateTime = () => {
    return `${selectedDate}T${selectedTime}:00`;
  };

  return (
    <div className="create-event-page">
      <h2>Modificar/Crear evento</h2>

      <label>Titulo*</label>
      <input
        id="title-input"
        defaultValue={state ? state.title : ""} maxLength={140}
        required
      />
      <label>Descripción*</label>
      <textarea
        rows="8"
        cols="50"
        id="description-input"
        defaultValue={state ? state.description : ""}
        maxLength={500}
        required
      />
      <div className="both-sides">
        <div className="side-left">
          <label>Imagen</label>
          <input
          className="input-file"
            type="file"
            accept=".png, .jpg"
            onChange={handleFile}
            required
          ></input>
          {previewImage && <img src={previewImage} />}
        </div>
        <div className="side-right">
          <label>Ubicación*</label>
          <input
            id="place-input"
            defaultValue={state ? state.place : ""}
            maxLength={200}
            required
          />
          <div className="horizontal">
            <div className="vertical">
              <label>Tipo de evento*</label>
              <select
                id="combo-box-type"
                defaultValue={state ? state.eventType : ""}
                required
              >
                <option value="COLOQUIO">COLOQUIO</option>
                <option value="CONFERENCIA">CONFERENCIA</option>
                <option value="CONGRESO">CONGRESO</option>
                <option value="FORO">FORO</option>
                <option value="PANEL">PANEL</option>
                <option value="SEMINARIO">SEMINARIO</option>
                <option value="SIMPOSIO">SIMPOSIO</option>
                <option value="TALLER">TALLER</option>
              </select>
            </div>
            <div className="vertical">
              <label>Estado del evento*</label>
              <select
                id="combo-box-states"
                defaultValue={state ? state.eventState : ""}
                required
              >
                <option value="PROXIMAMENTE">PROXIMAMENTE</option>
                <option value="ACTIVO">ACTIVO</option>
                <option value="FINALIZADO">FINALIZADO</option>
              </select>
            </div>
          </div>
          <div className="horizontal">
            <div className="vertical">
              <label>Fecha</label>
              <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
              />
            </div>
            <div className="vertical">
              <label>Hora</label>
              <input
                type="time"
                value={selectedTime}
                onChange={handleTimeChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="event-buttons">
        <Link to="/user/">
          <button
            onClick={(e) => {
              deleteEvent(state.id);
            }}
            className="modify-button delete-button"
          >
            Eliminar
          </button>
        </Link>
        <button
          className="modify-button"
          onClick={(e) => {
            confirmDataCreateOrUpdate(
              createEvent,
              updateEvent,
              previewImage,
              state
            );
          }}
        >
          Guardar
        </button>
      </div>
    </div>
  );
}

export default CreateEvent;
