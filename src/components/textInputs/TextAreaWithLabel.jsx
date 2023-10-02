import React from "react";

function TextAreaWithLabel({ field, label, ...props }) {
  const { errors } = props?.form;

  return (
    <div className="space-y-1 flex flex-col">
      <label className="text-sm capitalize ">{label}</label>
      <textarea
        rows={4}
        className="block w-full rounded-md border py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
        name={props.name}
        placeholder={props.placeholder}
        {...field}
      />
      {/* error message from formik */}
      {errors[field?.name] && (
        <p className="text-red-500 text-xs">{errors[field?.name]}</p>
      )}{" "}
    </div>
  );
}

export default TextAreaWithLabel;
