import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddTestSuite from "./AddTestSuite";
import EditTestSuite from "./EditTestSuite";
import DeleteTestSuite from "./DeleteTestSuite";
import TestSuiteDetails from "./TestSuiteDetails";
import AddTestCase from "./AddTestCase";
import { Container, Row, Col } from "reactstrap";

const TestSuiteContainer = ({ selectedTestItem }) => {
  const [isEditTestSuite, setEditTestSuite] = useState(false);
  const [isAddTestSuite, setAddTestSuite] = useState(false);
  const [isDeleteTestSuite, setDeleteTestSuite] = useState(false);
  const [isCreateCase, setCreateCase] = useState(false);

  const { testLink, selectedProject } = useSelector(state => ({
    testLink: state.testLink,
    selectedProject: state.selectedProject
  }));

  const handleOnAddTestSuite = () => {
    setAddTestSuite(true);
  };

  const handleOnEditTestSuite = () => {
    setEditTestSuite(true);
  };

  const handleOnDeleteTestSuite = () => {
    setDeleteTestSuite(true);
  };

  const handleOnAddTestCase = () => {
    setCreateCase(true);
  };

  const handleRenderComponents = () => {
    if (isAddTestSuite) {
      return (
        <AddTestSuite
          testLink={testLink}
          selectedProject={selectedProject}
          selectedTestItem={selectedTestItem}
          onSave={() => setAddTestSuite(false)}
          onCancel={() => setAddTestSuite(false)}
          isTopLevel={false}
        />
      );
    }

    if (isEditTestSuite) {
      return (
        <EditTestSuite
          testLink={testLink}
          selectedProject={selectedProject}
          selectedTestItem={selectedTestItem}
          onSave={() => setEditTestSuite(false)}
          onCancel={() => setEditTestSuite(false)}
        />
      );
    }

    if (isDeleteTestSuite)
      return <DeleteTestSuite selectedTestItem={selectedTestItem} onCancel={() => setDeleteTestSuite(false)} />;

    if (isCreateCase) {
      return (
        <AddTestCase
          testLink={testLink}
          selectedProject={selectedProject}
          selectedTestItem={selectedTestItem}
          onSave={() => setCreateCase(false)}
          onCancel={() => setCreateCase(false)}
        />
      );
    }

    return (
      <TestSuiteDetails
        selectedSuite={selectedTestItem}
        onCreateTestSuite={() => handleOnAddTestSuite()}
        onEditTestSuite={() => handleOnEditTestSuite()}
        onDeleteTestSuite={() => handleOnDeleteTestSuite()}
        OnCreateTestCase={() => handleOnAddTestCase()}
      />
    );
  };

  return (
    <Container className="h_100 mw-99">
      <Row className="h-100">
        <Col className="offset-lg-0 offset-md-3">{handleRenderComponents}</Col>
      </Row>
    </Container>
  );
};

export default TestSuiteContainer;
