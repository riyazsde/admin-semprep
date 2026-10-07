import React, { useState } from "react";
import "./Pagination.css";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const Pagination = ({ totalPages, onPageChange, onLimitChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      if (onPageChange) onPageChange(newPage);
    }
  };

  const handleLimitChange = (event) => {
    const newLimit = parseInt(event.target.value, 10);
    setLimit(newLimit);
    if (onLimitChange) onLimitChange(newLimit);
  };

  const getPageNumbers = () => {
    const maxVisiblePages = window.innerWidth < 768 ? 3 : 5; // Fewer pages on mobile
    const pages = [];

    if (totalPages <= maxVisiblePages) {
      // If total pages are less than max visible, show all
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      // Calculate middle range
      let startPage = Math.max(2, currentPage - Math.floor(maxVisiblePages / 2));
      let endPage = startPage + maxVisiblePages - 2;

      // Adjust if near the end
      if (endPage >= totalPages) {
        endPage = totalPages - 1;
        startPage = endPage - maxVisiblePages + 3;
      }

      // Add ellipsis before middle range if needed
      if (startPage > 2) {
        pages.push("...");
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        if (i < totalPages) {
          pages.push(i);
        }
      }

      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        pages.push("...");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="paginationcontainer">
      <div
        className={`pagination-div ${currentPage === 1 ? "pagination-div-disable" : ""}`}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <MdKeyboardArrowLeft color={currentPage === 1 ? "#ADB5BD" : "#000"} />
      </div>

      {getPageNumbers().map((page, index) => (
        <div
          key={index}
          className={`pagination-div ${
            page === currentPage
              ? "pagination-div-active"
              : page === "..." 
              ? "pagination-div-ellipsis" 
              : ""
          }`}
          onClick={() => typeof page === "number" && handlePageChange(page)}
        >
          <span>{page}</span>
        </div>
      ))}

      <div
        className={`pagination-div ${currentPage === totalPages ? "pagination-div-disable" : ""}`}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        <MdKeyboardArrowRight color={currentPage === totalPages ? "#ADB5BD" : "#000"} />
      </div>

      <div className="pagination-div-limit">
        <select value={limit} onChange={handleLimitChange}>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
        <span>/Page</span>
      </div>
    </div>
  );
};

export default Pagination;