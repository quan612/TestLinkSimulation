import React from "react";
import TableWithSearchContainer from "../Containers/TableWithSearchContainer";
import WithLoading from "../HOC/withLoading";

const COLUMNS = {
  name: {
    label: "Name",
    width: "30%"
  },
  notes: {
    label: "Description",
    width: "45%"
  },
  release_date: {
    label: "Release Date",
    width: "10%"
  },
  active: {
    label: "Active",
    width: "5%"
  },
  is_open: {
    label: "Open",
    width: "5%"
  },
  Utils: {
    label: "Utils",
    width: "5%"
  }
};

const BuildsManagement = ({ isLoading, builds, handleOnAdd, handleOnDelete }) => {
  return (
    <TableWithSearchContainer
      isLoading={isLoading}
      title="Builds Management"
      tableItems={builds}
      handleOnAdd={handleOnAdd}
      handleOnDelete={handleOnDelete}
      columns={COLUMNS}
    />
  );
};
const BuildsManagementWithLoading = WithLoading(BuildsManagement);
export default BuildsManagementWithLoading;
