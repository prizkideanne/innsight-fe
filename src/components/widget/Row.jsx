import React from "react";

function Row({ className, children, onClick }) {
  return (
    <div onClick={onClick} className={`flex flex-row w-fit ${className}`}>
      {children}
    </div>
  );
}

export default Row;
