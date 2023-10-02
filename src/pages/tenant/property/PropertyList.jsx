import React, { useEffect } from "react";
import TableWithSortHeader from "../../../components/tables/TableWithSortHeader";
import { useNavigate } from "react-router-dom";
import api from "../../../shared/api";
import GeneralModal from "../../../components/modals/GeneralModal";
import Dropdown from "../../../components/dropdown/Dropdown";
import LoadingCard from "../../../components/cards/LoadingCard";

function PropertyList() {
  const navigate = useNavigate();
  const [tableData, setTableData] = React.useState([]);
  const [isDelete, setIsDelete] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  const [locationList, setLocationList] = React.useState([]);
  const [selectedLocation, setSelectedLocation] = React.useState(null);
  const [pagination, setPagination] = React.useState(null);
  const [propertyTypes, setPropertyTypes] = React.useState([]);
  const [selectedPropertyType, setSelectedPropertyType] = React.useState(null);
  const [sortBy, setSortBy] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  function fetchProperties(filter, sort, page, perpage, filterType) {
    setIsLoading(true);
    const query = [];
    if (filter) query.push(`filter=${filter}`);
    if (page) query.push(`page=${page}`);
    if (perpage) query.push(`perPage=${perpage}`);
    if (filterType) query.push(`filterType=${filterType}`);
    if (sort) query.push(`sortBy=${sort ? sort : sortBy}`);

    const queryString = query.length ? `?${query.join("&")}` : "";
    return api.get(`/property/mine${queryString}`).finally(() => {
      setIsLoading(false);
    });
  }

  function handleError(error) {
    console.error("API error:", error);
  }

  function ModalButton({ label, onClick, className }) {
    return (
      <button
        onClick={onClick}
        className={`${className} border rounded-md h-10 w-[80px] cursor-pointer hover:opacity-95`}
      >
        {label}
      </button>
    );
  }

  useEffect(() => {
    handlePaginationChange(1); // Initial call to populate data
    getAllLocation();
    getPropertyTypes();
  }, []);

  const getAllLocation = () => {
    api
      .get("/location/all")
      .then((res) => {
        setLocationList([{ id: 0, city: "All" }, ...res.data.data]);
        setSelectedLocation({ id: 0, city: "All" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getPropertyTypes = () => {
    api
      .get("/property-type/all")
      .then((res) => {
        setPropertyTypes([{ id: 0, name: "All" }, ...res.data.data]);
        setSelectedPropertyType({ id: 0, name: "All" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onAddHandler = () => {
    navigate("/my-property/add");
  };

  const onSelectHandler = (property) => {
    navigate(`/my-property/${property.id}/`);
  };

  const onDeleteHandler = async (property) => {
    setIsDelete(true);
    setSelected(property);
  };

  const deleteProperty = async () => {
    setIsLoading(true);
    try {
      await api.delete(`/property/delete/${selected.id}`);
      fetchProperties(
        selectedLocation?.id ?? undefined,
        sortBy ?? undefined,
        pagination?.page ?? undefined,
        10,
        selectedPropertyType?.id ?? undefined
      )
        .then(({ data }) => {
          const response = data.data?.map((property) => {
            return {
              id: property.id,
              name: property.name,
              location: property.Location.city,
              type: property.Property_type.name,
            };
          });
          setPagination(data.pagination);
          setTableData(response);
        })
        .catch(handleError);
      setIsDelete(false);
      setSelected(null);
    } catch (error) {
      console.log("error", error);
    }
    setIsLoading(false);
  };

  const renderFilter = () => {
    return (
      <div className=" flex flex-row space-x-5">
        <Dropdown
          selected={selectedLocation}
          labelField="city"
          className="w-full"
          label={`Location`}
          items={locationList}
          onItemChange={handleCityFilter}
        />
        <Dropdown
          selected={selectedPropertyType}
          labelField="name"
          className="w-full"
          label={`Property Type`}
          items={propertyTypes}
          onItemChange={handlePropertyTypeFilter}
        />
      </div>
    );
  };

  const handleCityFilter = async (property) => {
    setSelectedLocation(property);
    if (property.id === 0) {
      return fetchProperties(
        undefined,
        sortBy ?? undefined,
        pagination?.page ?? undefined,
        10,
        selectedPropertyType?.id ?? undefined
      )
        .then(({ data }) => {
          const response = data.data?.map((property) => {
            return {
              id: property.id,
              name: property.name,
              location: property.Location.city,
              type: property.Property_type.name,
            };
          });
          setPagination(data.pagination);
          setTableData(response);
        })
        .catch(handleError);
    }
    return fetchProperties(
      property.id,
      sortBy ?? undefined,
      pagination?.page ?? undefined,
      10,
      selectedPropertyType?.id ?? undefined
    )
      .then(({ data }) => {
        const response = data.data?.map((property) => {
          return {
            id: property.id,
            name: property.name,
            location: property.Location.city,
            type: property.Property_type.name,
          };
        });
        setPagination(data.pagination);
        setTableData(response);
      })
      .catch(handleError);
  };

  const handlePropertyTypeFilter = async (propertyType) => {
    setSelectedPropertyType(propertyType);
    if (propertyType.id === 0) {
      return handlePaginationChange(1);
    } else {
      return fetchProperties(
        selectedLocation?.id ?? undefined,
        sortBy ?? undefined,
        pagination?.page ?? undefined,
        10,
        propertyType.id
      )
        .then(({ data }) => {
          const response = data.data?.map((property) => {
            return {
              id: property.id,
              name: property.name,
              location: property.Location.city,
              type: property.Property_type.name,
            };
          });
          setPagination(data.pagination);
          setTableData(response);
        })
        .catch(handleError);
    }
  };

  const handleSort = async (sortValue) => {
    setSortBy(sortValue);
    fetchProperties(
      selectedLocation?.id ?? undefined,
      sortValue,
      pagination?.page ?? undefined,
      10,
      selectedPropertyType?.id ?? undefined
    )
      .then(({ data }) => {
        const response = data.data?.map((property) => {
          return {
            id: property.id,
            name: property.name,
            location: property.Location.city,
            type: property.Property_type.name,
          };
        });
        setPagination(data.pagination);
        setTableData(response);
      })
      .catch(handleError);
  };

  const handlePaginationChange = async (page) => {
    fetchProperties(
      selectedLocation?.id ?? undefined,
      sortBy ?? undefined,
      page ?? undefined,
      10,
      selectedPropertyType
        ? selectedPropertyType.id === 0
          ? undefined
          : undefined
        : undefined
    )
      .then(({ data }) => {
        const response = data.data?.map((property) => {
          return {
            id: property.id,
            name: property.name,
            location: property.Location.city,
            type: property.Property_type.name,
          };
        });
        setPagination(data.pagination);
        setTableData(response);
      })
      .catch(handleError);
  };

  return (
    <div className="max-w-none w-full mx-0">
      <GeneralModal isOpen={isLoading} closeModal={setIsLoading}>
        <LoadingCard />
      </GeneralModal>
      <GeneralModal
        isOpen={isDelete}
        closeModal={setIsDelete}
        title="Delete Property"
      >
        <div className="py-3">
          <p>
            Are you sure you want to delete this property{" "}
            <span className="font-bold">{selected?.name}</span>? This action
            cannot be undone.
          </p>
          <div className="flex flex-row space-x-3 justify-end mt-5">
            <ModalButton
              label="Cancel"
              onClick={() => setIsDelete(false)}
              className=""
            />
            <ModalButton
              label="Delete"
              onClick={deleteProperty}
              className="bg-red-400 text-white"
            />
          </div>
        </div>
      </GeneralModal>

      <TableWithSortHeader
        title={"Property List"}
        description={"List of your own properties"}
        addHandler={onAddHandler}
        data={tableData}
        onEdit={onSelectHandler}
        onDelete={onDeleteHandler}
        subheaderwidget={renderFilter()}
        sortableHeaderNames={["name"]}
        handleSort={handleSort}
        pagination={pagination}
        onChangePagination={handlePaginationChange}
      />
    </div>
  );
}

export default PropertyList;
