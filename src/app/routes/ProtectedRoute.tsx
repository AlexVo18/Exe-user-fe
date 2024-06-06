import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Loading from "../pages/loadingPage/Loading";
interface Props {
  allowedRoles: number[];
}

const ProtectedRoute = ({ allowedRoles }: Props) => {
  const { userInfo, userLoading } = useContext(AuthContext);
  const currentUrl = useLocation();

  if (userLoading) {
    // Loading
    return <Loading />;
  }
  if (!userInfo) {
    // Chưa đăng nhập chuyển đến trang login
    return <Navigate to="/login" replace />;
  }

  // Check role
  if (!allowedRoles.includes(userInfo.roleID)) {
    // Chuyển đến trang error
    return <Navigate to="/error" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
