import React from "react";
import { Navigate } from "react-router-dom";

/**
 * Protects routes that require authentication
 * If no token → redirect to login
 */
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
