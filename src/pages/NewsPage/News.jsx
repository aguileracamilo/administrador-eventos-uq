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
  useEffect(() => {
    return async () => {
      setAllEvents(await getAllEvents());
      setAllNews(await getAllNews());
    };
  }, []);

  return (
    <>
      <h2>Noticias</h2>
      <div className="search">
        <select>
          <option value="option1">Ninguno</option>
          {allEvents.map((item, index) => (
            <option value="option2" key={index}>
              {item.title}
            </option>
          ))}
        </select>
        <input />
        <button id="search-button">
          <label>Buscar</label>
          <img src={search}></img>
        </button>
      </div>
      <section className="grid-container">
        {allNews.map((item, index) => (
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
            <img src={plus} />
          </button>
        </Link>
      </section>
    </>
  );
}
