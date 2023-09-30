import React from "react";

function FormSection({ children }) {
  return <div className="grid md:grid-cols-2 gap-2 md:gap-6">{children}</div>;
}

export default FormSection;
