import React from "react"; // Import React
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const user = useSelector((state) => state.user.user);
  const location = useLocation();
  if (!user) {
    return <Navigate to="/signin" state={{ path: location.pathname }} />;
  }
  return <>{children}</>;
};

export default RequireAuth;
