import { Switch } from "@headlessui/react";
import { useFormikContext } from "formik";
import React from "react";

function SwitchWithLabel({ field, label, ...props }) {
  const { touched, errors } = props.form;
  const { setFieldValue } = useFormikContext();

  return (
    <div className="space-y-1 flex flex-col items-end gap-y-1">
      <label className="text-sm text-right">{label}</label>
      <Switch
        checked={field.value}
        onChange={() => {
          setFieldValue(field.name, !field.value);
        }}
        className={`${
          field.value ? "bg-primary" : "bg-blue-200"
        } relative inline-flex h-[20px] w-[48px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${
            field.value ? "translate-x-7" : "translate-x-0"
          } pointer-events-none inline-block h-[16px] w-[16px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
      {/* error message from formik */}
      {touched[field.name] && errors[field.name] && (
        <p className="text-red-500 text-xs">{errors[field.name]}</p>
      )}
    </div>
  );
}

export default SwitchWithLabel;
