import React, { Fragment } from "react";
import ButtonWithLogo from "../buttons/ButtonWithLogo";
import { KeyIcon, UserIcon, ClipboardIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import useToken from "../../shared/hooks/useToken";
import { Menu, Transition } from "@headlessui/react";
import { TbDoorExit } from "react-icons/tb";
import { useSelector } from "react-redux";
import { auth } from "../../firebase/firebase";

const MenuItem = ({ onClick, icon, label, isDisable = false }) => (
  <Menu.Item>
    <button
      disabled={isDisable}
      onClick={onClick}
      className={`group flex w-full items-center rounded-md px-2 py-2 text-sm focus:outline-none 
      ${
        isDisable
          ? "disabled:text-gray-400 disabled:cursor-not-allowed"
          : "hover:bg-gray-100"
      }`}
    >
      <span className="mr-2 h-5 w-5 group-hover:text-primary group-disabled:text-gray-400">
        {icon}
      </span>
      <span className="group-hover:text-primary group-disabled:text-gray-400">
        {label}
      </span>
    </button>
  </Menu.Item>
);

const NavBar = () => {
  const currentUser = auth.currentUser;
  const { token, removeToken } = useToken();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  /*
   * 1. check if user photoProfile exist, if not return user?.photoProfile because we store default image there
   * 2. if exist, check if the url contains googleusercontent. to determine if the photo is from google data or not.
   * 3. if contain googleusercontent, return the url as it is with user?.photoProfile
   * 4. if not, it means the image is from our backend hence we need to add process.env.REACT_APP_API_BASE_URL.
   */
  const imageUrl =
    user?.photoProfile ??
    "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg";

  const logout = async () => {
    if (currentUser) {
      await auth.signOut();
    }
    removeToken();
    navigate("/", {
      replace: true,
    });
  };

  const navigateTo = (route) => () => navigate(route);

  return (
    <div className="sticky z-30 bg-white border-b md:mb-10 border-gray-300 max-w-7xl md:mx-auto top-0 w-full flex items-center justify-between flex-row px-5 py-3 md:px-5">
      <ButtonWithLogo
        onClick={navigateTo("/")}
        align="row"
        imageSize="h-12 w-12"
        textSize="text-xl"
        type="dark"
      />
      {token ? (
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button className="inline-flex w-full justify-center rounded-md py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <div className="flex flex-row items-center">
              <img
                alt="photoprofile"
                referrerPolicy="no-referrer"
                src={imageUrl}
                className="rounded-full border w-10 h-10 border-primary"
              />
            </div>
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <MenuItem
                onClick={navigateTo("/profile")}
                icon={<UserIcon aria-hidden="true" />}
                label="Edit Profile"
              />
              <MenuItem
                onClick={navigateTo("/change-password")}
                icon={<KeyIcon aria-hidden="true" />}
                label="Change Password"
                isDisable={user?.isLoginBySocial}
              />
              <MenuItem
                onClick={navigateTo("/orderList")}
                icon={<ClipboardIcon aria-hidden="true" />}
                label="My Booking"
              />
              <MenuItem
                onClick={logout}
                icon={<TbDoorExit aria-hidden="true" />}
                label="Logout"
              />
            </Menu.Items>
          </Transition>
        </Menu>
      ) : (
        <div className="flex flex-row space-x-4">
          <Link to="/login" className="text-primary underline">
            Login
          </Link>
          <Link to="/register" className="text-primary underline">
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavBar;
