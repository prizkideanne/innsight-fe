import React, { useEffect, useState } from "react";
import MainContainer from "../../../components/layouts/MainContainer";
import Column from "../../../components/widget/Column";
import HeadLine from "../../../components/texts/HeadLine";
import Row from "../../../components/widget/Row";
import CardView from "../../../components/cards/CardView";
import Title from "../../../components/texts/Title";
import TextInput from "../../../components/textInputs/TextInput";
import { date } from "yup";
import Dropdown from "../../../components/dropdown/Dropdown";
import Button from "../../../components/buttons/Button";
import PropertyCard from "../../../components/cards/PropertyCard";
import SubTitle from "../../../components/texts/SubTitle";
import Cardorder from "../../../components/cards/CardOrder";
import axios from "axios";
import moment from "moment";
import Pagination from "../../../components/pagination/Pagination";
import { toast } from "react-hot-toast";
import ModalDialog from "../../../components/widget/ModalDialog";
import TextAreaWithLabel from "../../../components/textInputs/TextAreaWithLabel";

function OrderList() {
  const [bookingStatus, setBookingStatus] = useState([
    { id: 0, name: "ALL", value: null },
    { id: 1, name: "WAITING FOR PAYMENT", value: "WAITING_FOR_PAYMENT" },
    { id: 2, name: `PROCESSING PAYMENT`, value: "PROCESSING_PAYMENT" },
    { id: 3, name: `DONE`, value: "DONE" },
    { id: 4, name: `CANCELED`, value: "CANCELED" },
  ]);
  const [orders, setOrders] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [limitPage, setLimitPage] = useState(10);
  const [sortBy, setSortBy] = useState(null);
  const [comment, setComment] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [bookingId, setBookingId] = useState(null);
  const [bookingIdFilter, setBookingIdFilter] = useState(null);
  const [bookingDateFilter, setBookingDateFilter] = useState(null);
  const [bookingStatusFilter, setBookingStatusFilter] = useState(null);
  const getAllOrder = async (e) => {
    await axios
      .get(
        `${
          process.env.REACT_APP_API_BASE_URL
        }/transaction/order?page=${currentPage}&perPage=${limitPage}&sortBy=${
          sortBy ?? ""
        }&date=${bookingDateFilter ?? ""}&booking_status=${
          bookingStatusFilter?.value ?? ""
        }&booking_code=${bookingIdFilter ?? ""}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        if (response.data.status) {
          setOrders(response.data.data);
          setTotalPage(response.data.pagination.totalPage);
        }
      });
  };

  const onChangePage = (page) => {
    setCurrentPage(page);
  };

  const onChangeSort = (e) => {
    // e.preventDefault()
    const { value } = e.target;
    setSortBy(value);
  };

  const onChangeFilterType = (e) => {
    setBookingStatusFilter(e);
  };

  const onChangeFilterBookingId = (e) => {
    const { value } = e.target;
    setBookingIdFilter(value);
  };

  const onChangeFilterBookingDate = (e) => {
    const { value } = e.target;
    setBookingDateFilter(value);
  };

  const cancelOrder = async (booking_code) => {
    await axios
      .patch(
        `${process.env.REACT_APP_API_BASE_URL}/transaction/cancel/${booking_code}`,
        {},
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message);
          getAllOrder();
        }
      });
  };

  const sendReview = async () => {
    if (comment && bookingId) {
      await axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/transaction/review/${bookingId}`,
          {
            comment: comment,
          },
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          getAllOrder();
          if (response.data.status) {
            toast.success(response.data.message);
            setShowModal(false);
            setBookingId(null);
          } else {
            toast.error(response.data.message);
          }
        })
        .catch((error) => {
          error?.response?.data?.errors.forEach((row) => {
            toast.error(row.msg);
          });
        });
    }
  };

  useEffect(() => {
    getAllOrder();
  }, [currentPage, sortBy]);
  return (
    <>
      <MainContainer>
        <Column className="max-w-7xl mx-auto gap-8 w-full mt-8">
          <HeadLine className={"px-4 md:px-0"} label={"My Bookings"} />
          <Column className="w-full gap-5 md:flex-row mb-16">
            <Column className="flex w-full gap-5 px-4 md:px-0 md:max-w-[30%] lg:max-w-sm order-2 md:order-1 ">
              <CardView className="w-full gap-5">
                <Title label={"Sort By"} />
                <div className="flex gap-2 ">
                  <input
                    type="radio"
                    id="1"
                    name="sort"
                    value={"HighestPrice"}
                    onChange={onChangeSort}
                    className="cursor-pointer"
                  />{" "}
                  <label className="cursor-pointer" htmlFor="1">
                    highest Price
                  </label>
                </div>
                <div className="flex gap-2 ">
                  <input
                    type="radio"
                    id="2"
                    name="sort"
                    value={"LowestPrice"}
                    onChange={onChangeSort}
                    className="cursor-pointer"
                  />{" "}
                  <label className="cursor-pointer" htmlFor="2">
                    lowest Price
                  </label>
                </div>
                <div className="flex gap-2 ">
                  <input
                    type="radio"
                    id="3"
                    name="sort"
                    value={"A-Z"}
                    onChange={onChangeSort}
                    className="cursor-pointer"
                  />{" "}
                  <label className="cursor-pointer" htmlFor="3">
                    A - Z
                  </label>
                </div>
                <div className="flex gap-2 ">
                  <input
                    type="radio"
                    id="4"
                    name="sort"
                    value={"Z-A"}
                    onChange={onChangeSort}
                    className="cursor-pointer"
                  />{" "}
                  <label className="cursor-pointer" htmlFor="4">
                    Z - A
                  </label>
                </div>
              </CardView>
              <CardView className="w-full gap-5">
                <Title label={"Filter By"} />
                <TextInput
                  label={"Date"}
                  type="date"
                  onChange={onChangeFilterBookingDate}
                />
                <Dropdown
                  label={"Booking Status"}
                  selected={bookingStatusFilter}
                  items={bookingStatus}
                  onItemChange={onChangeFilterType}
                />
                <TextInput
                  label={"Booking Code"}
                  onChange={onChangeFilterBookingId}
                />
                <Button label={"Apply"} onClick={getAllOrder} />
              </CardView>
            </Column>
            <Column className="w-full gap-y-4 md:order-2 px-4 md:px-0 ">
              {orders?.length ? (
                <>
                  {orders.map((row) => (
                    <Cardorder
                      key={row.id}
                      header={
                        <SubTitle
                          label={`Booking Code : ${row.booking_code}`}
                        />
                      }
                      title={row.Room?.Property?.name}
                      image={row.room_img}
                      type={`${row.Room?.Property?.Property_type?.name} - ${row.Room?.name}`}
                      check_in={moment(row.check_in_date, "YYYY-MM-DD").format(
                        "DD/MM/YYYY"
                      )}
                      check_out={moment(
                        row.check_out_date,
                        "YYYY-MM-DD"
                      ).format("DD/MM/YYYY")}
                      status={row.booking_status}
                      booking_code={row.booking_code}
                      transactionTime={row.updatedAt}
                      totalinvoice={row.total_invoice}
                      confirmCancel={() => {
                        cancelOrder(row.booking_code);
                      }}
                      isDone={
                        new Date(row.check_out_date).getTime() <=
                          new Date().getTime() && row.Review == null
                      }
                      reviewButton={() => {
                        setBookingId(row.id);
                        setShowModal(true);
                      }}
                    />
                  ))}
                </>
              ) : (
                <></>
              )}
              {orders != null && (
                <Pagination totalPage={totalPage} onChangePage={onChangePage} />
              )}
            </Column>
            {bookingId && (
              <ModalDialog
                show={showModal}
                onClose={() => {
                  setShowModal(false);
                  setBookingId(null);
                }}
                className="max-w-xl"
              >
                <Column className="px-6 py-8 gap-5 ">
                  <Column>
                    <Title label={"Send Your Review"} />
                    <SubTitle label={""} />

                    <div className="space-y-1 flex flex-col">
                      <label className="text-sm capitalize ">{``}</label>
                      <textarea
                        rows={4}
                        className="block w-full rounded-md border py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                        placeholder={`Comment Here`}
                        onChange={(e) => setComment(e.target.value)}
                      />
                    </div>
                    <Button
                      type="button"
                      label={"Send Review"}
                      onClick={sendReview}
                      className={"my-6"}
                    />
                  </Column>
                </Column>
              </ModalDialog>
            )}
          </Column>
        </Column>
      </MainContainer>
    </>
  );
}

export default OrderList;
