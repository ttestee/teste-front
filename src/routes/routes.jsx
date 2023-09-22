import React from "react";
import { Routes, Route } from "react-router-dom"; 

import Home from "../components/Home";
import Desafio1 from "../components/desafio1";

import Desafio2 from "../components/desafio2";

import Desafio3 from "../components/desafio3";


const AppRoutes = () => {
  return (
    <Routes> 
      <Route element={<Home />} path="/" /> 
      <Route element={<Desafio1 />} path="/desafio1" /> 
      <Route element={<Desafio2 />} path="/desafio2" /> 
      <Route element={<Desafio3 />} path="/desafio3" /> 
    </Routes>
  );
};

export default AppRoutes;
