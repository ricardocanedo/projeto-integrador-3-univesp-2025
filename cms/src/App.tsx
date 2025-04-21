import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import ProtectedPage from './components/ProtectedPage';
import Dashboard from './components/Dashboard';
import Posts from './components/Posts';
import ProtectedRoute from './components/ProtectedRoute';

import './App.css'

function App() {
    return (
      <Router>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route
                  path="/protected"
                  element={
                      <ProtectedRoute>
                          <ProtectedPage />
                      </ProtectedRoute>
                  }
              />
              <Route
                  path="/dashboard"
                  element={
                      <ProtectedRoute>
                          <Dashboard />
                      </ProtectedRoute>
                  }
              />
              <Route
                  path="/posts"
                  element={
                      <ProtectedRoute>
                          <Posts />
                      </ProtectedRoute>
                  }
              />
          </Routes>
      </Router>
  );
};

export default App
