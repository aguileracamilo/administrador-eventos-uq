import MenuBar from "../../components/MenuBar";
import "./home.css";
import logo from "../../assets/prueba.png";
import plus from "../../assets/plus.png";
import search from "../../assets/search.png";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllEvents } from "../../js/services/user.js";

function Home() {
  const [allEvents, setAllEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      const events = await getAllEvents();
      setAllEvents(events);
      setFilteredEvents(events);
    }

    fetchEvents();
  }, []);

  const handleSearch = () => {
    const filtered = allEvents.filter((event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredEvents(filtered);
  };

  return (
    <>
      <h2>Eventos Activos</h2>
      <div className="search">
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
        {filteredEvents.map((item, index) => (
          <Link
            to="/user/create-event"
            state={item}
            className="grid-item"
            key={index}
          >
            <img src={item.photo} alt="Logo" />
            <label>{item.title}</label>
          </Link>
        ))}

        <Link to="/user/create-event">
          <button id="create-event-button">
            <label>Crear un evento</label>
            <img src={plus} alt="Create Event" />
          </button>
        </Link>
      </section>
    </>
  );
}

export default Home;
