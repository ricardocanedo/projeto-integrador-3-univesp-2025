import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';

import './App.css'
import ProtectedPage from './components/ProtectedPage';

function App() {
    return (
      <Router>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/protected" element={<ProtectedPage />} />
          </Routes>
      </Router>
  );
};

export default App
