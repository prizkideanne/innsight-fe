import React from "react";
import ButtonWithLogo from "../../buttons/ButtonWithLogo";
import NavigationItem from "./NavigationItem";
import navigation from "./navigation";
import ProfileSection from "./ProfileSection";

function DesktopSideBar() {
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-primary px-6">
        <div className="flex h-16 shrink-0 items-center mt-3">
          <ButtonWithLogo
            imageSize="w-12 h-12"
            textSize="text-lg"
            align="row"
          />
        </div>
        <nav className="flex flex-1 flex-col ">
          <ul className="flex flex-1 flex-col gap-y-7">
            {navigation.map((item, idx) => (
              <NavigationItem item={item} key={idx} />
            ))}
          </ul>
        </nav>
        <ProfileSection />
      </div>
    </div>
  );
}

export default DesktopSideBar;
