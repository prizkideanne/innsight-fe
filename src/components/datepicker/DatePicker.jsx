import React from "react";
import { DayContent, DayPicker } from "react-day-picker";
import useCheckMobileScreen from "../../shared/hooks/useCheckIsMobile";
import { format, isAfter, isBefore, isSameDay } from "date-fns";
import Column from "../widget/Column";
import moment from "moment";

function DatePicker({
  selectedDays,
  handleDayClick,
  today,
  asreport = false,
  price = null,
  specialPrice = null,
  dateSpecialPrice = [],
}) {
  const isMobile = useCheckMobileScreen();
  const getPriceFormat = (price, date) => {
    let check = false;
    dateSpecialPrice.map((dates) => {
      if (
        (isAfter(date, dates.start) && isBefore(date, dates.end)) ||
        isSameDay(date, dates.start) ||
        isSameDay(date, dates.end)
      ) {
        check = true;
      }
    });
    let devide = 1000000;
    if (price < 1000000) {
      devide = 1000;
    }
    let devide2 = 1000000;
    if (specialPrice < 1000000) {
      devide2 = 1000;
    }
    const format = check
      ? `${specialPrice / devide2} ${specialPrice < 1000000 ? " rb" : " jt"}`
      : `${price / devide} ${price < 1000000 ? " rb" : " jt"}`;
    return format;
  };
  const dateTime = (props) => {
    const date = format(props.date, "yyyy-MM-dd");
    const { from, to } = selectedDays;

    return (
      <Column className={"my-4"}>
        <time dateTime={date}>
          <DayContent {...props} />
        </time>
        {((isAfter(props.date, from) && isBefore(props.date, to)) ||
          isSameDay(props.date, from) ||
          isSameDay(props.date, to)) && (
          <p
            className={`text-[0.5rem] md:text-xs ${
              from != null && to != null
                ? (isAfter(props.date, from) && isBefore(props.date, to)) ||
                  isSameDay(props.date, from) ||
                  isSameDay(props.date, to)
                  ? "text-white"
                  : "text-white"
                : "text-white"
            } `}
          >
            {getPriceFormat(price, props.date)}
          </p>
        )}
      </Column>
    );
  };
  return (
    <DayPicker
      numberOfMonths={isMobile ? 1 : 2}
      mode="range"
      selected={selectedDays}
      onDayClick={handleDayClick}
      disabled={asreport ? null : { before: today }}
      components={
        price != null || specialPrice != null
          ? {
              DayContent: dateTime,
            }
          : null
      }
      classNames={{
        vhidden: "sr-only",
        caption: "flex justify-center items-center h-10",
        root: "text-gray-800 z-50",
        months: "flex gap-4 relative px-4",
        caption_label: "text-lg px-1",
        nav_button:
          "inline-flex justify-center items-center absolute top-0 w-10 h-10 rounded-full text-gray-600 hover:bg-gray-100",
        nav_button_next: "right-0",
        nav_button_previous: "left-0",
        table: "border-collapse border-spacing-0 z-50",
        head_cell: "w-10 h-10 uppercase align-middle text-center text-xs",
        cell: "w-10 h-10 align-middle text-center border-0 px-0",
        day: `rounded-full ${
          price != null ? "md:w-16 w-12 h-16" : "w-10 h-10"
        } transition-colors hover:bg-primary/80 focus:outline-none focus-visible:ring focus-visible:ring-sky-300 focus-visible:ring-opacity-50 active:bg-sky-600 active:text-white`,
        day_selected: "text-white bg-primary hover:bg-primary/80 text-white",
        day_today: "font-bold",
        day_disabled:
          "opacity-25 hover:bg-white active:bg-white active:text-gray-800",
        day_outside: "enabled:opacity-50",
        day_range_middle: "rounded-none",
        day_range_end: "rounded-l-none rounded-r-full",
        day_range_start: "rounded-r-none rounded-l-full",
        day_hidden: "hidden",
      }}
    />
  );
}

export default DatePicker;
