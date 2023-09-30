import React, { forwardRef } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Button from "../../../buttons/Button";
import RoomsSectionForm from "./RoomsSectionForm";

const PropertyRoomForm = forwardRef(
  ({ initialValues, onSubmit, submitLabel, setDeletedExistingRoom }, ref) => {
    const validationSchema = Yup.object().shape({
      rooms: Yup.array().of(
        Yup.object().shape({
          name: Yup.string().required("Room name is required"),
          roomImage: Yup.mixed().nullable().required("Room image is required"),
          description: Yup.string().required("Room description is required"),
          basePrice: Yup.string().required("Base price is required"),
        })
      ),
      existingRooms: Yup.array().of(
        Yup.object().shape({
          name: Yup.string().required("Room name is required"),
          roomImage: Yup.mixed().nullable().required("Room image is required"),
          description: Yup.string().required("Room description is required"),
          basePrice: Yup.string().required("Base price is required"),
        })
      ),
    });

    return (
      <Formik
        innerRef={ref}
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ setFieldValue, values, errors, touched }) => (
          <Form className="space-y-12">
            <RoomsSectionForm
              values={values}
              errors={errors}
              touched={touched}
              setFieldValue={setFieldValue}
              setDeletedExistingRoom={setDeletedExistingRoom}
            />

            <div className="w-full flex justify-end">
              <Button
                type="submit"
                label={submitLabel}
                className={"max-w-[150px]"}
              />
            </div>
          </Form>
        )}
      </Formik>
    );
  }
);

export default PropertyRoomForm;
