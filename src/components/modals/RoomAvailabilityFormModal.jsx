import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { mapRoomData } from "../../pages/tenant/property/propertyDetails/dataMapper";
import api from "../../shared/api";
import { useParams } from "react-router-dom";
import RoomAvailabilityForm from "../forms/property/PropertyDetailForm/RoomAvailabilitySectionForm";

const VALIDATION_SCHEMA = Yup.object({
  room: Yup.object().nullable().required("Required"),
  isActive: Yup.boolean(),
  startDate: Yup.date().required("Start date is required").nullable(),
  endDate: Yup.date()
    .required("End date is required")
    .nullable()
    .min(Yup.ref("startDate"), "End date can't be before start date"),
  reason: Yup.string().required("Reason is required"),
});

const RoomAvailabilityFormModal = ({
  isOpen,
  closeModal,
  modalSubmit,
  modalType,
  selectedRoomAvailability,
}) => {
  const { propertyId } = useParams();
  const [rooms, setRooms] = useState([]);
  const [initialValues, setInitialValues] = useState({
    room: null,
    isActive: true,
    startDate: "",
    endDate: "",
    reason: "",
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
    if (selectedRoomAvailability) {
      const { roomId, isActive, start_date, end_date, reason } =
        selectedRoomAvailability;
      const room = rooms.find((room) => room.id === roomId);
      setInitialValues({
        room,
        isActive,
        startDate: start_date,
        endDate: end_date,
        reason,
      });
    }
  }, [selectedRoomAvailability, rooms]);

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validationSchema={VALIDATION_SCHEMA}
      onSubmit={modalSubmit}
    >
      {({ handleSubmit, values, setFieldValue, errors }) => {
        return (
          <RoomAvailabilityForm
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

export default RoomAvailabilityFormModal;
