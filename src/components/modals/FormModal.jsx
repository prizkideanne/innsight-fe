import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { classNames } from "../../shared/utils";

function FormModal({
  isOpen,
  closeModal,
  title,
  children,
  buttonLabel,
  onClickButton,
}) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-semibold leading-6 text-black"
                >
                  {title}
                </Dialog.Title>

                <div className="mt-2">{children}</div>

                <div className="mt-4 flex justify-end space-x-3">
                  {buttonLabel === "Delete" && (
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="button"
                    className={classNames(
                      "inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2  focus-visible:ring-offset-2",
                      buttonLabel === "Delete"
                        ? "text-white bg-rose-400 hover:bg-rose-500 focus-visible:ring-rose-500"
                        : "text-blue-900 hover:bg-blue-200 bg-blue-100 focus-visible:ring-blue-500"
                    )}
                    onClick={onClickButton}
                  >
                    {buttonLabel}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default FormModal;
