import React, { useState } from "react";
import PropTypes from "prop-types";

import PaginationStyles from "../styles/PaginationStyles";

/**
 * Helper method to get range of items to be rendered based on current selected page
 * getRangeOfItemsBasedOnPageIndex([1,2,3,4,5,6,7,8,9,10], 5, 2) => [6,7,8,9,10]
 */
const getRangeOfItemsBasedOnPageIndex = (arrayOfItems = [], pageLimit, currentPage) => {
  return arrayOfItems.filter((item, index) => {
    let startIndex = pageLimit * currentPage - pageLimit;
    if (index >= startIndex && index <= startIndex + pageLimit - 1) return item;
  });
};

const Pagination = ({ items, pageLimit = 5, pageNeighbours = 0, render }) => {
  const [currentPage, setCurrentPage] = useState(1);
  let totalRecords = items ? items.length : [].length;
  let totalPages = totalRecords === 0 ? 1 : Math.ceil(totalRecords / pageLimit);

  //showing the first pagination
  let numOfItem = getRangeOfItemsBasedOnPageIndex(items, pageLimit, currentPage);

  const handlePageChange = number => {
    setCurrentPage(prevState => prevState + number);
    numOfItem = getRangeOfItemsBasedOnPageIndex(items, pageLimit, currentPage);
  };

  return (
    <PaginationStyles>
      <div className="pagination">
        <button disabled={currentPage === 1} onClick={() => handlePageChange(-1)}>
          Previous
        </button>

        <p>
          Page {currentPage} of {totalPages}
        </p>

        <button disabled={currentPage === totalPages} onClick={() => handlePageChange(1)}>
          Next
        </button>
      </div>
      <div className="children">{render(numOfItem)}</div>
    </PaginationStyles>
  );
};

// Pagination.propTypes = {
//   totalRecords: PropTypes.number.isRequired,
//   pageLimit: PropTypes.number,
//   pageNeighbours: PropTypes.number,
//   onPageChanged: PropTypes.func
// };

export default Pagination;
