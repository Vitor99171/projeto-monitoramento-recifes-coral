// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import SpeciesIdentification from './components/SpeciesIdentification';
import EnvironmentalDegradation from './components/EnvironmentalDegradation';
import './App.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/species-identification">Identificação de Espécies</Link></li>
        <li><Link to="/environmental-degradation">Degradação Ambiental</Link></li>
      </ul>
    </nav>
  );
};

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/species-identification" element={<SpeciesIdentification />} />
          <Route path="/environmental-degradation" element={<EnvironmentalDegradation />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
