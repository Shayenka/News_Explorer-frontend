import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ loggedIn, component: Component, ...props }) => {
  return (
    <Routes>
      <Route
        {...props}
        element={loggedIn ? <Component {...props} /> : <Navigate to="/signin" />}
      />
    </Routes>
  );
};

export default ProtectedRoute;