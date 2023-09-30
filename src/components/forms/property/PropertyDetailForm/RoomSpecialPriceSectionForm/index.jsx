import { Field, Form, useFormikContext } from "formik";
import React, { useState } from "react";
import FormModal from "../../../../modals/FormModal";
import Dropdown from "../../../../dropdown/Dropdown";
import SwitchWithLabel from "../../../../switch/SwitchWithLabel";
import DatePickerWithLabel from "../../../../datepicker/DatePickerWithLabel";
import TextAreaWithLabel from "../../../../textInputs/TextAreaWithLabel";
import InputWithLabel from "../../../../textInputs/InputWithLabel";

const MODAL_CONFIG = {
  add: {
    title: "Set Room Special Price",
    buttonLabel: "Submit",
  },
  edit: {
    title: "Edit Special Price",
    buttonLabel: "Update",
  },
};

function RoomSpecialPriceSectionForm({
  isOpen,
  closeModal,
  handleSubmit,
  values,
  errors,
  setFieldValue,
  modalType,
  rooms,
}) {
  const [isWithPercentage, setIsWithPercentage] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const { resetForm } = useFormikContext();

  const handlePriceChange = (e) => {
    if (isWithPercentage) {
      const basePrice = values.room.basePrice;
      const percentage = e.target.value / 100;
      const price = basePrice + basePrice * percentage;
      setFieldValue("price", price);
    } else {
      setFieldValue("price", e.target.value);
    }
  };

  const handleCloseModal = () => {
    resetForm();
    setIsWithPercentage(false);
    setPercentage(0);
    closeModal();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormModal
        isOpen={isOpen}
        closeModal={handleCloseModal}
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
            <div className="space-y-3 border border-gray-300 p-2 rounded-md">
              <div className="flex flex-row justify-between items-center">
                <p className="text-sm">
                  Increment with percentage based on
                  <br />
                  base price
                </p>
                <input
                  value={isWithPercentage}
                  onChange={(e) => {
                    setIsWithPercentage(e.target.checked);
                    if (!e.target.checked) {
                      setPercentage(0);
                    }
                  }}
                  type="checkbox"
                  className="w-5 h-5"
                />
              </div>
              <div className="flex flex-row justify-between items-center">
                <p className="text-sm font-bold">
                  Base:{" "}
                  {values.room
                    ? new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(values.room.basePrice)
                    : 0}
                </p>
                <div className="flex flex-row justify-end items-center border border-gray-300 rounded-lg p-1">
                  <input
                    placeholder="50"
                    type="number"
                    value={percentage}
                    onChange={(e) => {
                      setPercentage(e.target.value);
                      handlePriceChange(e);
                    }}
                    disabled={!isWithPercentage}
                    min={0}
                    className="disabled:bg-gray-100 disabled:cursor-not-allowed w-[50px] px-1 rounded-md mr-1"
                  />
                  <p>%</p>
                </div>
              </div>
            </div>
            <Field
              disabled={isWithPercentage}
              label="Price"
              name="price"
              component={InputWithLabel}
              onChange={handlePriceChange}
            />
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

export default RoomSpecialPriceSectionForm;
