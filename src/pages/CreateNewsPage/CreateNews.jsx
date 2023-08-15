import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getAllEvents } from "../../js/services/user.js";
import {
  createNews,
  deleteNews,
  updateNews,
} from "../../js/services/user.js";
import { Link } from "react-router-dom";
import axios from "axios";
import TextEditor from "./components/TextEditor";

export default function CreateNews() {
  const [content, setContent] = useState("");

  const getContent = (value) => {
    setContent(value);
  };
  useEffect(() => {
    console.log(content);
  }, [content]);

  const [editorValue, setEditorValue] = useState("");

  const handleEditorChange = (value) => {
    setEditorValue(value);
    console.log(value);
  };

  const handleGetJSONContent = () => {
    console.log(editorValue);
  };

  const { state } = useLocation();
  const preset_key = "r5yvbaa0";
  const cloud_name = "dntd2pmgs";

  const [allEvents, setAllEvents] = useState([]);
  useEffect(() => {
    const fetchAllEvents = async () => {
      const events = await getAllEvents();
      setAllEvents(events);
    };

    fetchAllEvents();
  }, []);

  const [previewImage, setPreviewImage] = useState(null);
  useEffect(() => {
    setPreviewImage(
      state
        ? state.previewPhoto
        : "https://res.cloudinary.com/dntd2pmgs/image/upload/v1692054291/elk91xyyn4ebvrrcaqlm.jpg"
    );
  }, [state]);

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

  useEffect(() => {
    if (state) {
      const selectElement = document.getElementById("combo-box-event");
      if (selectElement) {
        const options = selectElement.getElementsByTagName("option");

        for (let i = 0; i < options.length; i++) {
          console.log(options[i].value);
          if (state.event == options[i].value) {
            console.log("entraaq");
            options[i].selected = true;
          }
        }
      }
    }
  }, [allEvents]);

  function confirmDataCreateOrUpdate(
    createNews,
    updateNews,
    previewImage,
    state
  ) {
    const titleInput = document.getElementById("title-news-input");
    const title = titleInput.value.trim();
    const descriptionInput = document.getElementById("description-news-input");
    const description = descriptionInput.value.trim();

    const eventSelect = document.getElementById("combo-box-event");
    const event = eventSelect.value;

    if (!title|| title.length<3) {
      titleInput.setCustomValidity("El título es obligatorio");
      titleInput.reportValidity();
      return;
    }

    if (!description) {
      descriptionInput.setCustomValidity("La descripción es obligatoria");
      descriptionInput.reportValidity();
      return;
    }

    if (!event||event=="option1") {
      eventSelect.setCustomValidity("El evento relacionado es obligatorio");
      eventSelect.reportValidity();
      return;
    }

    if (state) {
      console.log(content);
      updateNews({
        id: state.id,
        title: title,
        description: description,
        content: content,
        event: event,
        previewPhoto: previewImage,
      });
    } else {
      createNews({
        title: title,
        description: description,
        content: content,
        event: event,
        previewPhoto: previewImage,
      });
    }
  }

  return (
    <div className="create-event-page">
      <h2>Modificar/Crear publicación</h2>
      <label>Titulo*</label>
      <input
        id="title-news-input"
        defaultValue={state ? state.title : ""}
        maxLength={140}
        required
      />
      <label>Descripción*</label>
      <input
        id="description-news-input"
        defaultValue={state ? state.description : ""}
        maxLength={150}
        required
      />
      <label>Contenido*</label>
      <TextEditor initialValue={state? state.content:""} setContent={getContent} onChange={handleEditorChange} />

      <div className="both-sides">
        <div className="side-left">
          <label>Imagen</label>
          <input className="input-file" type="file" accept=".png, .jpg" onChange={handleFile} required />
          {previewImage && <img src={previewImage} />}
        </div>
        <div className="side-right">
          <label>Evento relacionado*</label>
          <select id="combo-box-event" required>
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
        <Link to="/user/news">
          <button
            className="modify-button delete-button"
            onClick={() => {
              deleteNews(state.id);
            }}
          >
            Eliminar
          </button>
        </Link>
        <button
          className="modify-button"
          onClick={(e) => {
            confirmDataCreateOrUpdate(
              createNews,
              updateNews,
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
