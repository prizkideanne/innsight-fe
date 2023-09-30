import React, { useEffect, useRef, useState } from "react";
import api from "../../../../shared/api";
import { useParams } from "react-router-dom";
import PropertyEditForm from "../../../../components/forms/property/PropertyDetailForm/PropertyEditForm";
import LoadingCard from "../../../../components/cards/LoadingCard";
import { Buffer } from "buffer";
import { toast } from "react-hot-toast";

function PropertyEdit() {
  const { propertyId } = useParams();
  const propertyDetailRef = useRef();
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [locations, setLocations] = useState([]);
  const [categoryAreas, setCategoryAreas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletedImages, setDeletedImages] = useState([]);
  const [initialValues, setInitialValues] = useState({
    name: "",
    description: "",
    propertyType: null,
    location: null,
    categoryArea: null,
    images: [],
  });

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      await fetchData("/property-type/all", "propertyTypes");
      await fetchData("/location/all", "locations");
      await fetchData("/category-area/all", "categoryAreas");
      await fetchData(`/property/one/${propertyId}`, "propertyDetail");
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchData = async (url, key) => {
    try {
      const res = await api.get(url);
      if (key === "propertyTypes") {
        setPropertyTypes(res.data.data);
      } else if (key === "locations") {
        setLocations(res.data.data);
      } else if (key === "categoryAreas") {
        setCategoryAreas(res.data.data);
      } else if (key === "propertyDetail") {
        const property = res.data.data;
        const data = {
          name: property.name,
          description: property.description,
          propertyType: property.Property_type,
          categoryArea: property.Category_area,
          location: property.Location,
          images: property.Pictures,
        };
        setInitialValues(data);
      }
    } catch (err) {
      console.error(err);
      // error handling logic
    }
  };

  const handleFormSubmit = async (values, { setSubmitting }) => {
    setSubmitting(false);
    try {
      await Promise.all([updateProperty(values), uploadImages(values.images)]);
      toast.success("Successfully updated!");
      fetchAllData();
    } catch (err) {
      console.log("err", err);
      toast.error(err.response.data.error); // You can customize the error message
    }
  };

  const updateProperty = async (values) => {
    return api
      .patch("/property/edit-property/" + propertyId, {
        name: values.name,
        locationId: values.location.id,
        propTypeId: values.propertyType.id,
        catAreaId: values.categoryArea.id,
        description: values.description,
      })
      .then(({ data }) => data.data.id)
      .catch((err) => {
        console.error("property err", err);
        throw err;
      });
  };

  const uploadImages = async (images) => {
    const formData = new FormData();

    formData.append("propId", propertyId);

    if (deletedImages.length > 0) {
      const ids = deletedImages.map((item) => item.id).toString();
      formData.append("ids", ids);
    }

    const isLocalImage = images.filter((image) => typeof image === "string");

    if (isLocalImage.length > 0) {
      // Append the images to the FormData object
      isLocalImage.forEach((image, index) => {
        // Extract the base64 data
        const base64Data = image.split(",")[1];
        // Convert the base64 data to a Buffer
        const buffer = Buffer.from(base64Data, "base64");
        // Convert the buffer to a Blob and append it to the FormData
        const blob = new Blob([buffer], { type: "image/png" });
        formData.append(`files`, blob);
      });
    }

    try {
      const response = await api.post(
        `/property/${propertyId}/photos`,
        formData
      );
      if (response.status !== 200) {
        throw new Error("Failed to upload images");
      }
      // Handle the response as needed
      const result = await response.data;
      console.log("Images uploaded successfully", result);
    } catch (error) {
      console.error("Error uploading images:", error);
      throw error;
    }
  };

  return isLoading ? (
    <div className="bg-gray-900/10 h-[89vh] flex items-center justify-center">
      <div className="w-full max-w-md transform overflow-hidden shadow-md rounded-3xl bg-white p-6 text-left align-middle transition-all">
        <LoadingCard />
      </div>
    </div>
  ) : (
    <div className="mt-5">
      <PropertyEditForm
        ref={propertyDetailRef}
        initialValues={initialValues}
        onSubmit={handleFormSubmit}
        propertyTypes={propertyTypes}
        locations={locations}
        categoryAreas={categoryAreas}
        submitLabel={"Update Property"}
        setDeletedImages={(data) => {
          setDeletedImages([...deletedImages, data]);
        }}
      />
    </div>
  );
}

export default PropertyEdit;
