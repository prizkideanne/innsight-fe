import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import api from "../../../../shared/api";
import moment from "moment";
import TableWithGroupedRows from "../../../../components/tables/TableWithGroupedRows";
import { mapRoomSpecialPriceData } from "./dataMapper";
import RoomSpecialPriceFormModal from "../../../../components/modals/RoomSpecialPriceFormModal";
import GeneralModal from "../../../../components/modals/GeneralModal";
import LoadingCard from "../../../../components/cards/LoadingCard";

const PropertySpecialPrice = () => {
  const { propertyId } = useParams();
  const [modalType, setModalType] = useState("add");
  const [selectedRoomSpecialPrice, setSelectedRoomSpecialPrice] =
    useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const setModal = useCallback((type, value = null) => {
    setModalType(type);
    setSelectedRoomSpecialPrice(value);
    setIsOpen(true);
  }, []);

  const sortSpecialPricesByUpdatedAt = (data) => {
    return data.map((room) => ({
      ...room,
      Special_prices: room.Special_prices.sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      ),
    }));
  };

  const fetchRoomSpecialPrice = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get(`/special-price/all/${propertyId}`);
      const sortedData = sortSpecialPricesByUpdatedAt(data.data);
      const mappedData = sortedData.length
        ? sortedData.map(mapRoomSpecialPriceData)
        : [];
      setTableData(mappedData);
    } catch (error) {
      console.error("Error fetching room SpecialPrice:", error);
    }
    setModalType("add");
    setSelectedRoomSpecialPrice(null);
    setIsLoading(false);
  }, [propertyId]);

  useEffect(() => {
    fetchRoomSpecialPrice();
  }, [fetchRoomSpecialPrice]);

  const modifySpecialPrice = async (method, url, payload = {}) => {
    setIsLoading(true);
    try {
      await api[method](url, payload);
      fetchRoomSpecialPrice();
      setIsOpen(false);
    } catch (error) {
      console.error("Error modifying category:", error);
    }
    setIsLoading(false);
  };

  const addSpecialPrice = (form) => {
    const payload = {
      roomId: form.room.id,
      specialPrice: form.price,
      startDate: moment(form.startDate).format("YYYY-MM-DD"),
      endDate: moment(form.endDate).format("YYYY-MM-DD"),
    };
    modifySpecialPrice("post", "/special-price/create", payload);
  };

  const editSpecialPrice = (form) => {
    const payload = {
      specialPrice: form.price,
      startDate: moment(form.startDate).format("YYYY-MM-DD"),
      endDate: moment(form.endDate).format("YYYY-MM-DD"),
      isActive: form.isActive,
    };
    modifySpecialPrice(
      "patch",
      `/special-price/edit/${selectedRoomSpecialPrice.id}`,
      payload
    );
  };

  const closeModal = () => setIsOpen(false);

  const modalSubmit = (values, formikBag) => {
    modalType === "add" ? addSpecialPrice(values) : editSpecialPrice(values);
    if (formikBag) {
      formikBag.setSubmitting(false);
      formikBag.resetForm();
    }
  };

  return (
    <>
      <GeneralModal isOpen={isLoading} closeModal={setIsLoading}>
        <LoadingCard />
      </GeneralModal>
      <RoomSpecialPriceFormModal
        closeModal={closeModal}
        isOpen={isOpen}
        modalSubmit={modalSubmit}
        modalType={modalType}
        selectedRoomSpecialPrice={selectedRoomSpecialPrice}
        setSelectedRoomSpecialPrice={setSelectedRoomSpecialPrice}
      />
      <TableWithGroupedRows
        title="Special Price"
        description="Here you can config special price for each room"
        addHandler={() => setModal("add")}
        data={tableData}
        onEdit={(value) => setModal("edit", value)}
        arrayKey="specialPrices"
      />
    </>
  );
};

export default PropertySpecialPrice;
