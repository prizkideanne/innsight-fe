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
import BuildingImageUpload from "../../../components/forms/property/BuildingImageUpload";
import HeadLine from "../../../components/texts/HeadLine";
import SubTitle from "../../../components/texts/SubTitle";
import Caption from "../../../components/texts/Caption";
import Title from "../../../components/texts/Title";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { formatToIDR, getMinimumPrice, getRange } from "../../../shared/utils";
import Carousel from "../../../components/widget/Carousel";
import Slider from "react-slick";
import Column from "../../../components/widget/Column";
import Body from "../../../components/texts/Body";
import Pagination from "../../../components/pagination/Pagination";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../store/auth/authSlice";
import useToken from "../../../shared/hooks/useToken";
import { useModal } from "../../../shared/context/ModalContext";

const DetailProperty = () => {
  let [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(
    searchParams?.get("start_date") ?? new Date()
  );
  const [endDate, setEndDate] = useState(
    searchParams?.get("end_date") ?? new Date()
  );
  const [property, setProperty] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [minPriceTmp, setMinPriceTmp] = useState(0);
  const [minSpecialPrice, setMinSpecialPrice] = useState(0);
  const [dateSpecialPrice, setDateSpecialPrice] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [limitPage, setLimitPage] = useState(4);
  let { id } = useParams();
  const today = new Date();
  const [selectedDays, setSelectedDays] = useState({
    from: new Date(startDate),
    to: new Date(endDate),
  });

  const { token } = useToken();

  const { user } = useSelector((state) => state.auth);
  const { openModal } = useModal();

  const setting = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  const changeDate = () => {
    navigate(`/property/${id}?start_date=${startDate}&end_date=${endDate}`);
    toast.success("Change Date Success");
  };
  const getDetailProperty = async (end) => {
    await axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/product/${
          id.split("-")[1]
        }?start_date=${startDate}&end_date=${end ?? endDate}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        setProperty(response.data.data);
        const prop = response.data.data;
        let prices = prop?.Rooms.map((row) => row.base_price);
        let prices2 = [];
        let dateSpecialPriceTmp = [];
        prop?.Rooms.map((row) => {
          if (row.Special_prices.length) {
            row.Special_prices.map((row2) => {
              prices2.push(row2.price);
              dateSpecialPriceTmp.push({
                start: new Date(row2.start_date),
                end: new Date(row2.end_date),
              });
            });
          } else {
            prices2.push(row.base_price);
          }
        });
        setMinPrice(getMinimumPrice(prices));
        setMinPriceTmp(getMinimumPrice(prices, false));
        setMinSpecialPrice(getMinimumPrice(prices2, false));
        setDateSpecialPrice(dateSpecialPriceTmp);
      });
  };
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
  };

  const countNights = () => {
    const daysDifference = differenceInDays(selectedDays.to, selectedDays.from);

    return daysDifference;
  };

  const getReview = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/transaction/review/property/${
          id.split("-")[1]
        }?page=${currentPage}&perPage=${limitPage}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        setReviews(response.data.data);
        setTotalPage(response.data.pagination.totalPage);
      });
  };

  const onChangePage = (page) => {
    setCurrentPage(page);
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
    if (selectedDays.from && selectedDays.to) {
      getDetailProperty(konversiEndate);
    }
  }, [selectedDays]);

  useEffect(() => {
    getDetailProperty();
    getReview();
  }, [currentPage]);

  const bookHandler = (id) => {
    if (token) {
      if (user.isVerified) {
        navigate(
          `/booking?start_date=${startDate}&end_date=${endDate}&room=${id}`
        );
      } else {
        openModal({
          title: "Verify your email first",
          buttonText: "I Understand",
          content: "Please verify your email first, if you want to booking",
        });
      }
    } else {
      navigate(
        `/login?redirect=/booking?start_date=${startDate}&end_date=${endDate}&room=${id}`
      );
    }
  };

  return (
    <>
      <MainContainer>
        <div className=" w-full flex flex-col max-w-7xl md:max-w-4xl mx-auto gap-8 md:gap-10 px-4">
          <div className="flex flex-col w-full justify-center  py-4 px-4 border gap-y-4 mt-8  rounded-xl">
            <div className="flex flex-col w-full md:flex-row justify-center md:items-center md:max-w-[70%] mx-auto gap-2 md:gap-3 ">
              <label htmlFor="" className="text-slate-600">
                Date
              </label>
              <div className="w-full">
                <ButtonDateRange
                  className={"border-2 rounded-md"}
                  selectedDays={selectedDays}
                  handleDayClick={handleDayClick}
                  today={today}
                  totalNight={countNights()}
                  price={minPriceTmp}
                  specialPrice={minSpecialPrice}
                  dateSpecialPrice={dateSpecialPrice}
                />
              </div>
              <div className="w-32 md:w-40 mt-2 md:mt-0 ml-auto ">
                <Button
                  className="py-3"
                  type="button"
                  label={"Apply Changes"}
                  onClick={changeDate}
                />
              </div>
            </div>
          </div>

          <div>
            <Slider {...setting}>
              {property?.Pictures.map((row, idx) => (
                <div
                  key={idx}
                  className={` w-full aspect-video flex-shrink-0  rounded-xl`}
                >
                  <img
                    className=" w-full aspect-video object-cover rounded-xl"
                    src={`${process.env.REACT_APP_API_BASE_URL}${row?.img}`}
                  />
                </div>
              ))}
            </Slider>
          </div>

          <div className="flex flex-col gap-12 w-full max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-y-5">
              <div className="flex flex-col gap-2">
                <HeadLine label={property?.name} />
                <div className="flex flex-row gap-2 items-center">
                  <SubTitle
                    className="whitespace-pre-line"
                    label={property?.Property_type.name}
                  />
                  <div className="h-1 w-1 rounded-full bg-gray-300"></div>
                  <SubTitle label={property?.Location.city} />
                </div>
              </div>
              <div className="flex flex-col gap-2 px-4 py-3 rounded-lg border border-green-300 bg-green-50">
                <Caption className={"text-green-700"} label="Start Form" />
                <Title
                  label={formatToIDR(
                    minSpecialPrice != 0 ? minSpecialPrice : minPrice
                  )}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <HeadLine label="About Property" />
              <SubTitle label={property?.description} />
            </div>
            <div className="flex flex-col gap-4">
              <HeadLine label="Rooms" />
              {property?.Rooms.map((row) => (
                <div key={row.id}>
                  <PropertyCard
                    title={row.name}
                    price={getRange(
                      row.Special_prices
                        ? row.Special_prices.find(
                            (srow) =>
                              (srow.start_date == startDate &&
                                srow.end_date == endDate) ||
                              (srow.start_date == startDate &&
                                srow.end_date >= endDate) ||
                              (srow.start_date <= startDate &&
                                srow.end_date == endDate)
                          )
                          ? [
                              row.Special_prices.find(
                                (srow) =>
                                  (srow.start_date == startDate &&
                                    srow.end_date == endDate) ||
                                  (srow.start_date == startDate &&
                                    srow.end_date >= endDate) ||
                                  (srow.start_date <= startDate &&
                                    srow.end_date == endDate)
                              ).price,
                            ]
                          : [
                              ...row.Special_prices?.map((srow) => srow.price),
                              ...[row.base_price],
                            ]
                        : [row.base_price]
                      // [...row.Special_prices?.map(srow => srow.price), ...[row.base_price]]
                      // row.Special_prices.length ? [...row.Special_prices?.map(srow => srow.price)]/ : [...row.Special_prices?.map(srow => srow.price), ...[row.base_price]]
                    )}
                    location=""
                    children={
                      <div className="w-1/3 ml-auto">
                        <Button
                          type="button"
                          className="w-28 ml-auto "
                          label="Book Now"
                          onClick={() => bookHandler(row.id)}
                        />
                      </div>
                    }
                    image={`${process.env.REACT_APP_API_BASE_URL}${row?.room_img}`}
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-4 mb-16">
              <HeadLine label="Reviews" />
              {reviews.length ? (
                <>
                  {reviews.map((row) => (
                    <div
                      key={row.id}
                      className="px-4 py-3 bg-white rounded-md border border-gray-500 shadow-md "
                    >
                      <Column className={"gap-2"}>
                        <Body
                          className={"font-semibold capitalize"}
                          label={row.Booking?.User?.Profile?.full_name}
                        />
                        <Body className={"font"} label={row.comment} />
                      </Column>
                    </div>
                  ))}
                </>
              ) : (
                <></>
              )}
              {reviews != null && (
                <div className="mt-5">
                  <Pagination
                    totalPage={totalPage}
                    onChangePage={onChangePage}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </MainContainer>
    </>
  );
};

export default DetailProperty;
