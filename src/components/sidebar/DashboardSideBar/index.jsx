import { useState } from "react";
import MobileSidebar from "./MobileSideBar";
import DesktopSideBar from "./DesktopSideBar";
import TopBar from "./TopBar";
import { Outlet } from "react-router-dom";
import { selectCurrentUser } from "../../../store/auth/authSlice";
import { useSelector } from "react-redux";
import GeneralModal from "../../modals/GeneralModal";
import LoadingCard from "../../cards/LoadingCard";
import useToken from "../../../shared/hooks/useToken";

export default function DashboardSideBar() {
  const { token } = useToken();
  const user = useSelector(selectCurrentUser);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (token && !user.role) {
    return (
      <GeneralModal isOpen={true} closeModal={() => null}>
        <LoadingCard />
      </GeneralModal>
    );
  }

  return user?.role === "TENANT" ? (
    <div>
      <MobileSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      {/* Static sidebar for desktop */}
      <DesktopSideBar />
      <TopBar openSideBar={() => setSidebarOpen(true)} />
      <main className="py-5 lg:pl-72">
        <div className="px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  ) : (
    <Outlet />
  );
}
