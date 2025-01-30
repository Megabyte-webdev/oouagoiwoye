import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ element }) => {
  const authToken = Cookies.get("authToken");

  if (!authToken) {
    return <Navigate to="/admin/auth" replace />;
  }

  return element;
};

export default ProtectedRoute;
