import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { TbArrowLeft, TbArrowRight } from "react-icons/tb";
import Row from "../widget/Row";

export default function Pagination({
  initialPage = 0,
  totalPage = 1,
  onChangePage,
}) {
  const [currentPage, setCurrentPage] = useState(initialPage - 1);

  useEffect(() => {
    setCurrentPage(initialPage - 1);
  }, [initialPage]);

  const onChange = (selectedPage) => {
    const { selected } = selectedPage;
    setCurrentPage(selected);
    onChangePage(selected + 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPage - 1) {
      onChangePage(currentPage + 2);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      onChangePage(currentPage);
    }
  };

  // Check if there's a next or previous page
  const hasNextPage = currentPage < totalPage - 1;
  const hasPrevPage = currentPage > 0;

  return (
    <>
      <ReactPaginate
        forcePage={currentPage}
        pageCount={totalPage}
        breakLabel="..."
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        className="flex flex-row w-full justify-center overflow-x-auto gap-2 border-t border-r-transparent"
        activeClassName="text-blue-600 font-medium border-t border-t-blue-600 p-2"
        pageClassName="text-gray-500 hover:text-blue-600 p-2 grow-1"
        pageLinkClassName="text-gray-500 hover:text-blue-600 mx-1 "
        breakClassName="text-gray-500 hover:text-blue-600 p-2"
        renderOnZeroPageCount={false}
        previousLabel={
          <button
            onClick={handlePrevPage}
            disabled={!hasPrevPage}
            className={`gap-3 flex flex-row ${
              hasPrevPage ? "" : "opacity-50 cursor-not-allowed"
            }`}
          >
            <TbArrowLeft className="h-5 w-5 my-auto" />
            Previous
          </button>
        }
        nextLabel={
          <button
            onClick={handleNextPage}
            disabled={!hasNextPage}
            className={`gap-3 flex flex-row ${
              hasNextPage ? "" : "opacity-50 cursor-not-allowed"
            }`}
          >
            Next
            <TbArrowRight className="h-5 w-5 my-auto" />
          </button>
        }
        previousLinkClassName={`text-gray-500 ${
          hasPrevPage
            ? "hover:text-blue-600 hover:bg-blue-100"
            : "cursor-not-allowed"
        }`}
        nextLinkClassName={`text-gray-500 ${
          hasNextPage
            ? "hover:text-blue-600 hover:bg-blue-100"
            : "cursor-not-allowed"
        }`}
        previousClassName={`p-2 flex flex-1 ${
          hasPrevPage ? "" : "cursor-not-allowed"
        }`}
        nextClassName={`p-2  flex flex-1 justify-end ${
          hasNextPage ? " " : "cursor-not-allowed"
        }`}
        onPageChange={hasPrevPage || hasNextPage ? onChange : undefined}
      />
    </>
  );
}
