import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import ProtectedPage from './components/ProtectedPage';
import Dashboard from './components/Dashboard';
import Posts from './components/Posts';
import EditPost from './components/EditPost';
import ProtectedRoute from './components/ProtectedRoute';
import CreatePost from './components/CreatePost';

import './App.css'

function App() {
    return (
      <Router basename="/cms">
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
              <Route
                  path="/posts/create"
                  element={
                      <ProtectedRoute>
                          <CreatePost />
                      </ProtectedRoute>
                  }
              />
              <Route
                  path="/posts/edit/:id"
                  element={
                      <ProtectedRoute>
                          <EditPost />
                      </ProtectedRoute>
                  }
              />
          </Routes>
      </Router>
  );
};

export default App
