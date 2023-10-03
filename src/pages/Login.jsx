import React, { useCallback, useEffect, useState } from "react";
import AuthLayout from "../components/layouts/AuthLayout";
import LoginForm from "../components/forms/login/LoginForm";
import api from "../shared/api";
import { useDispatch } from "react-redux";
import { addUser } from "../store/auth/authSlice";
import useToken from "../shared/hooks/useToken";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useLoginSocial } from "../shared/hooks/useLoginSocial";
import GeneralModal from "../components/modals/GeneralModal";
import LoadingCard from "../components/cards/LoadingCard";

function Login() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isUser, setIsUser] = useState(true);
  const { saveToken } = useToken();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const { handleLoginSocial, user, token } = useLoginSocial();
  const [isLoading, setIsLoading] = useState(false);

  const processLogin = useCallback(
    async (values) => {
      console.log("processLogin");
      setIsLoading(true);
      try {
        const { data } = await api.post("/auth/login", values);
        if (data.data.role === (isUser ? "USER" : "TENANT")) {
          dispatch(addUser(data.data));
          saveToken(data.accessToken);
          if (searchParams.get("redirect")) {
            navigate(searchParams.get("redirect"));
            return;
          }
          setIsLoading(false);
          navigate("/");
        } else {
          setIsLoading(false);
          setErrorMessage("You are not allowed, please make sure your role");
        }
      } catch (err) {
        const { message, errors } = err.response?.data || {};
        setErrorMessage(message ? message : errors[0].msg);
        setIsLoading(false);
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
    console.log("loginByGoogle");
    if (user && token) {
      await processLogin({
        email: user.email,
        role: "USER",
        isLoginBySocial: true,
      });
    }
  }, [processLogin, token, user]);

  useEffect(() => {
    console.log("useEffect");

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
      <GeneralModal isOpen={isLoading} closeModal={setIsLoading}>
        <LoadingCard />
      </GeneralModal>
      {errorMessage && (
        <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
      )}
      <LoginForm handleLogin={handleLogin} />
    </AuthLayout>
  );
}

export default Login;
