import jwtDecode from "jwt-decode";
import Home from "../../pages/Home";
import PropertyList from "../../pages/tenant/property/PropertyList";
import useToken from "../hooks/useToken";
import { useSelector } from "react-redux";

const HomeOrDashboard = () => {
  const { token } = useToken();
  let user = null;

  // Only decode if token exists
  if (token) {
    try {
      user = jwtDecode(token);
    } catch (e) {
      console.error("Invalid token", e);
      return <Home />; // or you can handle it in some other way
    }
  }

  // If not authenticated, show Home to guests.
  if (!token || !user) return <Home />;
  if (user?.role === "USER") return <Home />;
  if (user?.role === "TENANT") return <PropertyList />;

  // Default fallback to Home if role doesn't match any conditions
  return <Home />;
};

export default HomeOrDashboard;
