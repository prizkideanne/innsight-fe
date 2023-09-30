import { Outlet, Navigate } from "react-router-dom";
import useToken from "../hooks/useToken";
import jwtDecode from "jwt-decode";

export const AuthenticatedRoute = ({ roles }) => {
  console.log("load");
  const { token } = useToken();
  const user = token ? jwtDecode(token) : null;

  // Special condition for TENANT accessing the homepage
  if (window.location.pathname === "/" && token && user?.role === "TENANT") {
    return <Navigate to="/" />;
  }

  if (token && roles.includes(user?.role)) {
    return <Outlet />;
  } else {
    console.log("not work", roles.includes(user?.role));
  }

  return <Navigate to="/login" />;
};

export const NonAuthenticatedRoute = () => {
  const { token } = useToken();

  // Allow unauthenticated users to see the homepage
  if (window.location.pathname === "/" && !token) {
    return <Outlet />;
  }

  if (!token) {
    return <Outlet />;
  }

  return <Navigate to="/" />;
};

export const OpenRoute = () => <Outlet />;
