import { CheckCircleIcon } from "@heroicons/react/20/solid";

export default function ButtonWithLeadingIcon({ label, icon }) {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-x-1.5 rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
    >
      <CheckCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
      {label}
    </button>
  );
}

ButtonWithLeadingIcon.defaultProps = {
  label: "label",
};
