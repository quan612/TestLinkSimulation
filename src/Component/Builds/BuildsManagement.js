import React from "react";
import { TableWithSearchWithLoading } from "../Containers/TableWithSearchContainer";

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

const BuildsManagement = ({ isLoading, selectTestPlan, builds, handleOnAdd, handleOnDelete }) => {
  return (
    <TableWithSearchWithLoading
      isLoading={isLoading}
      title={selectTestPlan && `Builds Management - Test Plan ${selectTestPlan.name}`}
      tableItems={builds}
      handleOnAdd={handleOnAdd}
      handleOnDelete={handleOnDelete}
      columns={COLUMNS}
    />
  );
};

export default BuildsManagement;
