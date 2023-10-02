import React from "react";

function FormSection({ children }) {
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6">{children}</div>;
}

export default FormSection;
