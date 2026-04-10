import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const SecurityRoutes = ({ children }) => {
  const { role } = useSelector((store) => store.auth.user);

  if (role === "admin") {
    return <Navigate to="/admin/dashboard" />;
  }

  if (role === "resident") {
    return <Navigate to="/resident/dashboard" />;
  }

  return <>{children}</>;
};

export default SecurityRoutes;
