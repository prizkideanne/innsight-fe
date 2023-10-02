import React, { useEffect, useState } from "react";
import TableWithSortHeader from "../../components/tables/TableWithSortHeader";
import api from "../../shared/api";
import CategoryAreaFormModal from "../../components/modals/CategoryAreaFormModal";
import GeneralModal from "../../components/modals/GeneralModal";
import LoadingCard from "../../components/cards/LoadingCard";
import toast from "react-hot-toast";

function CategoryArea() {
  const [modalType, setModalType] = useState("add");
  const [isOpen, setIsOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Handlers for add, edit, and delete
  const onAddHandler = () => setModal("add");
  const onEditHandler = (value) => setModal("edit", value);
  const onDeleteHandler = (value) => setModal("delete", value);

  // Set modal type and selected category
  const setModal = (type, value = null) => {
    setModalType(type);
    setSelectedCategory(value);
    setIsOpen(true);
  };

  // Fetch categories from API
  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get("/category-area/mine");
      const response =
        data && data.data && data.data.length
          ? data.data.map((item) => ({ id: item.id, name: item.name }))
          : [];
      setTableData(response);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
    setIsLoading(false);
  };

  // Add, edit, and delete category functions
  const addCategory = (name) =>
    modifyCategory("post", "/category-area/create", { categoryArea: name });
  const editCategory = (name) =>
    modifyCategory("patch", `/category-area/edit/${selectedCategory.id}`, {
      newName: name,
    });
  const deleteCategory = () =>
    modifyCategory("delete", `/category-area/delete/${selectedCategory.id}`);

  // Generic function to modify categories
  const modifyCategory = async (method, url, data = {}) => {
    setIsLoading(true);
    try {
      const response = await api[method](url, data);
      const message = response.data.message;
      if (message.toLowerCase().includes("success")) {
        fetchCategories();
        setIsOpen(false);
        setSelectedCategory(null);
      } else {
        toast.error(message, {
          duration: 3000,
        });
        setIsOpen(false);
      }
    } catch (error) {
      console.error("Error modifying category:", error);
    }
    setIsLoading(false);
  };

  // Close modal
  const closeModal = () => setIsOpen(false);

  // Submit form based on modal type
  const modalSubmit = (values, formikBag) => {
    if (modalType === "add") addCategory(values.name);
    if (modalType === "edit") editCategory(values.name);
    if (formikBag) {
      const { setSubmitting, resetForm } = formikBag;
      setSubmitting(false);
      resetForm();
    }
  };

  return (
    <>
      <GeneralModal isOpen={isLoading} closeModal={setIsLoading}>
        <LoadingCard />
      </GeneralModal>
      <CategoryAreaFormModal
        closeModal={closeModal}
        isOpen={isOpen}
        modalSubmit={modalSubmit}
        deleteCategory={deleteCategory}
        modalType={modalType}
        selectedCategory={selectedCategory}
      />
      <TableWithSortHeader
        title={"Category Area"}
        description={"List of your own made category area"}
        addHandler={onAddHandler}
        data={tableData}
        onEdit={onEditHandler}
        onDelete={onDeleteHandler}
      />
    </>
  );
}

export default CategoryArea;
