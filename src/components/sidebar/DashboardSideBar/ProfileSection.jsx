import React from "react";
import useToken from "../../../shared/hooks/useToken";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/auth/authSlice";

function ProfileSection() {
  const navigate = useNavigate("/");
  const { removeToken } = useToken();
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
    removeToken();
    navigate("/login");
  };
  return (
    <div className="fixed lg:top-[92vh] lg:left-6 right-0 top-0 w-fit h-14 max-w-sm p-2">
      <div className="flex relative justify-end items-center lg:items-end lg:justify-start h-full">
        <button onClick={onLogout} className="text-white underline px-5 py-2">
          Logout
        </button>
      </div>
    </div>
  );
}

export default ProfileSection;
