import React, { useState, useEffect } from "react";
import { getTestCasesOfSelectedTestSuiteHelper, getTestCasesForCurrentTestPlanApi } from "../../Redux/apiHelpers";
import { Card, CardBody, Container, Row, Col } from "reactstrap";
import AddRemoveDetails from "./AddRemoveDetails";

function AddRemoveContainer({ selectedTestSuite, selectTestPlan }) {
  const [listOfTestCases, setListOfTestCases] = useState([]);

  useEffect(() => {
    const getTestCasesOfSelectedSuite = async () => {
      if (selectedTestSuite && Object.keys(selectedTestSuite).length > 0) {
        const data = await getTestCasesOfSelectedTestSuiteHelper(selectedTestSuite);
        const testCasesOfTestPlan = await getTestCasesForCurrentTestPlanApi(selectTestPlan);

        // here we determine if test cases in selected test suite
        // are linked to test plan???
        let getIdsOfAllTestCasesOfTestPlan = testCasesOfTestPlan.map(testcase => testcase.tcase_id);
        data.forEach(testCaseInSuite => {
          if (getIdsOfAllTestCasesOfTestPlan.includes(testCaseInSuite.id)) {
            testCaseInSuite.chilrenOfThisTestPlan = true;
            testCaseInSuite.checked = true;
          } else {
            testCaseInSuite.chilrenOfThisTestPlan = false;
          }
        });
        // console.log("data", data);
        setListOfTestCases([...data]);
      }
    };
    getTestCasesOfSelectedSuite();
  }, [selectedTestSuite]);

  if (selectedTestSuite && listOfTestCases) {
    return <AddRemoveDetails listItems={listOfTestCases} selectedTestItem={selectedTestSuite} />;
  }
  //default page to load current test plan details - mostly done
  else
    return (
      <Container className="h-100 mw-99">
        <Row className="h-100">
          <Col className="offset-lg-0 offset-md-3">
            <h1>{"Test Plan"}</h1>
            <Card className="section h-100">
              <CardBody>
                {selectTestPlan && <div className="panel-header">{`Test plan: ${selectTestPlan.name} `}</div>}
                {selectTestPlan && (
                  <div className="panel-content" dangerouslySetInnerHTML={{ __html: selectTestPlan.notes }}></div>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
}

export default AddRemoveContainer;
