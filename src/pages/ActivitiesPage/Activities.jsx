import "../HomePage/home.css";
import "./activities.css";
import logo from "../../assets/prueba.png";
import plus from "../../assets/plus.png";
import search from "../../assets/search.png";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { getAllActivities, getAllEvents } from "../../js/services/user.js";

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
    let dateWithoutHour = date.split("T")[0];
    let arrayDate = dateWithoutHour.split("-");
    let initialMonth = months[arrayDate[1]];
    return arrayDate[2] + " " + initialMonth;
  }

  function getHour(date, duration) {
    let hour = date.split("T")[1];
    let arrayDate = hour.split(":");
    const fecha = new Date();
    fecha.setHours(arrayDate[0]);
    fecha.setMinutes(arrayDate[1]);
    const addedDate = new Date(fecha.getTime());
    addedDate.setMinutes(fecha.getMinutes() + duration);
    return (
      fecha.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }) +
      "-" +
      addedDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    );
  }

  const [allNews, setAllActivities] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("option1");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredActivities, setFilteredActivities] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const activities = await getAllActivities();
      setAllActivities(activities);
      setFilteredActivities(activities);
      setAllEvents(await getAllEvents());
    }

    fetchData();
  }, []);

  const handleSearch = () => {
    const filtered = allNews.filter((activity) =>
      activity.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredActivities(filtered);
  };

  const handleEventChange = (event) => {
    const selected = event.target.value;
    setSelectedEvent(selected);

    if (selected === "option1") {
      setFilteredActivities(allNews);
    } else {
      const filtered = allNews.filter(
        (activity) => {
          console.log(activity.idEvent +" "+ selected)
          return activity.idevent == selected}
      );
      setFilteredActivities(filtered);
    }
  };

  return (
    <>
      <h2>Actividades</h2>
      <div className="search">
        <select value={selectedEvent} onChange={handleEventChange}>
          <option value="option1">Ninguno</option>
          {allEvents.map((item, index) => (
            <option value={item.id} key={index}>
              {item.title}
            </option>
          ))}
        </select>
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button id="search-button" onClick={handleSearch}>
          <label>Buscar</label>
          <img src={search} alt="Search" />
        </button>
      </div>
      <section className="grid-container">
        {filteredActivities.map((item, index) => (
          <Link
            to="/user/create-activities"
            state={item}
            className="grid-itema"
            key={index}
          >
            <label className="date-style">{changeDate(item.date)}</label>
            <label className="title-style">{item.title}</label>
            <label className="hour-style">
              {getHour(item.date, item.duration)}
            </label>
          </Link>
        ))}
        <Link to="/user/create-activities">
          <button id="create-event-button">
            <label>Crear publicación</label>
            <img src={plus} alt="Create Publication" />
          </button>
        </Link>
      </section>
    </>
  );
}

export default Activities;
