import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const { isAuthenticate } = useSelector((store) => store.auth);

  if (!isAuthenticate) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default PrivateRoutes;
