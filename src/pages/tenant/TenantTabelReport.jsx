import React from "react";
import MainContainer from "../../components/layouts/MainContainer";
import Column from "../../components/widget/Column";
import { useState } from "react";
import { useEffect } from "react";
import { differenceInDays, isBefore } from "date-fns";
import api from "../../shared/api";
import ButtonDateRange from "../../components/buttons/ButtonDateRange";
import moment from "moment";
import Row from "../../components/widget/Row";
import Button from "../../components/buttons/Button";
import TableWithSortHeader from "../../components/tables/TableWithSortHeader";

function TenantTabelReport() {
  const [listReport, setListReport] = useState([]);
  const [selectDate, setSelectDate] = useState(false);
  const [filter, setFilter] = useState("CHECKINLATEST");
  const today = new Date();
  const yesterday = new Date(today);
  const [selectedDays, setSelectedDays] = useState({
    from: today,
    to: yesterday,
  });
  yesterday.setDate(today.getDate() + 1);
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(yesterday);
  const handleDayClick = (day, modifiers = {}) => {
    if (modifiers.disabled) {
      return;
    }
    if (modifiers.selected) {
      setSelectedDays({ from: null, to: null });
      return;
    }
    if (!selectedDays.from) {
      setSelectedDays({ from: day, to: null });
      return;
    }
    if (isBefore(day, selectedDays.from)) {
      setSelectedDays({ from: day, to: null });
      return;
    }
    setSelectedDays({ from: selectedDays.from, to: day });
    setSelectDate(true);
  };
  const countNights = () => {
    const daysDifference = differenceInDays(selectedDays.to, selectedDays.from);

    return daysDifference;
  };
  const getReport = async () => {
    const { data } = await api.get(
      !selectDate
        ? `/report?sortBy=${filter}`
        : `/report?start_date=${startDate}&end_date=${endDate}&sortBy=${filter}`
    );
    const response =
      data && data.data && data.data.length
        ? data.data.map((item) => ({
            id: item.id,
            userName: item.User.Profile.full_name,
            Property_Name: item.Room?.Property.name,
            property_Type: item.Room?.Property.Property_type.name,
            status: item.booking_status,
            total: item.total_invoice,
            check_in: moment(item.check_in_date).utc(true).format("DD-MM-YYYY"),
            check_out: moment(item.check_out_date)
              .utc(true)
              .format("DD-MM-YYYY"),
            Transaction_Date: moment(item.updatedAt)
              .utc(false)
              .format("DD-MM-YYYY"),
          }))
        : [];
    setListReport(response);
  };

  const onchangeFilter = (e) => {
    const { value } = e.target;
    setFilter(value);
  };

  useEffect(() => {
    const konversiStartDate = moment(new Date(selectedDays.from)).format(
      "YYYY-MM-DD"
    );
    const konversiEndate = moment(new Date(selectedDays.to)).format(
      "YYYY-MM-DD"
    );

    if (selectedDays.from) {
      setStartDate(konversiStartDate);
    } else {
      setStartDate(null);
    }
    if (selectedDays.to) {
      setEndDate(konversiEndate);
    } else {
      setEndDate(null);
    }
  }, [selectedDays, filter]);

  useEffect(() => {
    getReport();
  }, [filter]);

  return (
    <>
      <Column>
        <Column
          className={
            "justify-center w-full md:max-w-[70%] md:mx-auto md:flex-row px-4 py-4 gap-y-4 gap-x-3"
          }
        >
          <div className="w-full ">
            <label htmlFor="" className="text-slate-600">
              Date
            </label>
            <ButtonDateRange
              className="border rounded-md"
              selectedDays={selectedDays}
              handleDayClick={handleDayClick}
              today={today}
              totalNight={countNights()}
              asreport={true}
            />
          </div>
          <div className="w-40 mt-auto ml-auto ">
            <Button
              className="py-3"
              label={"Search"}
              type="button"
              onClick={getReport}
            />
          </div>
        </Column>
        <TableWithSortHeader
          title={"Report"}
          description={"List All Reports"}
          emptymessage={"You Don't Have Any Transaction History"}
          data={listReport}
          subheaderwidget={
            <div
              className={"grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6"}
            >
              <label className="gap-2">
                <input
                  type="radio"
                  id="1"
                  name="filter"
                  onChange={onchangeFilter}
                  value={"TOTALHIGHEST"}
                />{" "}
                Higest Invoice
              </label>
              <label className="gap-2">
                <input
                  type="radio"
                  id="2"
                  name="filter"
                  onChange={onchangeFilter}
                  value={"TOTALLOWEST"}
                />{" "}
                Lowest Invoice
              </label>
              <label className="gap-2">
                <input
                  type="radio"
                  id="3"
                  name="filter"
                  onChange={onchangeFilter}
                  value={"CHECKINOLDEST"}
                />{" "}
                Check in Oldest
              </label>
              <label className="gap-2">
                <input
                  type="radio"
                  id="4"
                  name="filter"
                  checked={filter == "CHECKINLATEST" ? true : false}
                  onChange={onchangeFilter}
                  value={"CHECKINLATEST"}
                />{" "}
                Check In Latest
              </label>
              <label className="gap-2">
                <input
                  type="radio"
                  id="4"
                  name="filter"
                  onChange={onchangeFilter}
                  value={"CHECKOUTOLDEST"}
                />{" "}
                Check Out Oldest
              </label>
              <label className="gap-2">
                <input
                  type="radio"
                  id="4"
                  name="filter"
                  onChange={onchangeFilter}
                  value={"CHECKOUTLATEST"}
                />{" "}
                Check Out Latest
              </label>
            </div>
          }
        />
      </Column>
    </>
  );
}

export default TenantTabelReport;
