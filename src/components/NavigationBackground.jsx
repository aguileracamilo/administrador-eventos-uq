import MenuBar from "./MenuBar";
import "../pages/HomePage/home.css";
import Home from "../pages/HomePage/Home";
import React, { useState, useEffect } from "react";
import News from "../pages/NewsPage/News";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Activities from "../pages/ActivitiesPage/Activities";
import CreateEvent from "../pages/CreateEventPage/CreateEvent";
import CreateNews from "../pages/CreateNewsPage/CreateNews";
import CreateAdministrator from "../pages/CreateAdministratorPage/CreateAdministrator";
import CreateActivities from "../pages/CreateActivitiesPage/CreateActivities";
import { useLocation } from "react-router-dom";
import Statistics from "../pages/StatisticsPage/Statistics";

function NavigationBackground() {
  /*
  const location = useLocation();
  const state = location.state;
  */

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (window.matchMedia("(max-width: 767px)").matches) {
      var elements = document.querySelectorAll(".ql-picker-label, .ql-picker");
      if (!isOpen) {
        elements.forEach(function (element) {
          element.style.position = "static";
        });
      } else {
        elements.forEach(function (element) {
          element.style.position = "relative";
        });
      }
    }
    setIsOpen(!isOpen);
  };
  function changeQuill() {
    if (window.matchMedia("(max-width: 767px)").matches) {
    } else {
      var elements = document.querySelectorAll(".ql-picker-label, .ql-picker");

      elements.forEach(function (element) {
        element.style.position = "relative";
      });
    }
  }
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const handleMediaQueryChange = (event) => {
      if (event.matches != isMobile) {
        changeQuill();
      }
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
              <Route
                path="create-administrator"
                element={<CreateAdministrator />}
              />
              <Route path="create-event" element={<CreateEvent />} />
              <Route path="create-news" element={<CreateNews />} />
              <Route path="create-activities" element={<CreateActivities />} />
              <Route path="statistic" element={<Statistics />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavigationBackground;
