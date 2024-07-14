import { useContext } from "react";
import { authContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowRoles }) => {
  const { token, role } = useContext(authContext);
  console.log(role);
  const isAllowed = allowRoles.includes(role);
  const accessibleRoute = token ? (
    children
  ) : (
    <Navigate to="/login" replace={true} />
  );

  ///! ที่จริงต้องใช้อันล่าง
  //   const accessibleRoute =
  //     token && isAllowed ? children : <Navigate to="/login" replace={true} />;

  return accessibleRoute;
};

export default ProtectedRoute;
