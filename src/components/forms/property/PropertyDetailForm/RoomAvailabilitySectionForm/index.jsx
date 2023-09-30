import { Field, Form, useFormikContext } from "formik";
import React from "react";
import FormModal from "../../../../modals/FormModal";
import Dropdown from "../../../../dropdown/Dropdown";
import SwitchWithLabel from "../../../../switch/SwitchWithLabel";
import DatePickerWithLabel from "../../../../datepicker/DatePickerWithLabel";
import TextAreaWithLabel from "../../../../textInputs/TextAreaWithLabel";

const MODAL_CONFIG = {
  add: {
    title: "Set Room Availability",
    buttonLabel: "Submit",
  },
  edit: {
    title: "Edit Availability Config",
    buttonLabel: "Update",
  },
};

function RoomAvailabilityForm({
  isOpen,
  closeModal,
  handleSubmit,
  values,
  errors,
  setFieldValue,
  modalType,
  rooms,
}) {
  const { resetForm } = useFormikContext();

  return (
    <Form onSubmit={handleSubmit}>
      <FormModal
        isOpen={isOpen}
        closeModal={() => {
          resetForm();
          closeModal();
        }}
        onClickButton={handleSubmit}
        {...MODAL_CONFIG[modalType]}
      >
        <div className="flex flex-col space-y-2 mt-4">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {modalType !== "edit" && (
                <div className="col-span-2">
                  <Dropdown
                    items={rooms || []}
                    onItemChange={(e) => setFieldValue("room", e)}
                    selected={values.room}
                    labelField={"name"}
                    label={"Room Name"}
                    error={errors.room}
                  />
                </div>
              )}

              <Field
                label="Start Date"
                name="startDate"
                component={DatePickerWithLabel}
              />
              <Field
                label="End Date"
                name="endDate"
                component={DatePickerWithLabel}
              />
            </div>
            <Field label="Reason" name="reason" component={TextAreaWithLabel} />
            {modalType !== "add" && (
              <Field
                label="Enable Rule"
                name="isActive"
                component={SwitchWithLabel}
              />
            )}
          </div>
        </div>
      </FormModal>
    </Form>
  );
}

export default RoomAvailabilityForm;
