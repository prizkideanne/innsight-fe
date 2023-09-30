import { Bars3Icon } from "@heroicons/react/24/solid";
import React from "react";
import ProfileSection from "./ProfileSection";

function TopBar({ openSideBar }) {
  return (
    <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-primary px-4 h-14 shadow-sm sm:px-6 lg:hidden">
      <button
        type="button"
        className="-m-2.5 p-2.5 text-indigo-200 lg:hidden"
        onClick={openSideBar}
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>
      <div className="flex-1 text-sm font-semibold leading-6 text-white">
        Dashboard
      </div>
      <ProfileSection />
    </div>
  );
}

export default TopBar;
