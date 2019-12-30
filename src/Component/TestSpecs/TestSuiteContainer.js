import React, { useState } from "react";
import { useSelector } from "react-redux";
import AddTestSuite from "./AddTestSuite";
import EditTestSuite from "./EditTestSuite";
import DeleteTestSuite from "./DeleteTestSuite";
import TestSuiteDetails from "./TestSuiteDetails";
import AddTestCase from "./AddTestCase";

const TestSuiteContainer = ({ selectedTestItem }) => {
  const [isEditTestSuite, setEditTestSuite] = useState(false);
  const [isAddTestSuite, setAddTestSuite] = useState(false);
  const [isDeleteTestSuite, setDeleteTestSuite] = useState(false);
  const [isAddTestCase, setAddTestCase] = useState(false);

  const { selectedProject } = useSelector(state => ({
    selectedProject: state.selectedProject
  }));

  if (isAddTestSuite) {
    return (
      <AddTestSuite
        selectedProject={selectedProject}
        selectedTestItem={selectedTestItem}
        onClose={() => setAddTestSuite(false)}
      />
    );
  }

  if (isEditTestSuite) {
    return (
      <EditTestSuite
        selectedProject={selectedProject}
        selectedTestSuite={selectedTestItem}
        onClose={() => setEditTestSuite(false)}
      />
    );
  }

  if (isDeleteTestSuite)
    return <DeleteTestSuite selectedTestItem={selectedTestItem} onClose={() => setDeleteTestSuite(false)} />;

  if (isAddTestCase) {
    return (
      <AddTestCase
        selectedProject={selectedProject}
        selectedTestSuite={selectedTestItem}
        onClose={() => setAddTestCase(false)}
      />
    );
  }

  return (
    <TestSuiteDetails
      selectedSuite={selectedTestItem}
      onAddTestSuite={() => setAddTestSuite(true)}
      onEditTestSuite={() => setEditTestSuite(true)}
      onDeleteTestSuite={() => setDeleteTestSuite(true)}
      OnAddTestCase={() => setAddTestCase(true)}
    />
  );
};

export default TestSuiteContainer;
