import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Pagination from "../pagination/Pagination";
import Button from "../buttons/Button";
import { classNames } from "../../shared/utils";
import { useState } from "react";

export default function TableWithSortHeader({
  title,
  description,
  addHandler,
  data,
  onEdit,
  onDelete,
  onDetail,
  subheaderwidget,
  sortableHeaderNames,
  handleSort,
  pagination,
  onChangePagination,
  emptymessage,
}) {
  const [isAsc, setIsAsc] = useState(false);
  const dataTable = data ? data?.map(({ id, ...rest }) => rest) : [];
  const headers = dataTable.length > 0 ? Object.keys(dataTable[0]) : null;

  return (
    <div className="flex flex-col bg-white p-4 rounded">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            {title}
          </h1>
          <p className="mt-2 text-sm text-gray-700">{description}</p>
        </div>
        <div className="mt-4 sm:ml-16 sm:flex-none sm:w-auto w-full flex justify-end">
          {addHandler && (
            <Button
              onClick={addHandler}
              label={`Add ${title}`}
              className={"w-[150px]"}
            />
          )}
        </div>
      </div>
      {subheaderwidget && <div className="mt-8">{subheaderwidget}</div>}
      {dataTable.length !== 0 ? (
        <>
          <div className="mt-4 mb-4 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      {headers.map((header) => (
                        <th
                          scope="col"
                          className={
                            header === "id"
                              ? "py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                              : "px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          }
                          key={header}
                        >
                          <div
                            className={classNames(
                              "group inline-flex capitalize",
                              sortableHeaderNames &&
                                sortableHeaderNames.includes(header)
                                ? "cursor-pointer"
                                : "cursor-default"
                            )}
                            onClick={() => {
                              sortableHeaderNames &&
                                sortableHeaderNames.includes(header) &&
                                handleSort(isAsc ? "nameAsc" : "nameDesc");
                              setIsAsc(!isAsc);
                            }}
                          >
                            {header}
                            {sortableHeaderNames &&
                              sortableHeaderNames.includes(header) && (
                                <span
                                  className={classNames(
                                    "ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible",
                                    isAsc ? "rotate-180" : "rotate-0"
                                  )}
                                >
                                  <ChevronDownIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              )}
                          </div>
                        </th>
                      ))}
                      <th scope="col" className="relative py-3.5 pl-3 pr-0">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {dataTable.map((res, idx) => (
                      <tr key={idx} className="cursor-pointer">
                        {headers.map((header) => (
                          <td
                            className={`${
                              header === "id"
                                ? "whitespace-nowrap capitalize py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0"
                                : "whitespace-nowrap px-3 py-4 text-sm text-gray-500 capitalize"
                            }`}
                            key={header}
                          >
                            {res[header]}
                          </td>
                        ))}
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm sm:pr-0 space-x-4">
                          {onEdit && (
                            <button
                              onClick={() => onEdit(data[idx])}
                              className="text-sky-600 hover:text-sky-900"
                            >
                              Manage
                            </button>
                          )}
                          {onDelete && (
                            <button
                              onClick={() => onDelete(data[idx])}
                              className="text-white bg-rose-400 px-2 py-1 rounded hover:bg-rose-500"
                            >
                              Delete
                            </button>
                          )}
                          {onDetail && (
                            <button
                              onClick={() => onDetail(data[idx])}
                              className="text-white bg-blue-400 px-2 py-1 rounded hover:bg-blue-500"
                            >
                              Detail
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* <Pagination /> */}
          {pagination && (
            <Pagination
              onChangePage={onChangePagination}
              initialPage={pagination.page}
              totalData={pagination.totalData}
              totalPage={pagination.totalPage}
            />
          )}
        </>
      ) : (
        <p className="mt-40 text-xl text-center w-full">
          Your data seems to be empty.
          <br /> <span className="font-bold">{emptymessage}</span>
        </p>
      )}
    </div>
  );
}

TableWithSortHeader.defaultProps = {
  title: "Title",
  description: "Description",
  emptymessage: "Let's fill it in!",
};
