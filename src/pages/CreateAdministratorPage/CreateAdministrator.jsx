import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import {
  createAdmin,
  deleteAdmin,
  updateAdmin,
  getAllEmails,
  getAdminByEmail,
  getAllEventsBasic,
  getRelatedEvents,
} from "../../js/services/user.js";
import "./createAdministrator.css";
import search from "../../assets/search.png";
import { Link } from "react-router-dom";

function CreateAdministrator() {
  const [state, setState] = useState();
  const [levelDisabled, setLevelDisabled] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [eventsList, setEventsList] = useState([]);
  const [relatedEvents, setRelatedEvents] = useState([]);

  useEffect(() => {
    getAllEmails().then((emailList) => {
      setEmails(emailList);
      setLevelDisabled(
        emailList.length == 1 ? true : false
      );
    });

    return () => {
      setPreviewImage(
        state
          ? state.photo
          : "https://res.cloudinary.com/dntd2pmgs/image/upload/v1692054291/elk91xyyn4ebvrrcaqlm.jpg"
      );
    };
  }, []);

  console.log(state);

  const preset_key = "r5yvbaa0";
  const cloud_name = "dntd2pmgs";
  const [image, setImage] = useState();
  const [emails, setEmails] = useState([]);
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
    getAllEventsBasic()
      .then((res) => res)
      .then((response) => {
        setEventsList(response);
      })
      .catch((err) => console.log(err));
  }, []);

  function searchAdmin() {
    getRelatedEvents(document.getElementById("combo-box-emails").value).then(
      (events) => {
        setSelectedRows(events);
        console.log(events);
      }
    );
    
    
    console.log("aaaaaaaaaaaaaaaa")
    console.log(document.getElementById("combo-box-emails").value)

    getAdminByEmail(document.getElementById("combo-box-emails").value).then(
      (admin) => {
        setState(admin);

    
        
        setPreviewImage(admin[2]);
        var comboBox = document.getElementById("combo-box-level");
        comboBox.value = admin[3];
      }
    );
  }
  const [selectedRows, setSelectedRows] = useState([]);

  const toggleRowSelection = (eventId) => {
    console.log(eventId);
    if (selectedRows.includes(eventId)) {
      setSelectedRows(selectedRows.filter((id) => id !== eventId));
    } else {
      setSelectedRows([...selectedRows, eventId]);
    }

    console.log(selectedRows);
  };

  const isRowSelected = (eventId) => {
    return selectedRows.includes(eventId);
  };

  return (
    <div className="create-event-page">
      <h2>Modificar/Agregar Administrador</h2>
      <div className="search">
        <select id="combo-box-emails" defaultValue={""}>
          {emails.map((email, index) => (
            <option key={index} value={email}>
              {email}
            </option>
          ))}
        </select>
        <button id="search-button" onClick={searchAdmin}>
          <label>Buscar</label>
          <img src={search} alt="Search" />
        </button>
      </div>
      <label>Nombre Completo*</label>
      <input id="name-input" defaultValue={state ? state[0] : ""} />
      <label>Correo*</label>
      <input id="email-input" defaultValue={state ? state[1] : ""} />
      <div className="both-sides">
        <div className="side-left">
          <label>Imagen</label>
          <input className="input-file" type="file" accept=".png, .jpg" onChange={handleFile}></input>
          {previewImage && <img src={previewImage} />}
          <label>Nivel*</label>
          <select
            id="combo-box-level"
            defaultValue={state ? state[3] : ""}
            disabled={levelDisabled}
          >
            <option value="level-1">level-1</option>
            <option value="level-2">level-2</option>
          </select>
        </div>
        <div className="side-right">
          <label>Eventos*</label>
          <div className="scroll-principal">
            <table className="event-table">
              <thead>
                <tr>
                  <th>
                    <div className="first-colum">ID</div>
                  </th>
                  <th>Nombre</th>
                </tr>
              </thead>
              <tbody>
                {eventsList.map((event) => (
                  <tr
                    key={event.id}
                    onClick={() => toggleRowSelection(event.id)}
                    className={
                      selectedRows.includes(event.id) ? "isSelected" : ""
                    }
                  >
                    <td>
                      <div className="first-colum">{event.id}</div>
                    </td>
                    <td>{event.title}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="event-buttons">
        <Link to="/user/">
          <button
            onClick={(e) => {
              //e.preventDefault();
              deleteAdmin(state[1]);
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
              createAdmin,
              updateAdmin,
              previewImage,
              state,
              selectedRows
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
  createAdmin,
  updateAdmin,
  previewImage,
  state,
  selectedRows
) {
  const nameInput = document.getElementById("name-input");
  const name = nameInput.value;
  const emailInput = document.getElementById("email-input");
  const email = emailInput.value;
  const levelSelect = document.getElementById("combo-box-level");
  const level = levelSelect.value;

  const token = localStorage.getItem("token");
  console.log(token);

  console.log({
    name: name,
    email: email,
  });
  if (state) {
    updateAdmin({
      id: state[4],
      name: name,
      email: email,
      photo: previewImage,
      level: level,
      relatedEvents: selectedRows,
    });
  } else {
    console.log("crearrrrrrrrrrrr" + level);
    createAdmin({
      name: name,
      email: email,
      photo: previewImage,
      level: level,
      relatedEvents: selectedRows,
    });
  }
}

export default CreateAdministrator;
