import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import ApplyDoctor from "./pages/ApplyDoctor";


const Dashboard = () => {

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div>
      <a href="/apply-doctor">Apply as Doctor</a>

      <h2>Welcome to Dashboard (Protected)</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
            
          }
          
        />
        <Route
  path="/apply-doctor"
  element={
    <ProtectedRoute>
      <ApplyDoctor />
    </ProtectedRoute>
  }
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
