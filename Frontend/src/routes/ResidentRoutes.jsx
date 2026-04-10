import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ResidentRoutes = ({ children }) => {
  const { role } = useSelector((store) => store.auth.user);

  if (role === "security") {
    return <Navigate to="/visitortracking" />;
  }

  if (role === "admin") {
    return <Navigate to="/admin/dashboard" />;
  }

  return <>{children}</>;
};

export default ResidentRoutes;
