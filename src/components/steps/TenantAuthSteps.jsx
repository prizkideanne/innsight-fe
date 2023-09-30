import { CheckIcon } from "@heroicons/react/20/solid";
import { classNames } from "../../shared/utils";

export default function TenantAuthSteps({ steps }) {
  return (
    <nav aria-label="Progress">
      <ol className="flex justify-center">
        {steps.map((step, stepIdx) => (
          <li
            key={step.name}
            className={classNames(
              stepIdx !== steps.length - 1 ? "pr-20" : "",
              "relative"
            )}
          >
            {step.status === "complete" ? (
              <>
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="h-0.5 w-full bg-primary" />
                </div>
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary hover:bg-indigo-900">
                  <CheckIcon
                    className="h-5 w-5 text-white absolute m-auto left-0 right-0"
                    aria-hidden="true"
                  />
                  <p className="mt-14 font-bold text-xs text-primary">
                    {step.name}
                  </p>
                </div>
              </>
            ) : step.status === "current" ? (
              <>
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <div
                  className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-white"
                  aria-current="step"
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full bg-primary"
                    aria-hidden="true"
                  />
                  <p className="mt-14 font-bold text-xs text-primary">
                    {step.name}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <div className="group relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white hover:border-gray-400">
                  <span
                    className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300"
                    aria-hidden="true"
                  />
                  <p className="mt-14 font-bold text-xs text-primary">
                    {step.name}
                  </p>
                </div>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
