import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
  path,
  component: Component,
  isLoggedIn,
  ...props
}) => {
  return isLoggedIn ? (
    <Component isLoggedIn={isLoggedIn} {...props} />
  ) : (
    <Navigate to="/signin" />
  );
};

export default ProtectedRoute;
