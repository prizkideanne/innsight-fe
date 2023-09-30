import { createContext, useContext, useEffect, useState } from "react";
import useToken from "../hooks/useToken";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const { token, saveToken, removeToken } = useToken();
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [persist, setPersist] = useState(
    JSON.parse(localStorage.getItem("persist") || false)
  );

  // Initialize persistence on mount
  useEffect(() => {
    if (persist && token) {
      localStorage.setItem("token", token);
    }
  }, [persist, token]);

  const login = (token) => {
    saveToken(token);
    setIsAuthenticated(true);
    if (persist) {
      localStorage.setItem("token", token);
    }
  };

  const logout = () => {
    removeToken();
    setIsAuthenticated(false);
    if (persist) {
      localStorage.removeItem("token");
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, persist, setPersist, token }}
    >
      {children}
    </AuthContext.Provider>
  );
};
