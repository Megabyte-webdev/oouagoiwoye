import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie"; 

const ProtectedRoute = () => {
  const authToken = Cookies.get("authToken");

  console.log("AuthToken:", authToken); 

  if (!authToken) {
    console.log("Redirecting to login...");
    return <Navigate to="/admin/auth" replace />;
  }

  console.log("Rendering protected component...");
  return <Outlet/>;
};

export default ProtectedRoute;
