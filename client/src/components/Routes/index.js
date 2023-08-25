import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Dashboard from "../../pages/Dashboard";
import Profil from "../../pages/Profil";
import Trending from "../../pages/Trending";
import Navbar from "../Navbar/Navbar";
import Informations from "../../pages/Informations";

const theRoutes = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/comments/:id" element={<Informations />} />
        <Route path="/profile" element={<Profil />} />
        <Route path="/trending" element={<Trending />} />
      </Routes>
    </Router>
  );
};

export default theRoutes;
