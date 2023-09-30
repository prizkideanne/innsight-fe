import React from "react";
import FormSection from "../FormSection";
import { Field } from "formik";
import InputWithLabel from "../../../../textInputs/InputWithLabel";
import TextAreaWithLabel from "../../../../textInputs/TextAreaWithLabel";

const RoomCard = ({
  room,
  index,
  errors,
  touched,
  values,
  setFieldValue,
  setDeletedExistingRoom,
}) => {
  const newRooms = values.rooms ?? [];
  const existingRooms = values.existingRooms ?? [];
  const isExistingRoom = existingRooms ? existingRooms.includes(room) : false;

  const getImageURL = () =>
    room.roomImage && room.roomImage.includes("/static")
      ? process.env.REACT_APP_API_BASE_URL + room.roomImage
      : room.roomImage;

  const imageURL = getImageURL();

  const isDisabled = () => [...existingRooms, ...newRooms].length <= 1;

  const fieldNamePrefix = isExistingRoom
    ? `existingRooms[${index}]`
    : `rooms[${index}]`;

  const errorField = isExistingRoom ? errors.existingRooms : errors.rooms;
  const touchedField = isExistingRoom ? touched.existingRooms : touched.rooms;

  const renderErrorMessage = (field) =>
    errorField?.[index]?.[field] &&
    touchedField?.[index]?.[field] && (
      <p className="text-red-500 text-xs mt-1">{errorField[index][field]}</p>
    );

  const handleImageChange = (e) => {
    const file = e.target.files ? e.target.files[0] : null;
    const reader = new FileReader();
    reader.onload = (event) => {
      setFieldValue(`${fieldNamePrefix}.roomImage`, event.target?.result);
    };
    if (file) reader.readAsDataURL(file);
  };

  const removeRoom = () => {
    const rooms = isExistingRoom ? [...existingRooms] : [...newRooms];
    rooms.splice(index, 1);
    setFieldValue(isExistingRoom ? "existingRooms" : "rooms", rooms);

    if (isExistingRoom) {
      setDeletedExistingRoom(room);
    }
  };

  return (
    <div className="space-y-2 border rounded-lg border-gray-500 p-5">
      <div className="w-full justify-end items-start grow-0 flex">
        <button
          type="button"
          onClick={removeRoom}
          disabled={isDisabled()}
          className="bg-accent text-white text-sm rounded-md px-2 py-1.5 w-[150px] hover:opacity-95 disabled:bg-gray-500"
        >
          Remove Room
        </button>
      </div>
      <FormSection>
        <div className="flex flex-col space-y-2">
          <div className="flex flex-col">
            <Field
              name={`${fieldNamePrefix}.name`}
              label="Name"
              placeholder="Room Name"
              component={InputWithLabel}
            />
            {renderErrorMessage("name")}
          </div>
          <div>
            <Field
              name={`${fieldNamePrefix}.basePrice`}
              label="Base Price"
              placeholder="Base Price"
              component={InputWithLabel}
            />
            {renderErrorMessage("basePrice")}
          </div>
          <div>
            <Field
              name={`${fieldNamePrefix}.description`}
              label="Description"
              placeholder="Room Description"
              component={TextAreaWithLabel}
            />
            {renderErrorMessage("description")}
          </div>
        </div>
        <div className="flex flex-col border p-2 rounded-md mt-7">
          <div className="h-full flex flex-col items-center justify-center">
            {room.roomImage && (
              <img
                src={imageURL}
                alt={`Room ${index} preview`}
                className="w-[330px] h-[180px] object-cover border rounded-md border-gray-300 mb-3"
              />
            )}
            <div className="w-full flex justify-center items-center h-full">
              <input
                id={isExistingRoom ? `existing-${index}` : `new-${index}`}
                name={`${fieldNamePrefix}.roomImage`}
                type="file"
                accept=".png, .jpg, .jpeg"
                onChange={handleImageChange}
                className="hidden"
              />
              <label
                htmlFor={isExistingRoom ? `existing-${index}` : `new-${index}`}
                className="px-2 py-1 text-xs rounded-md text-primary bg-white border-primary border cursor-pointer shadow hover:opacity-90 m-2"
              >
                Select Room Image
              </label>
            </div>
          </div>
          {renderErrorMessage("roomImage")}
        </div>
      </FormSection>
    </div>
  );
};

export default RoomCard;
