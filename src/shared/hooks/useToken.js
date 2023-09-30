import { useState } from "react";

const useToken = () => {
  const initialToken = () => window.localStorage.getItem("token");

  const [token, setTokenState] = useState(initialToken);

  const saveToken = (tokenValue) => {
    window.localStorage.setItem("token", tokenValue);
    setTokenState(tokenValue);
  };

  const removeToken = () => {
    window.localStorage.removeItem("token");
    setTokenState(null);
  };

  return {
    token,
    saveToken,
    removeToken,
  };
};

export default useToken;
