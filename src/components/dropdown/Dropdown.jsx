import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { classNames } from "../../shared/utils";

function Dropdown({
  items,
  labelField = "name",
  selected,
  onItemChange,
  className = "",
  label,
  error,
}) {
  return (
    <div className={`w-full space-y-1 ${className}`}>
      <label className="text-sm">{label}</label>
      <Listbox value={selected} onChange={onItemChange}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-3 pl-3 pr-10 text-left shadow-sm focus:outline-none focus-visible:border-gray-500 focus-visible:ring-2 ring-1 ring-gray-300 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-300 sm:text-sm">
            <span className="block truncate">
              {selected ? selected[labelField] : "Select"}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 z-10 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {items.map((item, idx) => {
                return (
                  <Listbox.Option
                    key={idx}
                    className={({ active }) =>
                      `relative cursor-default group select-none py-2 pl-10 pr-4 ${
                        active ? "bg-primary text-white" : "text-gray-900"
                      }`
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {item[labelField]}
                        </span>
                        {selected ? (
                          <span
                            className={classNames(
                              "absolute inset-y-0 left-0 flex items-center pl-3",
                              selected
                                ? "text-black group-hover:text-white"
                                : "text-black",
                              active ? "text-white" : "text-black"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                );
              })}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
      {/* error message from formik */}
      {error && <p className="text-red-500 text-xs pt-2 z-10">{error}</p>}
    </div>
  );
}

export default Dropdown;
