import React, { useEffect, useState } from "react";
import { isBefore } from "date-fns";
import MainContainer from "../components/layouts/MainContainer";
import HeroCard from "../components/cards/HeroCard";
import TopCityCard from "../components/cards/TopCityCard";
import { StarIcon } from "@heroicons/react/24/solid";
import { formatToIDR } from "../shared/utils";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import api from "../shared/api";

const topCity = [
  {
    cityName: "Jakarta",
    link: "/property?location=jakarta",
    image:
      "https://cdn.britannica.com/88/132688-050-E9739DD9/Skyline-Jakarta-Indonesia.jpg",
  },
  {
    cityName: "Bandung",
    link: "/property?location=bandung",
    image: "https://www.nativeindonesia.com/foto/2018/09/Jalan-Braga-1.jpg",
  },
  {
    cityName: "Bali",
    link: "/property?location=bali",
    image:
      "https://www.affordableluxurytravel.co.uk/blog/wp-content/uploads/2021/11/AdobeStock_103587221-1140x570.jpeg",
  },
];

function Home() {
  const [location, setLocation] = useState("");
  const [topProperties, setTopProperties] = useState([]);

  // Get today's date
  const today = new Date();
  const navigate = useNavigate();

  // Get tomorrow's date
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const [selectedDays, setSelectedDays] = useState({
    from: today,
    to: tomorrow,
  });

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

  const navigateToSearch = () => {
    navigate(
      `/property?start_date=${moment(selectedDays.from).format(
        "YYYY-MM-DD"
      )}&end_date=${moment(selectedDays.to).format(
        "YYYY-MM-DD"
      )}&location=${location}`
    );
  };

  useEffect(() => {
    const getTopPlaces = async () => {
      api
        .get("/top")
        .then(({ data }) => {
          setTopProperties(data.topProperty);
        })
        .catch((err) => console.log(err));
    };
    getTopPlaces();
  }, []);

  return (
    <MainContainer>
      <div className="bg-white px-5 relative pt-5 pb-20">
        <HeroCard
          selectedDays={selectedDays}
          handleDayClick={handleDayClick}
          today={today}
          location={location}
          setLocation={(e) => setLocation(e)}
          onSearch={navigateToSearch}
        />
        <div className="z-0 relative">
          <div className="mt-36 md:mt-48">
            <p className="font-brand text-xl md:text-3xl mb-5 md:mb-10">
              Top City To Explore
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {topCity.map(({ cityName, image, link }) => {
                return (
                  <TopCityCard
                    key={cityName}
                    cityName={cityName}
                    link={link}
                    image={image}
                  />
                );
              })}
            </div>
          </div>

          {topProperties.length > 0 && (
            <div className="mt-14 md:mt-20">
              <p className="font-brand text-xl md:text-3xl mb-2">Our Picks</p>
              <p className="text-lg mb-5 md:mb-10 font-semibold text-gray-700">
                The Coolest Spots We Think You'll Love!
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {topProperties &&
                  topProperties
                    .slice(0, 4)
                    .map(({ firstImage, city, name, lowestBasePrice, id }) => {
                      const startDate = moment().format("YYYY-MM-DD");
                      const endDate = moment().add(1).format("YYYY-MM-DD");
                      return (
                        <Link
                          to={`/property/${name}-${id}?start_date=${startDate}&end_date=${endDate}`}
                          key={id}
                          className="h-[240px] md:h-[300px] max-w-[300px] border rounded-xl flex flex-col"
                        >
                          <img
                            src={firstImage}
                            alt={name}
                            className="object-cover h-[100px] md:h-[180px] w-full rounded-t-xl z-0 flex"
                          />
                          <div className="p-2 flex flex-col justify-between flex-1">
                            <div>
                              <p className="font-semibold text-md line-clamp-2">
                                {name}
                              </p>
                              <div className="my-2 flex flex-row items-start justify-start text-slate-600">
                                <span className="text-sm -mt-1 line-clamp-1">
                                  {city}
                                </span>
                              </div>
                            </div>

                            <p className="font-semibold">
                              {formatToIDR(lowestBasePrice)}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
              </div>
            </div>
          )}
        </div>
      </div>
    </MainContainer>
  );
}

export default Home;
