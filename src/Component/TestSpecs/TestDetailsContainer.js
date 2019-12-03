import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TestCaseDetails from "./TestCaseDetails";
import TestSuiteContainer from "./TestSuiteContainer";
import { Card, CardHeader, CardBody, Container, Row, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddTestSuite from "./AddTestSuite";

function TestDetailsContainer() {
  const { testLink, isLoading, selectedTestItem, selectedProject } = useSelector(state => ({
    selectedTestItem: state.selectedTestItem,
    selectedProject: state.selectedProject,
    isLoading: state.isProjectLoading,
    testLink: state.testLink
  }));

  const [testItem, setTestItem] = useState({});
  const [isAddSuite, setAddSuite] = useState(false);

  useEffect(() => {
    console.log("use effect in details container is updated again");
    if (selectedTestItem && (selectedTestItem.node === "File" || selectedTestItem.hasOwnProperty("testcase_id"))) {
      console.log("use effect to run force update???");
      testLink
        .getTestCase({
          testcaseid: selectedTestItem.testcase_id ? selectedTestItem.testcase_id : selectedTestItem.id
        })
        .then(testcase => {
          testcase.forEach(caseObj => {
            caseObj.node = "File";
            setTestItem(caseObj);
            console.log("new test case item", testItem);
          });
        })
        .catch(error => console.log("catch error at getTestCase", error));
    } else {
      setTestItem(selectedTestItem);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTestItem]);

  if (isLoading) {
    return <div style={{ color: "white" }}>{"is loading"}</div>;
  }

  if (testItem && testItem.node === "File") {
    console.log("goig in test2");
    return <TestCaseDetails selectedTestCase={testItem} />;
  }

  if (testItem && testItem.node === "Folder") {
    return <TestSuiteContainer selectedTestItem={testItem} />;
  }

  if (isAddSuite) {
    return (
      <AddTestSuite
        testLink={testLink}
        selectedProject={selectedProject}
        selectedTestItem={selectedTestItem}
        onSave={() => setAddSuite(false)}
        onCancel={() => setAddSuite(false)}
      />
    );
  }

  if (
    !selectedTestItem ||
    Object.keys(selectedTestItem).length < 1 ||
    (selectedTestItem && selectedTestItem.hasOwnProperty("prefix"))
  )
    return (
      //loading project setting
      <Container className="h-100 mw-99">
        <Row className="h-100">
          <Col className="offset-lg-0 offset-md-3">
            <h1>{"Test Project"}</h1>
            <Card className="h-100">
              <CardBody>
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
                      onClick={() => setAddSuite(true)}
                    />
                  </form>
                </div>
                {selectedProject && (
                  <>
                    <div className="panel-header">{`Test project: ${selectedProject.name} `}</div>
                    <div className="panel-content" dangerouslySetInnerHTML={{ __html: selectedProject.notes }}></div>
                  </>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  else return <div>{console.log("should not go here")}</div>;
}

export default TestDetailsContainer;
