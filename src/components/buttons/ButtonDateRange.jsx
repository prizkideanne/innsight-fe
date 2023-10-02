import { Popover, Transition } from "@headlessui/react";
import { CalendarDaysIcon } from "@heroicons/react/24/solid";
import React, { Fragment } from "react";
import DatePicker from "../datepicker/DatePicker";
import moment from "moment";

function ButtonDateRange({
  selectedDays,
  handleDayClick,
  today,
  totalNight,
  className,
  asreport = false,
  price = null,
  specialPrice = null,
  dateSpecialPrice = [],
}) {
  return (
    <Popover className={`relative ${className} z-50`}>
      {({ close }) => (
        <>
          <Popover.Button className="flex flex-row items-center w-full">
            <div className="w-5 h-5 mx-4">
              <CalendarDaysIcon color={"#999"} />
            </div>
            <span
              className="pr-4 w-full text-left py-3 rounded-lg outline-none"
              placeholder="Where do you want to go?"
            >
              {selectedDays.from
                ? moment(selectedDays.from).format("D MMM")
                : "Check in"}{" "}
              -{" "}
              {selectedDays.to
                ? moment(selectedDays.to).format("D MMM")
                : "Check out"}
            </span>
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute left-1/2 z-50 mt-3 -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-5xl w-fit bg-slate-50">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 p-3 relative z-50">
                <DatePicker
                  selectedDays={selectedDays}
                  handleDayClick={handleDayClick}
                  today={today}
                  asreport={asreport}
                  price={price}
                  specialPrice={specialPrice}
                  dateSpecialPrice={dateSpecialPrice}
                />
                <div className="flex justify-end mt-3">
                  <button
                    className="bg-primary text-white text-sm px-3 py-2 rounded"
                    onClick={close}
                  >
                    Save {`(${totalNight || 0} nights)`}
                  </button>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}

export default ButtonDateRange;
