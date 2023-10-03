import React, { useEffect, useRef, useState } from "react";
import api from "../../../../shared/api";
import { useParams } from "react-router-dom";
import LoadingCard from "../../../../components/cards/LoadingCard";
import PropertyRoomForm from "../../../../components/forms/property/PropertyDetailForm/PropertyRoomForm";
import { Buffer } from "buffer";
import { toast } from "react-hot-toast";
import { mapRoomData } from "./dataMapper";
import GeneralModal from "../../../../components/modals/GeneralModal";

function PropertyRoom() {
  const { propertyId } = useParams();
  const propertyDetailRef = useRef();
  const [isLoading, setIsLoading] = useState(true);
  const [deletedExistingRoom, setDeletedExistingRoom] = useState([]);
  const [initialValues, setInitialValues] = useState({
    rooms: [],
    existingRooms: [],
  });

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      const res = await api.get(`/room/all/${propertyId}`);
      const existingRooms = res.data.data.map(mapRoomData);
      setInitialValues({ ...initialValues, existingRooms });
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  };

  const handleImageFile = (fileData) => {
    if (fileData) {
      const base64Data = fileData.split(",")[1];
      if (base64Data) {
        const buffer = Buffer.from(base64Data, "base64");
        console.log("file", new Blob([buffer], { type: "image/jpeg" }));
        return new Blob([buffer], { type: "image/jpeg" });
      }
    }
    return null;
  };

  const handleFormSubmit = async (values) => {
    setIsLoading(true);
    try {
      const roomPromises = [];

      // Handling rooms for creation, update, and deletion
      if (values && values.rooms.length > 0) {
        roomPromises.push(...handleRoomCreation(values.rooms));
      }
      if (values && values.existingRooms.length > 0) {
        roomPromises.push(...handleRoomUpdate(values.existingRooms));
      }
      if (deletedExistingRoom.length > 0) {
        roomPromises.push(...handleRoomDeletion(deletedExistingRoom));
      }
      await Promise.all(roomPromises);
      toast.success("Successfully updated!");
      fetchAllData();
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      toast.error(err.response.data.error);
    }
  };

  const handleRoomCreation = (rooms) => {
    if (rooms && rooms.length > 0) {
      return rooms.map((room) => {
        const formData = new FormData();
        formData.append("propId", propertyId);
        formData.append("name", room.name);
        formData.append("description", room.description);
        formData.append("price", room.basePrice);
        if (room.roomImage) {
          formData.append("file", handleImageFile(room.roomImage));
        }
        return createRoom(formData);
      });
    }
    return [];
  };

  const handleRoomUpdate = (existingRooms) => {
    if (existingRooms && existingRooms.length > 0) {
      return existingRooms.map((room) => {
        console.log(room);
        const file = handleImageFile(room.roomImage);
        console.log(file);
        return updateRoom(room.id, {
          name: room.name,
          description: room.description,
          price: room.basePrice,
          file,
        });
      });
    }
    return [];
  };

  const handleRoomDeletion = (rooms) => {
    if (rooms && rooms.length > 0) {
      return rooms.map((room) => deleteRoom(room.id));
    }
    return [];
  };

  const createRoom = async (formData) => {
    try {
      await api.post("/room/create", formData);
    } catch (error) {
      console.error("Error creating room:", error);
      throw error;
    }
  };

  const updateRoom = async (id, room) => {
    const formData = new FormData();
    formData.append("propId", propertyId);
    formData.append("name", room.name);
    formData.append("description", room.description);
    formData.append("price", room.price);

    if (room.file) {
      formData.append("file", room.file, "image.png"); // Appending the blob directly
    }
    try {
      await api.patch(`/room/edit/${id}`, formData);
    } catch (error) {
      console.error("Error updating room:", error);
      throw error;
    }
  };

  const deleteRoom = async (id) => {
    try {
      await api.delete(`/room/delete/${id}`);
    } catch (error) {
      console.error("Error deleting room:", error);
      throw error;
    }
  };

  return (
    <div className="mt-5">
      <GeneralModal isOpen={isLoading} closeModal={setIsLoading}>
        <LoadingCard />
      </GeneralModal>
      <PropertyRoomForm
        ref={propertyDetailRef}
        initialValues={initialValues}
        onSubmit={handleFormSubmit}
        submitLabel={"Update Room"}
        setDeletedExistingRoom={(room) => {
          setDeletedExistingRoom([...deletedExistingRoom, room]);
        }}
      />
    </div>
  );
}

export default PropertyRoom;
