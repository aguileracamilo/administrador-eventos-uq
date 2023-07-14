import MenuBar from "./MenuBar";
import "../pages/HomePage/home.css";
import Home from "../pages/HomePage/Home";
import React, { useState, useEffect } from "react";
import News from "../pages/NewsPage/News";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Activities from "../pages/ActivitiesPage/Activities";
import CreateEvent from "../pages/CreateEventPage/CreateEvent";
import CreateNews from "../pages/CreateNewsPage/CreateNews";
import CreateActivities from "../pages/CreateActivitiesPage/CreateActivities";
import { useLocation } from "react-router-dom";

function NavigationBackground() {
  /*
  const location = useLocation();
  const state = location.state;
  */

  const [isOpen, setIsOpen] = useState(true);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };
    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);
  return (
    <div className="main-container">
      <div className="appbar">
        <button onClick={handleClick}>☰</button>
        <div>Inicio</div>
      </div>
      <div className="container">
        <div
          className={`slide-in ${
            !isMobile || (isMobile && isOpen) ? "open" : ""
          }`}
        >
          {/*isOpen && <MenuBar  />*/}
          <MenuBar />
          <div id="screen" onClick={handleClick}></div>
        </div>
        <div className="content">
          <div className="border">
            <Routes>
              <Route path="" element={<Home />} />
              <Route path="news" element={<News />} />
              <Route path="activities" element={<Activities />} />
              <Route path="create-event" element={<CreateEvent />} />
              <Route path="create-news" element={<CreateNews />} />
              <Route path="create-activities" element={<CreateActivities />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavigationBackground;
