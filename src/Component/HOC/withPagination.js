import React from "react";
import Pagination from "../Common/Pagination";

const withPagination = Component => {
  return function withPaginationComponent({ props }) {
    return (
      <Pagination>
        <Component />
      </Pagination>
    );
  };
};
