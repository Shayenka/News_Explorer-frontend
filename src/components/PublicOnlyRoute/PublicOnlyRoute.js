import React from "react";
import { Navigate } from "react-router-dom";
import useUserContext from "../Hooks/useUserContext";

const PublicOnlyRoute = ({ path, children, ...props }) => {
  const { isLoggedIn } = useUserContext();

  return isLoggedIn ? (
    <Navigate to="/saved-news" />
  ) : (
    <>
    {children}
    </>
  );
};

export default PublicOnlyRoute;