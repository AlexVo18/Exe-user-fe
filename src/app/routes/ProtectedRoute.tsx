import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import Loading from "../pages/loadingPage/Loading";
interface Props {
  allowedRoles: number[];
}

const ProtectedRoute = ({ allowedRoles }: Props) => {
  const { userInfo, userLoading } = useContext(AuthContext);

  if (userLoading) {
    // Loading
    return <Loading />;
  }
  if (!userInfo) {
    // Chưa đăng nhập chuyển đến trang login
    return <Navigate to="/login" replace />;
  }
  console.log(allowedRoles)
  console.log(allowedRoles.includes(userInfo.roleID));
  // Check role
  if (!allowedRoles.includes(userInfo.roleID)) {
    // Chuyển đến trang error
    return <Navigate to="/error" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
