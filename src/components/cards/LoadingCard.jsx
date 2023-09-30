import React from "react";

function LoadingCard() {
  return (
    <div className="flex flex-row items-center justify-center h-52">
      <p className="text-xl text-primary font-bold">Please wait...</p>
      {/* loading indicator */}
      <div className="relative">
        <div className="absolute inset-0 transform translate-x-1/2 translate-y-1/2 ">
          <div className="border-l border-r border-solid animate-spin rounded-full border-primary border-8 h-72 w-72" />
        </div>
      </div>
    </div>
  );
}

export default LoadingCard;
