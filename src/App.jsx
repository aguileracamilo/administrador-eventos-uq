import { useState } from "react";
import "./App.css";
import User from "./components/NavigationBackground";
import Login from "./pages/LoginPage/Login";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user/*" element={<User />} />
      </Routes>
    </Router>
  );
}

export default App;
