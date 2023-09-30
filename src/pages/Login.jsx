import React, { useCallback, useEffect, useState } from "react";
import AuthLayout from "../components/layouts/AuthLayout";
import LoginForm from "../components/forms/login/LoginForm";
import api from "../shared/api";
import { useDispatch } from "react-redux";
import { addUser } from "../store/auth/authSlice";
import useToken from "../shared/hooks/useToken";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useLoginSocial } from "../shared/hooks/useLoginSocial";

function Login() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isUser, setIsUser] = useState(true);
  const { saveToken } = useToken();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const { handleLoginSocial, user, token } = useLoginSocial();

  const processLogin = useCallback(
    async (values) => {
      try {
        const { data } = await api.post("/auth/login", values);
        if (data.data.role === (isUser ? "USER" : "TENANT")) {
          dispatch(addUser(data.data));
          saveToken(data.accessToken);
          if (searchParams.get("redirect")) {
            navigate(searchParams.get("redirect"));
            return;
          }
          navigate("/");
        } else {
          setErrorMessage("You are not allowed, please make sure your role");
        }
      } catch (err) {
        const { message, errors } = err.response?.data || {};
        setErrorMessage(message ? message : errors[0].msg);
      }
    },
    [dispatch, isUser, navigate, saveToken, searchParams]
  );

  const handleLogin = (values) => {
    setErrorMessage("");
    processLogin({
      ...values,
      role: isUser ? "USER" : "TENANT",
    });
  };

  const loginByGoogle = useCallback(async () => {
    if (user && token) {
      processLogin({
        email: user.email,
        role: "USER",
        isLoginBySocial: true,
      });
    }
  }, [processLogin, token, user]);

  useEffect(() => {
    if (user && token) {
      loginByGoogle();
    }
  }, [loginByGoogle, user, token]);

  return (
    <AuthLayout
      page="login"
      isUser={isUser}
      setIsUser={setIsUser}
      title={isUser ? "Start your journey!" : "Let's manage your properties!"}
      handleLoginSocial={handleLoginSocial}
    >
      {errorMessage && (
        <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
      )}
      <LoginForm handleLogin={handleLogin} />
    </AuthLayout>
  );
}

export default Login;
