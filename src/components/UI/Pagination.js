import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const maxPages = 5;
    const halfMaxPages = Math.floor(maxPages / 2);
    const startPage = Math.max(currentPage - halfMaxPages, 1);
    const endPage = Math.min(startPage + maxPages - 1, totalPages);
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  return (
    <div className="items-center space-x-2 bg-gray-100 flex justify-center border-t-2 border-[#2872fa] py-2">
      {currentPage > 1 && ( 
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className="w-8 h-8 px-10 py-5 border-2 border-gray-200 rounded-md flex items-center justify-center"
        >
          Prev
        </button>
      )}

      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-8 h-8  border  rounded-md flex items-center justify-center ${
            page === currentPage ? "bg-[#2872fa] text-white" : ""
          }`}
        >
          {page}
        </button>
      ))}

      {currentPage < totalPages && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="w-8 h-8 px-10 py-5 border-2 border-gray-200 rounded-md flex items-center justify-center"
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;
