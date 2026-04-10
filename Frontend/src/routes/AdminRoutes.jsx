import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminRoutes = ({ children }) => {
  const { role } = useSelector((store) => store.auth.user);

  if (role === "security") {
    return <Navigate to="/visitortracking" />;
  } else if (role === "resident") {
    return <Navigate to="/resident/dashboard" />;
  }

  return <>{children}</>;
};

export default AdminRoutes;
