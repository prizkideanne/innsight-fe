import React from "react";

function InputWithLabel({ field, label, disabled = false, ...props }) {
  const { touched, errors } = props.form;
  return (
    <div className="space-y-1">
      <label className="text-sm">{label}</label>
      <input
        {...field}
        {...props}
        disabled={disabled}
        className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
      />
      {/* error message from formik */}
      {touched[field.name] && errors[field.name] && (
        <p className="text-red-500 text-xs">{errors[field.name]}</p>
      )}
    </div>
  );
}

export default InputWithLabel;
