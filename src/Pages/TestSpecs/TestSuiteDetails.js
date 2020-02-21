import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SectionHeader, CardContent } from "../../Component/styles/BodyStyles";

var he = require("he");

const TestSuiteDetails = ({
  selectedProject,
  testSuite,
  onAddTestSuite,
  onEditTestSuite,
  onDeleteTestSuite,
  onAddTestCase
}) => {
  if (!testSuite || Object.keys(testSuite).length < 1 || (testSuite && testSuite.hasOwnProperty("prefix")))
    return <TestProject selectedProject={selectedProject} onAddTestSuite={onAddTestSuite} />;
  else
    return (
      <TestSuite
        testSuite={testSuite}
        onAddTestSuite={onAddTestSuite}
        onEditTestSuite={onEditTestSuite}
        onDeleteTestSuite={onDeleteTestSuite}
        onAddTestCase={onAddTestCase}
      />
    );
};

export default TestSuiteDetails;

const TestProject = ({ selectedProject, onAddTestSuite }) => {
  return (
    <>
      {selectedProject && (
        <>
          <SectionHeader>{`Test project: ${selectedProject.name} `}</SectionHeader>
          {selectedProject.notes && (
            <CardContent dangerouslySetInnerHTML={{ __html: he.decode(selectedProject.notes) }} />
          )}
        </>
      )}
      <div className="icon-wrapper m-2">
        <FontAwesomeIcon
          icon="tools"
          size={"2x"}
          color={"black"}
          style={{ animation: `spin720 1s ease`, animationDelay: `0.3s` }}
          data-toggle="collapse"
          href="#testSuiteUtilities"
        />
        <div className="collapse" id="testSuiteUtilities">
          <form>
            <label>Test Project Operations:</label>
            <FontAwesomeIcon
              icon="plus-circle"
              size={"lg"}
              style={{ color: "#00e676" }}
              data-toggle="tooltip"
              title="Create Test Suite"
              onClick={onAddTestSuite}
            />
          </form>
        </div>
      </div>
    </>
  );
};

const TestSuite = ({ testSuite, onAddTestSuite, onEditTestSuite, onDeleteTestSuite, onAddTestCase }) => {
  return (
    <>
      <SectionHeader>Test Suite: {`${testSuite.name}`}</SectionHeader>
      {testSuite.details && <CardContent dangerouslySetInnerHTML={{ __html: he.decode(testSuite.details) }} />}

      <div className="icon-wrapper m-2">
        <FontAwesomeIcon
          icon="tools"
          size={"2x"}
          color={"black"}
          style={{ animation: `spin720 1s ease`, animationDelay: `0.3s` }}
          data-toggle="collapse"
          href="#testSuiteUtilities"
        />
        <div className="collapse" id="testSuiteUtilities">
          <div className="testsuite-section">
            <label>Test Suite Operations:</label>
            <FontAwesomeIcon
              className="ml-2"
              icon="plus-circle"
              size={"lg"}
              style={{ color: "#00e676" }}
              title="Create Test Suite"
              onClick={onAddTestSuite}
            />
            <FontAwesomeIcon
              className="ml-2"
              icon="pencil-alt"
              size={"lg"}
              style={{ color: "#ffab00" }}
              title="Edit Test Suite"
              onClick={onEditTestSuite}
            />
            <FontAwesomeIcon
              className="ml-2"
              icon="trash-alt"
              size={"lg"}
              style={{ color: "red" }}
              title="Delete test suite with all children"
              onClick={onDeleteTestSuite}
            />
          </div>

          <div className="mt-1 testcase-section">
            <label>Test Case Operations:</label>
            <FontAwesomeIcon
              className="ml-2"
              icon="plus-circle"
              size={"lg"}
              style={{ color: "#00e676" }}
              title="Create Test Case"
              onClick={onAddTestCase}
            />
          </div>
        </div>
      </div>
    </>
  );
};
