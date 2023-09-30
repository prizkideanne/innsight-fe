import React from "react";

function PropertyCard({ title, type, location, price, key, image, children, priceColor = "text-rose-500", showPriceLabel = true }) {
  return (
    <div className="w-full md:max-h-52 min-h-[180px] flex flex-col md:flex-row bg-white border border-gray-300 rounded-lg" >
      <div className="flex w-full lg:w-[350px] md:w-[70%]">
        <img
          src={image}
          alt="hotel"
          className="object-cover object-center h-full w-full rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
        />
      </div>
      <div className="flex flex-col justify-between w-full px-4 py-3 gap-y-4 ">
        {/* Property Info */}
        <div className="flex flex-row justify-between md:flex-col ">
          <div className="flex flex-col md:flex-row justify-between items-start">
            <p className="capitalize font-bold text-xl">{title}</p>
            <p className="capitalize font-medium text-sm mt-1 md:block">{type}</p>
          </div>
          <p className="capitalize font-medium text-sm">{location}</p>
        </div>

        {/* Price */}
        <div className="flex items-end flex-col border-t pt-3 pb-1 gap-2">
          <p className={`md:text-lg font-bold ${priceColor}`}>{price}</p>
          {showPriceLabel && <p className="text-[10px] md:text-xs">/night/room (tax included)</p>}
          {children}
        </div>
      </div>
    </div>
  );
}

PropertyCard.defaultProps = {
  title: "Hotel Sunset",
  type: "Hotel",
  location: "Jakarta Selatan",
  price: "Rp. 1.000.000",
  image: "https://cdn.britannica.com/96/115096-050-5AFDAF5D/Bellagio-Hotel-Casino-Las-Vegas.jpg"
};

export default PropertyCard;
