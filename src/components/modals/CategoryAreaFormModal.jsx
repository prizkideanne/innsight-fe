import React from "react";
import { Formik, Form, Field } from "formik";
import InputWithLabel from "../../components/textInputs/InputWithLabel";
import * as Yup from "yup";
import FormModal from "./FormModal";

const VALIDATION_SCHEMA = Yup.object({
  name: Yup.string().required("Required"),
});

const MODAL_CONFIG = {
  add: {
    title: "Add Category Area",
    buttonLabel: "Submit",
  },
  edit: {
    title: "Edit Category Area",
    buttonLabel: "Update",
  },
  delete: {
    title: "Delete Category Area",
    buttonLabel: "Delete",
  },
};

const CategoryAreaFormModal = ({
  isOpen,
  closeModal,
  modalSubmit,
  modalType,
  selectedCategory,
  deleteCategory,
}) => {
  return (
    <Formik
      initialValues={{ name: selectedCategory ? selectedCategory.name : "" }}
      enableReinitialize
      validationSchema={VALIDATION_SCHEMA}
      onSubmit={modalSubmit}
    >
      {({ submitForm, values }) => (
        <Form onSubmit={modalSubmit}>
          <FormModal
            isOpen={isOpen}
            closeModal={() => {
              if (modalType === "delete") {
                modalSubmit({}, null);
                closeModal();
              } else {
                closeModal();
              }
            }}
            onClickButton={() => {
              if (modalType === "delete") {
                deleteCategory();
              } else {
                submitForm();
              }
            }}
            {...MODAL_CONFIG[modalType]}
          >
            <div className="flex flex-col space-y-2 mt-4">
              {modalType === "delete" ? (
                <p>
                  Are you sure you want to delete{" "}
                  <span className="font-bold text-primary capitalize">
                    {values.name}
                  </span>{" "}
                  category? This action cannot be undone.
                </p>
              ) : (
                <Field
                  id="name"
                  label="Category Name"
                  name="name"
                  placeholder="Category Area Name"
                  component={InputWithLabel}
                />
              )}
            </div>
          </FormModal>
        </Form>
      )}
    </Formik>
  );
};

export default CategoryAreaFormModal;
