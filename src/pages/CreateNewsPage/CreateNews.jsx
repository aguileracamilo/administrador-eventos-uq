import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { getAllEvents } from "../../js/services/user.js";
import { createNews } from "../../js/services/user.js";
import axios from "axios";
import events from "../../js/utils/eventData.js";

export default function CreateNews() {
  const { state } = useLocation();
  const preset_key = "r5yvbaa0";
  const cloud_name = "dntd2pmgs";

  const [allEvents, setAllEvents] = useState([]);
  useEffect(() => {
    return async () => {
      setAllEvents(await getAllEvents());
    };
  }, []);
  const [previewImage, setPreviewImage] = useState(null);
  useEffect(() => {
    return () => {
      setPreviewImage(
        state
          ? state.previewPhoto
          : "https://w7.pngwing.com/pngs/388/487/png-transparent-computer-icons-graphy-img-landscape-graphy-icon-miscellaneous-angle-text.png"
      );
    };
  }, []);

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
      <h2>Modificar/Crear publicación</h2>
      <label>Titulo*</label>
      <input id="title-news-input" defaultValue={state ? state.title : ""} />
      <label>Descripción*</label>
      <input id="description-news-input" defaultValue={state ? state.description : ""} />
      <label>contenido*</label>
      <textarea rows="8" cols="50" />
      <div className="both-sides">
        <div className="side-left">
          <label>Imagen</label>
          <input type="file" onChange={handleFile} />
          {previewImage && <img src={previewImage} />}
        </div>
        <div className="side-right">
          <label>Evento relacionado*</label>
          <select id="combo-box-event">
            <option value="option1">Ninguno</option>
            {allEvents.map((item, index) => (
              <option value={item.id} key={index}>
                {item.title}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="event-buttons">
        <button className="modify-button">Visualizar</button>
        <button
          className="modify-button"
          onClick={(e) => {
            confirmDataCreate(createNews, previewImage);
          }}
        >
          Guardar
        </button>
      </div>
    </div>
  );
}

function confirmDataCreate(createNews, previewImage) {
  const titleInput = document.getElementById("title-news-input");
  const title = titleInput.value;
  const descriptionInput = document.getElementById("description-news-input");
  const description = descriptionInput.value;

  const eventSelect = document.getElementById("combo-box-event");
  const event = eventSelect.value;

  const token = localStorage.getItem("token");
  console.log(token);

  console.log({
    title: title,
    description: description,
    content: "",
    event: event,
    previewPhoto: previewImage,

  });
  createNews({
    title: title,
    description: description,
    content: "",
    event: event,
    previewPhoto: previewImage,
  });
}
