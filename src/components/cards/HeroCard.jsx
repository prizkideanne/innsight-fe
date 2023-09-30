import React, { Fragment, useEffect, useState } from "react";
import ButtonDateRange from "../buttons/ButtonDateRange";
import { CheckIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { differenceInDays } from "date-fns";
import api from "../../shared/api";
import { Combobox, Transition } from "@headlessui/react";

function HeroCard({
  selectedDays,
  handleDayClick,
  today,
  setLocation,
  location,
  onSearch,
}) {
  const [locationList, setLocationList] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const countNights = () => {
    const daysDifference = differenceInDays(selectedDays.to, selectedDays.from);
    return daysDifference;
  };

  const getAllLocation = () => {
    api
      .get("/location/all")
      .then((res) => {
        setLocationList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const filteredLocation =
    location === ""
      ? locationList
      : locationList.filter((loc) =>
          loc.city
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(location.toLowerCase().replace(/\s+/g, ""))
        );

  useEffect(() => {
    getAllLocation();
  }, []);

  return (
    <div className="bg-gradient-to-br from-primary to-accent md:px-20 py-10 rounded-lg p-3 w-full flex flex-col relative pb-16 md:h-[360px] md:rounded-3xl md:shadow-[0_35px_60px_-15px_rgba(46,144,230,0.1)] z-10">
      <p className="font-brand text-3xl md:text-6xl md:w-[500px] text-white z-10">
        No more booking fright, Innsight makes it all right.
      </p>
      <img
        alt="arrow"
        src="/assets/arrow.png"
        className="w-32 h-32 absolute left-[550px] rotate-45 bottom-14 hidden md:block"
      />
      <img
        src="/assets/tour.png"
        alt="Users avatars"
        className="w-[512px] object-contain absolute right-0 -bottom-5 transform -scale-x-100 hidden md:block z-0"
      />
      <div className="absolute mx-auto -bottom-12 w-full max-w-xs z-10 bg-white sm:max-w-md md:max-w-[50%] left-0 right-0 rounded-lg border border-[#ccc] drop-shadow-lg flex flex-col">
        <div className="flex flex-row items-center w-full">
          <div className="w-5 h-5 mt-[3px] mx-4">
            <MagnifyingGlassIcon color={"#999"} />
          </div>
          <Combobox
            value={selectedLocation}
            onChange={(loc) => {
              setSelectedLocation(loc);
            }}
          >
            <Combobox.Input
              className="pr-4 w-full py-3 rounded-lg outline-none"
              placeholder="Where do you want to go?"
              displayValue={(location) => (location ? location.city : "")}
              onChange={(event) => setLocation(event.target.value)}
            />
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setLocation(selectedLocation.city)}
            >
              <Combobox.Options className="absolute top-10 z-10 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {filteredLocation.length === 0 && location !== "" ? (
                  <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                    Nothing found.
                  </div>
                ) : (
                  filteredLocation.map((location) => (
                    <Combobox.Option
                      key={location.id}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? "bg-blue-600 text-white" : "text-gray-900"
                        }`
                      }
                      value={location}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {location.city}
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? "text-white" : "text-blue-600"
                              }`}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>
          </Combobox>
        </div>
        <div className="h-px border-t border-[#ccc] mx-4" />
        <ButtonDateRange
          selectedDays={selectedDays}
          handleDayClick={handleDayClick}
          today={today}
          totalNight={countNights()}
        />
      </div>
      <div className="flex justify-center my-3 absolute -bottom-28 md:-bottom-32 mx-auto left-0 right-0">
        <button
          onClick={onSearch}
          className="bg-primary text-white w-[300px] h-[40px] rounded-xl font-bold"
        >
          Let's Go
        </button>
      </div>
    </div>
  );
}

export default HeroCard;
