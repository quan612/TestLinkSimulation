import React from "react";
import TableWithSearchContainer from "../Containers/TableWithSearchContainer";

const COLUMNS = {
  name: {
    label: "Name",
    width: "30%"
  },
  notes: {
    label: "Description",
    width: "40%"
  },
  prefix: {
    label: "Prefix",
    width: "7%"
  },
  issue_tracker_enabled: {
    label: "Issue Tracker",
    width: "9%"
  },
  requirementsEnabled: {
    label: "Requirement",
    width: "8%"
  },
  active: {
    label: "Active",
    width: "5%"
  },
  is_public: {
    label: "Public",
    width: "5%"
  },
  Utils: {
    label: "Utils",
    width: "5%"
  }
};

const TestProjectsManagement = ({ isProjectLoading, testProjects, handleOnAdd, handleOnDelete }) => {
  return (
    <TableWithSearchContainer
      isLoading={isProjectLoading}
      title="Test Projects Management"
      tableItems={testProjects}
      handleOnAdd={handleOnAdd}
      handleOnDelete={handleOnDelete}
      columns={COLUMNS}
    />
  );
};

export default TestProjectsManagement;
