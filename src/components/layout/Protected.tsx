import { isAuthenticated, isTokenExpired } from "@/lib/helpers";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const location = useLocation();

  console.log(isTokenExpired(localStorage.getItem("access") || ""));

  if (!isAuthenticated() || isTokenExpired(localStorage.getItem("access") || "")) {
    return (
      <Navigate to="/" state={{ from: location.pathname }} replace={true} />
    );
  }
  return <Outlet />;
};

export default ProtectedRoute;
