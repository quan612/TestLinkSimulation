import React from "react";
import Pagination from "../Common/Pagination";

const withPagination = Component => {
  return function withPaginationComponent({ listOfItems, ...props }) {
    return (
      <Pagination
        items={listOfItems}
        render={paginatedItems => <Component listOfItems={paginatedItems} {...props} />}
      />
    );
  };
};

export default withPagination;
