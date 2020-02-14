import React, { useState } from "react";
import { useSelector } from "react-redux";
import AddTestSuite from "./AddTestSuite";
import EditTestSuite from "./EditTestSuite";
import DeleteTestSuite from "./DeleteTestSuite";
import AddTestCase from "./AddTestCase";
import TestSuiteDetails from "./TestSuiteDetails";

const TestSuiteContainer = ({ testSuite }) => {
  const [isEditTestSuite, setEditTestSuite] = useState(false);
  const [isAddTestSuite, setAddTestSuite] = useState(false);
  const [isDeleteTestSuite, setDeleteTestSuite] = useState(false);
  const [isAddTestCase, setAddTestCase] = useState(false);

  const { selectedProject } = useSelector(state => ({
    selectedProject: state.selectedProject
  }));

  if (isAddTestSuite)
    return (
      <AddTestSuite selectedProject={selectedProject} parentSuite={testSuite} onClose={() => setAddTestSuite(false)} />
    );

  if (isEditTestSuite)
    return (
      <EditTestSuite selectedProject={selectedProject} testSuite={testSuite} onClose={() => setEditTestSuite(false)} />
    );

  if (isDeleteTestSuite) return <DeleteTestSuite testSuite={testSuite} onClose={() => setDeleteTestSuite(false)} />;

  if (isAddTestCase) {
    return (
      <AddTestCase selectedProject={selectedProject} parentSuite={testSuite} onClose={() => setAddTestCase(false)} />
    );
  }

  return (
    <TestSuiteDetails
      selectedProject={selectedProject}
      testSuite={testSuite}
      onAddTestSuite={() => setAddTestSuite(true)}
      onEditTestSuite={() => setEditTestSuite(true)}
      onDeleteTestSuite={() => setDeleteTestSuite(true)}
      onAddTestCase={() => setAddTestCase(true)}
    />
  );
};

export default TestSuiteContainer;
