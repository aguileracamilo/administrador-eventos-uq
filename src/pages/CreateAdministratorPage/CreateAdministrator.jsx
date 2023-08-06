import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import {
  createEvent,
  deleteEvent,
  updateEvent,
} from "../../js/services/user.js";
import search from "../../assets/search.png";
import { Link } from "react-router-dom";

function CreateAdministrator() {

  

  const { state } = useLocation();
  const [previewImage, setPreviewImage] = useState(null);
  useEffect(() => {
    return () => {
      setPreviewImage(
        state
          ? state.photo
          : "https://w7.pngwing.com/pngs/388/487/png-transparent-computer-icons-graphy-img-landscape-graphy-icon-miscellaneous-angle-text.png"
      );
    };
  }, []);

  console.log(state);

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
  return (
    <div className="create-event-page">
      <h2>Modificar/Agregar Administrador</h2>
      <div className="search">
        <input />
        <button id="search-button">
          <label>Buscar</label>
          <img src={search} alt="Search" />
        </button>
      </div>
      <label>Nombre Completo*</label>
      <input id="title-input" defaultValue={state ? state.title : ""} />
      <label>Correo*</label>
      <input
        id="description-input"
        defaultValue={state ? state.description : ""}
      />
      <div className="both-sides">
        <div className="side-left">
          <label>Imagen</label>
          <input type="file" onChange={handleFile}></input>
          {previewImage && <img src={previewImage} />}
          <label>Nivel*</label>
          <select
            id="combo-box-states"
            defaultValue={state ? state.eventState : ""}
          >
            <option value="PROXIMAMENTE">PROXIMAMENTE</option>
            <option value="ACTIVO">ACTIVO</option>
            <option value="FINALIZADO">FINALIZADO</option>
          </select>
        </div>
        <div className="side-right">
          <label>Eventos*</label>
          <input id="place-input" defaultValue={state ? state.place : ""} />
        </div>
      </div>
      <div className="event-buttons">
        <Link to="/user/">
          <button
            onClick={(e) => {
              //e.preventDefault();
              console.log(state.id);
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
            //e.preventDefault();
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

function confirmDataCreateOrUpdate(
  createEvent,
  updateEvent,
  previewImage,
  state
) {
  const titleInput = document.getElementById("title-input");
  const title = titleInput.value;
  const descriptionInput = document.getElementById("description-input");
  const description = descriptionInput.value;
  const placeConfirmedInput = document.getElementById("place-input");
  const place = placeConfirmedInput.value;
  const typeSelect = document.getElementById("combo-box-type");
  const type = typeSelect.value;

  const stateSelect = document.getElementById("combo-box-states");
  const stateEvent = stateSelect.value;
  const token = localStorage.getItem("token");
  console.log(token);

  console.log({
    title: title,
    description: description,
    place: place,
    eventType: type,
    eventState: stateEvent,
  });
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

export default CreateAdministrator;
