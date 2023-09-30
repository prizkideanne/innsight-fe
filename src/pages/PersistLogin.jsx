import { Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../shared/context/AuthContext";
import api from "../shared/api";
import { useDispatch } from "react-redux";
import { addUser, logout } from "../store/auth/authSlice";
import useToken from "../shared/hooks/useToken";

const PersistLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, login, persist } = useAuth();
  const { removeToken } = useToken();

  useEffect(() => {
    let isMounted = true;

    const verifyStoredToken = async () => {
      const storedToken = localStorage.getItem("token");

      if (storedToken && persist) {
        login(storedToken); // Assuming this might be an async operation, you can await it
      }

      if (isMounted) {
        setIsLoading(false);
      }
    };

    if (!isAuthenticated && persist) {
      verifyStoredToken();
    } else {
      setIsLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, persist, login]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await api.get("/auth/keep-login");
        dispatch(addUser(res.data.data));
      } catch (err) {
        console.log("keep login err", err);
        dispatch(logout());
        removeToken();
        navigate("/login");
      }
    };

    if (isAuthenticated && !isLoading) {
      fetchUserData();
    }
  }, [isLoading, isAuthenticated, dispatch, navigate, removeToken]);

  return (
    <>{!persist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />}</>
  );
};

export default PersistLogin;
