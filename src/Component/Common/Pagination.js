import React, { Component, Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";

const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";

/**
 * Helper method for creating a range of numbers
 * range(1, 5) => [1, 2, 3, 4, 5]
 */
const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

const Pagination = ({ items, totalRecords = null, pageLimit = 3, pageNeighbours = 0, render }) => {
  //   const { totalRecords = null, pageLimit = 30, pageNeighbours = 0 } = props;
  const [currentPage, setCurrentPage] = useState(1);
  //   this.pageLimit = typeof pageLimit === "number" ? pageLimit : 30;
  //   this.totalRecords = typeof totalRecords === "number" ? totalRecords : 0;

  //   // pageNeighbours can be: 0, 1 or 2
  //   this.pageNeighbours = typeof pageNeighbours === "number" ? Math.max(0, Math.min(pageNeighbours, 2)) : 0;
  // this.state = { currentPage: 1 };
  let totalPages = Math.ceil(totalRecords / pageLimit);
  const handlePageChange = number => {
    setCurrentPage(prevState => prevState + number);
  };
  let numOfItem = items ? items.slice(0, 4) : 1;
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
