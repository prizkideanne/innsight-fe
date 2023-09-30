import React, { useState } from "react";
import Column from "../../components/widget/Column";
import { Datepicker } from "@meinefinsternis/react-horizontal-date-picker";
import { id } from "date-fns/locale";
import { isBefore, setDate } from "date-fns";
import api from "../../shared/api";
import { useEffect } from "react";
import moment from "moment";
import PropertyCard from "../../components/cards/PropertyCard";

function ReportByCalendar() {
  const [listProperty, setListProperty] = useState([]);
  const [date, setdate] = useState({
    // endValue: Date.now() | null,
    startValue: Date.now(),
  });

  const onChangeDate = (e) => {
    const [startValue, endValue, rangeDates] = e;
    setdate({
      // endValue: endValue,
      startValue:
        date.startValue == null
          ? startValue
          : isBefore(startValue, date.startValue)
          ? startValue
          : endValue,
    });
  };

  const getProperty = async () => {
    const dateSelect = moment(date.startValue).utc(true).format("YYYY-MM-DD");
    const { data } = await api.get(`/report/${dateSelect}`);
    setListProperty(data.data);
  };

  useEffect(() => {
    getProperty();
  }, [date]);
  return (
    <>
      <Column className={"gap-5 mb-5"}>
        <Datepicker
          onChange={onChangeDate}
          locale={id}
          startValue={date.startValue}
        />
        {listProperty.length ? (
          listProperty.map((item, idx) => {
            return (
              <PropertyCard
                title={item.name}
                type={item.Property.Property_type.name}
                location={
                  item.Property.name + ", " + item.Property.Location.city
                }
                price={item.status}
                image={item?.room_img}
                priceColor={
                  item.status == "Room Available"
                    ? "text-green-700"
                    : "text-rose-700"
                }
                showPriceLabel={false}
              />
            );
          })
        ) : (
          <>
            <p className="text-red-700">Data Not Found</p>
          </>
        )}
      </Column>
    </>
  );
}

export default ReportByCalendar;
