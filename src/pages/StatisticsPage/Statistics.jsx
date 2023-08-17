import React, { useState, useEffect } from "react";
import { getAllNews, getAllEvents, getStatistics } from "../../js/services/user.js";
import "./statistics.css";

export default function Statistics() {
  const [allNews, setAllNews] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("option1");
  const [searchQuery, setSearchQuery] = useState("");
  const [numberOfAttendees, setNumberOfAttendees] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let respEvents = await getAllEvents();
      await Promise.all(
        respEvents.map(async (event) => {
          const statistics = await getStatistics(event.id);
          event.numberOfAttendees = statistics.numberOfAttendees;
          event.numberOfNews = statistics.numberOfNews;
          event.numberOfActivities = statistics.numberOfActivities;
          event.numberOfPendingActivities =
            statistics.numberOfPendingActivities;
          return event;
        })
      );
      setAllEvents(respEvents);
      setFilteredEvents(respEvents); // Initialize filtered events with all events
    }
    fetchData();
  }, []);

  useEffect(() => {
    // Filter events based on selected event
    if (selectedEvent === "option1") {
      setFilteredEvents(allEvents);
    } else {
      const selectedEventObj = allEvents.find(event => event.id === parseInt(selectedEvent));
      if (selectedEventObj) {
        setFilteredEvents([selectedEventObj]);
      }
    }
  }, [selectedEvent, allEvents]);

  useEffect(() => {
    // Filter events based on search query
    const filtered = allEvents.filter((event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredEvents(filtered);
  }, [searchQuery, allEvents]);

  const handleEventChange = (event) => {
    setSelectedEvent(event.target.value);
  };

  return (
    <>
      <h2>Estadisticas</h2>
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
          placeholder="Buscar por nombre"
        />
      </div>
      <section className>
        <h4>Numero de posibles asistentes</h4>
        <label>{numberOfAttendees}</label>
      </section>
      <div className="scroll-principal">
        <table className="event-table">
          <thead>
            <tr>
              <th>
                <div className="first-colum">Titulo del Evento</div>
              </th>
              <th className="statistics">Numero de Asistentes</th>
              <th className="statistics">Numero de Noticias</th>
              <th className="statistics">Numero de Actividades</th>
              <th className="statistics">Numero de Actividades Pendientes</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.map((event) => (
              <tr key={event.id}>
                <td>
                  <div className="first-colum">{event.title}</div>
                </td>
                <td>{event.numberOfAttendees}</td>
                <td>{event.numberOfNews}</td>
                <td>{event.numberOfActivities}</td>
                <td>{event.numberOfPendingActivities}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
