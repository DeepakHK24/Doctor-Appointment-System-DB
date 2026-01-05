// src/pages/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handles input fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit login request
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data } = await api.post("/auth/login", formData);

      // Save token
      localStorage.setItem("token", data.token);

      // Redirect based on role
      if (data.user.role === "patient") navigate("/patient");
      else if (data.user.role === "doctor") navigate("/doctor");
      else if (data.user.role === "admin") navigate("/admin");
      else navigate("/");

    } catch (err) {
      console.log(err);
      setError(err?.response?.data?.message || "Login failed");
    }

    setLoading(false);
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>

      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {error && <p className="error-msg">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="switch-auth">
        Don't have an account? <a href="/register">Register</a>
      </p>
    </div>
  );
};

export default Login;
