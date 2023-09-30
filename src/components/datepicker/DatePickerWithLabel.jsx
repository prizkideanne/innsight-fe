import { useFormikContext } from "formik";
import moment from "moment";
import React from "react";

// Helper function to check for valid date
const isValidDate = (date) => moment(date).isValid();

// Helper function to format date
const formatDate = (date) =>
  isValidDate(date) ? moment(date).format("YYYY-MM-DD") : "";

function DatePickerWithLabel({ field, label, form, ...props }) {
  const { setFieldValue } = useFormikContext();
  const today = moment().format("YYYY-MM-DD");
  const formattedDate = formatDate(new Date(field.value));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFieldValue(name, value);
  };

  return (
    <div className="space-y-1 flex flex-col gap-y-1">
      <label className="text-sm">{label}</label>
      <input
        type="date"
        name={field.name}
        value={formattedDate}
        onChange={handleChange}
        min={today}
        {...props}
        className="rounded border border-gray-300 focus:border-primary focus:ring-0 p-1 px-1.5"
      />
      {form.errors[field.name] && (
        <p className="text-red-500 text-xs">{form.errors[field.name]}</p>
      )}
    </div>
  );
}

export default DatePickerWithLabel;
