import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const Adminauth = ({ children }) => {
  const user = useSelector((state) => state.user.user);
  const location = useLocation();
  if (user.role !== "Admin") {
    return <Navigate to="/signin" state={{ path: location.pathname }} />;
  }
  return <>{children}</>;
};

export default Adminauth;
