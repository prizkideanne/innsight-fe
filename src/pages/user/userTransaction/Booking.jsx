import React from "react";
import MainContainer from "../../../components/layouts/MainContainer";
import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { toast } from "react-hot-toast";
import * as Yup from "yup";
import Dropdown from "../../../components/dropdown/Dropdown";
import ButtonDateRange from "../../../components/buttons/ButtonDateRange";
import { isBefore, differenceInDays, set } from "date-fns";
import moment from "moment";
import Button from "../../../components/buttons/Button";
import PropertyCard from "../../../components/cards/PropertyCard";
import Column from "../../../components/widget/Column";
import Row from "../../../components/widget/Row";
import HeadLine from "../../../components/texts/HeadLine";
import SubTitle from "../../../components/texts/SubTitle";
import CardView from "../../../components/cards/CardView";
import Caption from "../../../components/texts/Caption";
import Body from "../../../components/texts/Body";
import { TbArrowRight } from "react-icons/tb";
import Title from "../../../components/texts/Title";
import { useNavigate, useSearchParams } from "react-router-dom";

const BookingProperty = () => {
  let [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(
    searchParams?.get("start_date") ?? new Date()
  );
  const [room, setRoom] = useState(null);
  const [totaldays, setTotalDays] = useState(0);
  const [confirm, setConfirm] = useState(false);
  const [price, setPrice] = useState(0);
  const [endDate, setEndDate] = useState(
    searchParams?.get("end_date") ?? new Date()
  );
  const getThisRoom = async () => {
    await axios
      .get(
        `${
          process.env.REACT_APP_API_BASE_URL
        }/transaction/book?start_date=${startDate}&end_date=${endDate}&room_id=${searchParams.get(
          "room"
        )}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        if (response.data.status) {
          setRoom(response.data.data);
          totalPrice(response.data.data);
        }
      });
  };
  const totalPrice = (room) => {
    const dateInConvertion = new Date(startDate).getTime();
    const dateOutConvertion = new Date(endDate).getTime();
    const timeDiff = dateOutConvertion - dateInConvertion;
    const days = Math.ceil(Math.abs(timeDiff) / (1000 * 3600 * 24));
    setTotalDays(days);
    let totalSpecialPrice = 0;
    let totalSpecialPriceDays = 0;

    room.Special_prices.forEach((row) => {
      const csd = new Date(row.start_date).getTime();
      const ced = new Date(row.end_date).getTime();
      const tmpc = ced - csd;
      const tmpd = Math.ceil(tmpc / (1000 * 3600 * 24));
      if (days <= tmpd) {
        totalSpecialPriceDays += days;
      } else {
        totalSpecialPriceDays += tmpd;
      }
      totalSpecialPrice += totalSpecialPriceDays * row.price;
    });
    let totalBasePrice = 0;
    let totalBasePriceDays = days - totalSpecialPriceDays;
    totalBasePrice += totalBasePriceDays * room.base_price;
    setPrice(totalBasePrice + totalSpecialPrice);
  };

  const checkAlreadyBook = async (e) => {
    e.preventDefault();
    await axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/transaction/book/${room?.id}`,
        {
          start_date: startDate,
          end_date: endDate,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(async (res) => {
        if (res.data.status) {
          setConfirm(true);
        } else {
          toast.error(res.data.message);
        }
      });
  };

  const bookingConfirm = async (e) => {
    e.preventDefault();
    await axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/transaction/book`,
        {
          check_in_date: startDate,
          check_out_date: endDate,
          total_invoice: price,
          room_id: searchParams.get("room"),
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        if (response.data.status) {
          toast.success(response.data.message);
          navigate(`/paymentproof/${response.data.data.booking_code}`);
        }
      });
  };
  useEffect(() => {
    getThisRoom();
  }, []);
  return (
    <>
      <MainContainer>
        <Column className="w-full max-w-7xl md:max-w-2xl mx-auto gap-5 px-4 md:px-0 mt-4">
          <Column className="w-full gap-5 ">
            <img
              className="min-w-[50%] aspect-video rounded-lg"
              src={`${process.env.REACT_APP_API_BASE_URL}${room?.room_img}`}
              alt=""
            />
            <Column className="w-full gap-2">
              <HeadLine label={room?.Property?.name} />
              <Row className={"gap-2 items-center"}>
                <SubTitle label={room?.Property?.Property_type?.name} />
                <div className="h-1 w-1 rounded-full bg-gray-300"></div>
                <SubTitle label={room?.Property?.Location?.city} />
              </Row>
            </Column>
          </Column>
          <CardView className={"w-full bg-blue-50 gap-3 p-0"}>
            <Column className={"gap-1 border-b border-b-blue-300 pb-3"}>
              <SubTitle className={"font-semibold"} label={room?.name} />
              <Caption label={room?.description} />
            </Column>
            <Row className="w-full gap-5 justify-between ">
              <Column className="gap-1">
                <Caption className={"text-blue-700"} label={"Check In"} />
                <Body
                  label={moment(startDate, "YYYY-MM-DD").format("DD/MM/YYYY")}
                />
              </Column>
              <TbArrowRight className="h-5 w-5 my-auto" />
              <Column className="gap-1">
                <Caption className={"text-red-600"} label={"Check Out"} />
                <Body
                  label={moment(endDate, "YYYY-MM-DD").format("DD/MM/YYYY")}
                />
              </Column>
            </Row>
          </CardView>

          <Column className="gap-1 border px-4 py-4 bg-blue-50 rounded-md">
            <Body label={"Total Price"} />
            <Title label={new Intl.NumberFormat().format(price)} />
          </Column>
          {confirm ? (
            <>
              <Row className="w-full gap-5 mt-8 mb-16">
                <Button
                  className="mx-auto w-full py-3 "
                  label={"Confirm Booking"}
                  type="button"
                  onClick={bookingConfirm}
                />
                <Button
                  className="mx-auto w-full bg-orange-700 py-3 hover:bg-orange-700/80"
                  label={"Cancel"}
                  type="button"
                  onClick={() => {
                    setConfirm(false);
                  }}
                />
              </Row>
            </>
          ) : (
            <>
              <Button
                className="mx-auto w-36 mb-16 mt-8 py-3"
                label={"Make Payment"}
                type="button"
                onClick={checkAlreadyBook}
              />
            </>
          )}
        </Column>
      </MainContainer>
    </>
  );
};

export default BookingProperty;
