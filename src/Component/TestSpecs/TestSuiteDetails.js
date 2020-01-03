import React from "react";
import { Card, CardBody } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
var he = require("he");

const TestSuiteDetails = ({
  selectedProject,
  selectedSuite,
  onAddTestSuite,
  onEditTestSuite,
  onDeleteTestSuite,
  onAddTestCase
}) => {
  if (
    !selectedSuite ||
    Object.keys(selectedSuite).length < 1 ||
    (selectedSuite && selectedSuite.hasOwnProperty("prefix"))
  )
    return (
      <>
        <h1>{"Test Project"}</h1>
        <FontAwesomeIcon
          icon="tools"
          size={"2x"}
          color={"white"}
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
              onClick={() => onAddTestSuite()}
            />
          </form>
        </div>
        {selectedProject && (
          <>
            <div className="panel-header">{`Test project: ${selectedProject.name} `}</div>
            <div className="panel-content" dangerouslySetInnerHTML={{ __html: he.decode(selectedProject.notes) }}></div>
          </>
        )}
      </>
    );
  else
    return (
      <>
        <h1>{"Test Suite Details"}</h1>
        <FontAwesomeIcon
          icon="tools"
          size={"2x"}
          color={"white"}
          style={{ animation: `spin720 1s ease`, animationDelay: `0.3s` }}
          data-toggle="collapse"
          href="#testSuiteUtilities"
        />
        <div className="collapse" id="testSuiteUtilities">
          <form>
            <label>Test Suite Operations:</label>
            <FontAwesomeIcon
              className="ml-2"
              icon="plus-circle"
              size={"lg"}
              style={{ color: "#00e676" }}
              data-toggle="tooltip"
              title="Create Test Suite"
              onClick={() => onAddTestSuite()}
            />
            <FontAwesomeIcon
              className="ml-2"
              icon="pencil-alt"
              size={"lg"}
              style={{ color: "#ffab00" }}
              data-toggle="tooltip"
              title="Edit Test Suite"
              onClick={() => onEditTestSuite()}
            />
            <FontAwesomeIcon
              className="ml-2"
              icon="trash-alt"
              size={"lg"}
              style={{ color: "red" }}
              data-toggle="tooltip"
              title="Delete test suite with all children"
              onClick={() => onDeleteTestSuite()}
            />
          </form>

          <form>
            <label>Test Case Operations:</label>
            <FontAwesomeIcon
              className="ml-2"
              icon="plus-circle"
              size={"lg"}
              style={{ color: "#00e676" }}
              title="Create Test Case"
              onClick={() => onAddTestCase()}
            />
          </form>
        </div>
        <div className="panel-header">Test Suite: {`${selectedSuite.name}`}</div>
        <div className="panel-content">
          {selectedSuite.details && <div dangerouslySetInnerHTML={{ __html: he.decode(selectedSuite.details) }} />}
        </div>
        )
      </>
    );
};

export default TestSuiteDetails;
