import { BuildingOfficeIcon, CalendarIcon } from "@heroicons/react/20/solid";
import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import Dropdown from "../dropdown/Dropdown";
import ButtonSubMenu from "../buttons/ButtonSubMenu";

export default function PropertyLayout() {
  const navigate = useNavigate();
  const { propertyId } = useParams();

  const tabs = [
    {
      name: "Property Details",
      href: `/`,
      icon: BuildingOfficeIcon,
    },
    {
      name: "Rooms",
      href: `/rooms`,
      icon: CalendarIcon,
    },
    {
      name: "Availability",
      href: `/availability`,
      icon: CalendarIcon,
    },
    {
      name: "Special Price",
      href: `/special-price`,
      icon: CalendarIcon,
    },
  ];

  const onChange = (tab) => {
    navigate(`/my-property/${propertyId}${tab.href}`);
  };

  // /property/${propertyId}${tab.href}

  return (
    <div>
      <div className="flex flex-col md:flex-row">
        <div className="sm:flex sm:items-center shrink-0 mr-16">
          <div className="flex flex-row space-x-5 items-center">
            <button onClick={() => navigate("/")} className="w-8 h-8">
              <ArrowLongLeftIcon />
            </button>
            <div className="sm:flex-auto">
              <h1 className="text-base font-semibold leading-6 text-gray-900">
                Edit Property
              </h1>
            </div>
          </div>
        </div>
        <div className="w-full mt-5 sm:mt-0">
          <div className="sm:hidden overflow-auto w-full flex flex-row space-x-5">
            {/* <Dropdown onItemChange={onChange} items={tabs} label="Submenu" /> */}
            {tabs.map((tab) => (
              <ButtonSubMenu tab={tab} key={tab.name} />
            ))}
          </div>
          <div className="hidden sm:block">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                {tabs.map((tab) => (
                  <ButtonSubMenu tab={tab} key={tab.name} />
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
