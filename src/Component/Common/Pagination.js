import React, { Component, Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";

/**
 * Helper method to get range of items to be rendered based on current selected page
 * getRangeOfItemsBasedOnPageIndex([1,2,3,4,5,6,7,8,9,10], 5, 2) => [6,7,8,9,10]
 */

const getRangeOfItemsBasedOnPageIndex = (arrayOfItem = [], pageLimit, currentPage) => {
  return arrayOfItem.filter((item, index) => {
    let startIndex = pageLimit * currentPage - 1;
    if (index >= startIndex && index <= startIndex + pageLimit - 1) return item;
  });
};

const Pagination = ({ items, totalRecords = null, pageLimit = 4, pageNeighbours = 0, render }) => {
  const [currentPage, setCurrentPage] = useState(1);

  let totalPages = Math.ceil(totalRecords / pageLimit);

  //showing the first pagination
  let numOfItem = getRangeOfItemsBasedOnPageIndex(items, pageLimit, currentPage);

  const handlePageChange = number => {
    setCurrentPage(prevState => prevState + number);
    numOfItem = getRangeOfItemsBasedOnPageIndex(items, pageLimit, currentPage);
  };

  return (
    <>
      <Button disabled={currentPage === 1} onClick={() => handlePageChange(-1)}>
        Previous
      </Button>
      <Button>
        Page {currentPage} of {totalPages}
      </Button>
      <Button disabled={currentPage === totalPages} onClick={() => handlePageChange(1)}>
        Next
      </Button>
      {render(numOfItem)}
    </>
  );
};

// Pagination.propTypes = {
//   totalRecords: PropTypes.number.isRequired,
//   pageLimit: PropTypes.number,
//   pageNeighbours: PropTypes.number,
//   onPageChanged: PropTypes.func
// };

export default Pagination;
