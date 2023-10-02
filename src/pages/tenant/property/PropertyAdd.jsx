import React, { useEffect, useRef, useState } from "react";
import api from "../../../shared/api";
import { Buffer } from "buffer";
import GeneralModal from "../../../components/modals/GeneralModal";
import { useNavigate } from "react-router-dom";
import PropertyAddForm from "../../../components/forms/property/PropertyDetailForm/PropertyAddForm";
import LoadingCard from "../../../components/cards/LoadingCard";
import { toast } from "react-hot-toast";

function PropertyAdd() {
  const propertyDetailRef = useRef();
  const navigate = useNavigate();
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [locations, setLocations] = useState([]);
  const [categoryAreas, setCategoryAreas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    name: "",
    description: "",
    propertyType: null,
    location: null,
    categoryArea: null,
    images: [],
    rooms: [
      {
        name: "",
        roomImage: null,
        description: "",
        basePrice: "",
      },
    ],
  };

  useEffect(() => {
    fetchData("/property-type/all", "propertyTypes");
    fetchData("/location/all", "locations");
    fetchData("/category-area/all", "categoryAreas");
  }, []);

  const fetchData = async (url, key) => {
    try {
      const res = await api.get(url);
      if (key === "propertyTypes") {
        setPropertyTypes(res.data.data);
      } else if (key === "locations") {
        setLocations(res.data.data);
      } else if (key === "categoryAreas") {
        setCategoryAreas(res.data.data);
      }
    } catch (err) {
      console.error(err);
      // Add your error handling logic here
    }
  };

  const handleFormSubmit = async (values, { setSubmitting }) => {
    setIsLoading(true);
    setSubmitting(false);
    const propertyId = await createProperty(values);
    const createRoomsProcess = await createRooms(propertyId, values.rooms);
    const uploadImagesProcess = await uploadImages(propertyId, values.images);
    const process = Promise.all([createRoomsProcess, uploadImagesProcess]);
    try {
      const values = await process;
      console.log("values", values);
      navigate("/");
    } catch (error) {
      console.error("An error occurred:", error);
    }
    setIsLoading(false);
  };

  const createProperty = async (values) => {
    return api
      .post("/property/create", {
        name: values.name,
        locationId: values.location.id,
        propTypeId: values.propertyType.id,
        catAreaId: values.categoryArea.id,
        description: values.description,
      })
      .then(({ data }) => data.data.id)
      .catch((err) => {
        console.error("property err", err);
        return Promise.reject(err);
      });
  };

  const createRooms = async (propId, rooms) => {
    for (const room of rooms) {
      const { name, description, basePrice, roomImage } = room;

      // Convert the base64 image to a Buffer
      const base64Data = roomImage.split(",")[1];
      const buffer = Buffer.from(base64Data, "base64");

      // Create the payload
      const formData = new FormData();
      formData.append("propId", propId);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", basePrice);
      formData.append("file", new Blob([buffer], { type: "image/png" }));

      try {
        const response = await api.post("/room/create", formData);
        if (response.status !== 200) {
          throw new Error(`Failed to upload room: ${name}`);
        }

        // Handle the response as needed
        const result = await response.data;
        console.log(`Room ${name} uploaded successfully`, result);
      } catch (error) {
        console.error(`Error uploading room: ${name}`, error);
        if (error.response) {
          toast.error(error.response.data.error);
        }
        return Promise.reject(error);
      }
    }
  };

  const uploadImages = async (propId, images) => {
    const formData = new FormData();

    formData.append("propId", propId);

    // Append the images to the FormData object
    images.forEach((image, index) => {
      // Extract the base64 data
      const base64Data = image.split(",")[1];

      // Convert the base64 data to a Buffer
      const buffer = Buffer.from(base64Data, "base64");

      // Convert the buffer to a Blob and append it to the FormData
      const blob = new Blob([buffer], { type: "image/png" });
      formData.append(`files`, blob);
    });

    try {
      const response = await api.post("/property/add-photos", formData);

      if (response.status !== 200) {
        throw new Error("Failed to upload images");
      }

      // Handle the response as needed
      const result = await response.data;
      console.log("Images uploaded successfully", result);
    } catch (error) {
      console.error("Error uploading images:", error);
      return Promise.reject(error);
    }
  };

  return (
    <div className="flex flex-col bg-white p-4 rounded">
      <GeneralModal isOpen={isLoading} closeModal={setIsLoading}>
        <LoadingCard />
      </GeneralModal>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-lg font-sans font-semibold leading-6 text-gray-900">
            Add Property
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Register your new property
          </p>
        </div>
      </div>

      <div className="mb-4 mt-12 flow-root space-y-4">
        {/* Form input */}
        <PropertyAddForm
          ref={propertyDetailRef}
          initialValues={initialValues}
          onSubmit={handleFormSubmit}
          propertyTypes={propertyTypes}
          locations={locations}
          categoryAreas={categoryAreas}
        />
      </div>
    </div>
  );
}

export default PropertyAdd;
