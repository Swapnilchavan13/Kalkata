import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContex";

function ProtectedRoute({ element }) {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? element : <Navigate to="/login" />;
}

export default ProtectedRoute;
