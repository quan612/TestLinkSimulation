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
  testcases: {
    label: "TestCase#",
    width: "7%"
  },
  builds: {
    label: "Build#",
    width: "9%"
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

const TestPlanManagement = ({ selectedProject, isTestPlanLoading, testPlans, handleOnAdd, handleOnDelete }) => {
  return (
    <TableWithSearchContainer
      isLoading={isTestPlanLoading}
      title={selectedProject && `Test Plans Management - Test Project: ${selectedProject.name}`}
      tableItems={testPlans}
      handleOnAdd={handleOnAdd}
      handleOnDelete={handleOnDelete}
      columns={COLUMNS}
    />
  );
};

export default TestPlanManagement;
