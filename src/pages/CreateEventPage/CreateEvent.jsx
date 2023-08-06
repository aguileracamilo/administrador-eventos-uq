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
    setPreviewImage(
      state
        ? state.photo
        : "https://w7.pngwing.com/pngs/388/487/png-transparent-computer-icons-graphy-img-landscape-graphy-icon-miscellaneous-angle-text.png"
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
      });
    } else {
      createEvent({
        title: title,
        description: description,
        place: place,
        eventType: type,
        eventState: stateEvent,
        photo: previewImage,
      });
    }
  }

  return (
    <div className="create-event-page">
      <h2>Modificar/Crear evento</h2>

      <label>Titulo*</label>
      <input
        id="title-input"
        defaultValue={state ? state.title : ""}
        required
      />
      <label>Descripción*</label>
      <textarea
        rows="8"
        cols="50"
        id="description-input"
        defaultValue={state ? state.description : ""}
        required
      />
      <div className="both-sides">
        <div className="side-left">
          <label>Imagen</label>
          <input type="file" onChange={handleFile} required></input>
          {previewImage && <img src={previewImage} />}
        </div>
        <div className="side-right">
          <label>Ubicación*</label>
          <input
            id="place-input"
            defaultValue={state ? state.place : ""}
            required
          />
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
