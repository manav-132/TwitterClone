import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import Login from './pages/login/Login'
import Home from './pages/home/Home'
import Register from './pages/register/Register'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate 
} from "react-router-dom";
import { useContext } from "react";
import { Authcontext } from "./context/authcontext";

function App() {

  const { user } = useContext(Authcontext);
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={user ? <Home /> : <Navigate to="/register" />} 
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        {/* <Route path="/profile/:username" element={<Profile />} /> */}
      </Routes>
    </Router>
  )
}

export default App
