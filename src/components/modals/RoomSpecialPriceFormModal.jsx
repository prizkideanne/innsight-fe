import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { mapRoomData } from "../../pages/tenant/property/propertyDetails/dataMapper";
import api from "../../shared/api";
import { useParams } from "react-router-dom";
import RoomSpecialPriceSectionForm from "../forms/property/PropertyDetailForm/RoomSpecialPriceSectionForm";

const VALIDATION_SCHEMA = Yup.object({
  room: Yup.object().nullable().required("Required"),
  isActive: Yup.boolean(),
  startDate: Yup.date().required("Start date is required").nullable(),
  endDate: Yup.date()
    .required("End date is required")
    .nullable()
    .min(Yup.ref("startDate"), "End date can't be before start date"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be greater than zero")
    .typeError("Price must be a number"),
});

const RoomSpecialPriceFormModal = ({
  isOpen,
  closeModal,
  modalSubmit,
  modalType,
  selectedRoomSpecialPrice,
}) => {
  const { propertyId } = useParams();
  const [rooms, setRooms] = useState([]);
  const [initialValues, setInitialValues] = useState({
    room: null,
    isActive: true,
    startDate: "",
    endDate: "",
    price: "",
  });

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const res = await api.get(`/room/all/${propertyId}`);
        const rooms = res.data.data.map(mapRoomData);
        setRooms(rooms);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAllData();
  }, [propertyId]);

  useEffect(() => {
    if (selectedRoomSpecialPrice) {
      const { roomId, isActive, start_date, end_date, price } =
        selectedRoomSpecialPrice;
      const room = rooms.find((room) => room.id === roomId);
      setInitialValues({
        room,
        isActive,
        startDate: start_date,
        endDate: end_date,
        price,
      });
    }
  }, [selectedRoomSpecialPrice, rooms]);

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validationSchema={VALIDATION_SCHEMA}
      onSubmit={modalSubmit}
    >
      {({ handleSubmit, values, setFieldValue, errors }) => {
        return (
          <RoomSpecialPriceSectionForm
            values={values}
            errors={errors}
            setFieldValue={setFieldValue}
            closeModal={closeModal}
            handleSubmit={handleSubmit}
            isOpen={isOpen}
            modalType={modalType}
            rooms={rooms}
          />
        );
      }}
    </Formik>
  );
};

export default RoomSpecialPriceFormModal;
