import React from "react";
import { classNames } from "../../shared/utils";

function ButtonWithLogo({
  imageSize = "w-14 h-14",
  textSize = "text-2xl",
  type = "white",
  align = "column",
  ...props
}) {
  const logo =
    type !== "dark" ? "/assets/logo_white.png" : "/assets/logo_black.png";
  return (
    <button
      {...props}
      className={classNames(
        "flex items-center justify-center cursor-pointer",
        align === "column" ? "flex-col" : "flex-row"
      )}
    >
      <img
        alt="logo"
        src={logo}
        className={classNames("object-contain", imageSize)}
      />
      <span
        className={classNames(
          " font-brand",
          type === "dark" ? "text-black" : "text-white",
          align === "row" ? "ml-2" : "",
          textSize
        )}
      >
        innsight
      </span>
    </button>
  );
}

export default ButtonWithLogo;
