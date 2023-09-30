import React from "react";
import { Field } from "formik";
import FormSection from "./FormSection";
import InputWithLabel from "../../../textInputs/InputWithLabel";
import TextAreaWithLabel from "../../../textInputs/TextAreaWithLabel";
import Dropdown from "../../../dropdown/Dropdown";

const BuildingDetailForm = ({
  values,
  errors,
  touched,
  setFieldValue,
  propertyTypes,
  locations,
  categoryAreas,
}) => (
  <div className="space-y-2">
    <label className="text-base font-bold text-gray-700">Building Detail</label>
    <p className="text-sm text-gray-700 pb-5 max-w-[700px]">
      Update essential details about your property in this section. From basic
      information to pricing, make all necessary modifications here.
    </p>
    <FormSection>
      <Field
        name="name"
        label="Name"
        placeholder="Property Name"
        component={InputWithLabel}
      />
      <Dropdown
        items={propertyTypes}
        onItemChange={(e) => setFieldValue("propertyType", e)}
        selected={values.propertyType}
        labelField={"name"}
        label={"Property Type"}
        error={touched.propertyType && errors.propertyType}
      />
    </FormSection>
    <FormSection>
      <Dropdown
        items={locations}
        onItemChange={(e) => setFieldValue("location", e)}
        selected={values.location}
        labelField={"city"}
        label={"Location"}
        error={touched.location && errors.location}
      />
      <Dropdown
        items={categoryAreas}
        onItemChange={(e) => setFieldValue("categoryArea", e)}
        selected={values.categoryArea}
        labelField={"name"}
        label={"Category Area"}
        error={touched.categoryArea && errors.categoryArea}
      />
    </FormSection>
    <FormSection>
      <Field
        name="description"
        label="Description"
        placeholder="Property Description"
        component={TextAreaWithLabel}
      />
    </FormSection>
  </div>
);

export default BuildingDetailForm;
