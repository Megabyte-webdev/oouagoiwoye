import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";


const ProtectedRoute = ({ element }) => {
  const authToken = Cookies.get("authToken");
  console.log("Auth Token:", authToken);

  if (!authToken) {
    return <Navigate to="/admin/auth" replace />;
  }

  return <Outlet />;;
};

export default ProtectedRoute;
