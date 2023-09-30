import React from "react";
import RoomCard from "./RoomCard";
import FormSection from "../FormSection";

const RoomsSectionForm = ({
  values,
  errors,
  touched,
  setFieldValue,
  setDeletedExistingRoom,
}) => {
  return (
    <div className="space-y-5">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col">
          <label className="text-base font-bold text-gray-700">Rooms</label>
          <p className="text-sm text-gray-700 pb-5 max-w-[500px] hidden md:block">
            Manage individual rooms within your property here. Add, edit, or
            delete rooms to keep your listing up-to-date.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setFieldValue("rooms", [
              ...values.rooms,
              {
                name: "",
                roomImage: null,
                description: "",
                basePrice: "",
              },
            ]);
          }}
          className="bg-teal-400 text-white shrink-0 rounded-md px-2 py-1.5 w-[150px] grow-0"
        >
          Add Room
        </button>
      </div>
      <FormSection>
        {values.existingRooms &&
          values.existingRooms.map((room, index) => {
            return (
              <RoomCard
                key={room.id + index}
                room={room}
                index={index}
                values={values}
                errors={errors}
                touched={touched}
                setFieldValue={setFieldValue}
                setDeletedExistingRoom={setDeletedExistingRoom}
              />
            );
          })}

        {values.rooms &&
          values.rooms.map((room, index) => {
            return (
              <RoomCard
                key={index}
                room={room}
                index={index}
                values={values}
                errors={errors}
                touched={touched}
                setFieldValue={setFieldValue}
              />
            );
          })}
      </FormSection>
    </div>
  );
};

export default RoomsSectionForm;
