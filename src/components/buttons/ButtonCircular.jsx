import { PlusIcon } from "@heroicons/react/20/solid";
import React from "react";

function ButtonCircular() {
  return (
    <button
      type="button"
      className="rounded-full bg-sky-600 p-3 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
    >
      <PlusIcon className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}

export default ButtonCircular;
