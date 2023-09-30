import Button from "../buttons/Button";
import TableContentGroupedRows from "./TableContentGroupedRows";

// Main component
export default function TableWithGroupedRows({
  title,
  description,
  addHandler,
  data,
  onEdit,
  onDelete,
  arrayKey,
}) {
  const groupedRows = data ?? [];
  const groupedDataContent =
    data?.flatMap((res) =>
      res[arrayKey].map(({ roomId, id, ...rest }) => rest)
    ) ?? [];
  const headers =
    groupedDataContent.length > 0 ? Object.keys(groupedDataContent[0]) : [];

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
          <Button
            onClick={addHandler}
            label={`Add ${title}`}
            className={"w-[150px]"}
          />
        </div>
      </div>
      <TableContentGroupedRows
        groupedRows={groupedRows}
        headers={headers}
        onEdit={onEdit}
        onDelete={onDelete}
        arrayKey={arrayKey}
      />
    </div>
  );
}
