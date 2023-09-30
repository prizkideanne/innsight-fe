import React, { forwardRef } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Button from "../../../buttons/Button";
import BuildingImageUpload from "../BuildingImageUpload";
import BuildingDetailForm from "./BuildingDetailForm";

const PropertyEditForm = forwardRef(
  (
    {
      initialValues,
      onSubmit,
      propertyTypes,
      locations,
      categoryAreas,
      submitLabel,
      setDeletedImages,
    },
    ref
  ) => {
    const validationSchema = Yup.object().shape({
      name: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
      propertyType: Yup.object().nullable().required("Required"),
      location: Yup.object().nullable().required("Required"),
      categoryArea: Yup.object().nullable().required("Required"),
      images: Yup.array()
        .min(1, "At least one image is required")
        .max(6, "Maximum of 6 images only")
        .test("fileSize", "Each image must be 1 MB or less", (images) => {
          if (!images) return false;

          // Iterate through each image and check if it's less than or equal to 1 MB
          for (const image of images) {
            if (typeof image === "string") {
              const base64Length = image.length - image.indexOf(",") - 1;
              const bufferLength =
                base64Length * 0.75 -
                (image.split("base64,")[0].length -
                  image.split(",").length +
                  1);
              const sizeInMB = bufferLength / (1024 * 1024);
              if (sizeInMB > 1) return false;
            }
          }

          return true;
        })
        .required("Required"),
    });

    return (
      <Formik
        innerRef={ref}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ setFieldValue, values, errors, touched }) => (
          <Form className="space-y-12">
            <BuildingDetailForm
              values={values}
              errors={errors}
              touched={touched}
              setFieldValue={setFieldValue}
              propertyTypes={propertyTypes}
              locations={locations}
              categoryAreas={categoryAreas}
            />

            <div>
              <label className="block text-base font-bold text-gray-700">
                Building Images
              </label>
              <BuildingImageUpload
                images={values.images}
                onImagesChange={(newImages) =>
                  setFieldValue("images", newImages)
                }
                setDeletedImages={setDeletedImages}
              />
              {errors.images && touched.images && (
                <p className="text-red-500 text-xs mt-1">{errors.images}</p>
              )}
            </div>
            <div className="w-full flex justify-end">
              <Button
                type="submit"
                label={submitLabel}
                className={"max-w-[150px] mt-10"}
              />
            </div>
          </Form>
        )}
      </Formik>
    );
  }
);

export default PropertyEditForm;
