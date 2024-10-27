/* eslint-disable react/prop-types */
import { useContext } from "react";
import { tempObject } from "../main";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const { isAuthenticated } = useContext(tempObject.Context);

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoutes;
