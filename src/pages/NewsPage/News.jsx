import "../HomePage/home.css";
import logo from "../../assets/prueba.png";
import plus from "../../assets/plus.png";
import search from "../../assets/search.png";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { getAllNews, getAllEvents } from "../../js/services/user.js";

export default function News() {
  const [allNews, setAllNews] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("option1");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredNews, setFilteredNews] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const news = await getAllNews();
      setAllNews(news);
      setFilteredNews(news);
      setAllEvents(await getAllEvents());
    }

    fetchData();
  }, []);

  const handleSearch = () => {
    const filtered = allNews.filter((news) =>
      news.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredNews(filtered);
  };

  const handleEventChange = (event) => {
    const selected = event.target.value;
    console.log(selected)
    setSelectedEvent(selected);

    if (selected === "option1") {
      setFilteredNews(allNews);
    } else {
      const filtered = allNews.filter((news) => {
  
        return news.event == selected});
      setFilteredNews(filtered);
    }
  };

  return (
    <>
      <h2>Noticias</h2>
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
        {filteredNews.map((item, index) => (
          <Link
            to="/user/create-news"
            state={item}
            className="grid-item"
            key={index}
          >
            <img src={item.previewPhoto} alt="Logo" />
            <label>{item.title}</label>
          </Link>
        ))}
        <Link to="/user/create-news">
          <button id="create-event-button">
            <label>Crear noticia</label>
            <img src={plus} alt="Create News" />
          </button>
        </Link>
      </section>
    </>
  );
}
