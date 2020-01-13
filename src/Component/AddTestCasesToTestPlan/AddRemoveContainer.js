import React, { useState, useEffect } from "react";
import { getTestCasesOfSelectedTestSuiteHelper, getTestCasesForCurrentTestPlanApi } from "../../Redux/apiHelpers";
import { Card, CardBody } from "reactstrap";
import AddRemoveDetails from "./AddRemoveDetails";
var he = require("he");

const getTestCasesOfSelectedTestSuiteTestPlan = async (selectedTestSuite, selectedTestPlan) => {
  const testCasesOfTestSuite = await getTestCasesOfSelectedTestSuiteHelper(selectedTestSuite);
  const testCasesOfTestPlan = await getTestCasesForCurrentTestPlanApi(selectedTestPlan);

  // here we determine if test cases in selected test suite are linked to test plan?
  let getIdsOfAllTestCasesOfTestPlan = testCasesOfTestPlan.map(testcase => testcase.tcase_id);
  testCasesOfTestSuite.forEach(testCaseInSuite => {
    if (getIdsOfAllTestCasesOfTestPlan.includes(testCaseInSuite.id)) {
      testCaseInSuite.chilrenOfThisTestPlan = true;
      testCaseInSuite.checked = true;
    } else {
      testCaseInSuite.chilrenOfThisTestPlan = false;
    }
  });
  return testCasesOfTestSuite;
};

function AddRemoveContainer({ selectedProject, selectedTestSuite, selectedTestPlan }) {
  const [listOfTestCases, setListOfTestCases] = useState([""]);

  useEffect(() => {
    const getData = async () => {
      if (
        selectedTestSuite &&
        Object.keys(selectedTestSuite).length > 0 &&
        selectedProject.id !== selectedTestSuite.id
      ) {
        const testCasesOfTestSuite = await getTestCasesOfSelectedTestSuiteTestPlan(selectedTestSuite, selectedTestPlan);
        setListOfTestCases([...testCasesOfTestSuite]);
      }
    };
    setListOfTestCases([]);
    getData();
  }, [selectedProject, selectedTestSuite, selectedTestPlan]);

  if (listOfTestCases && Object.keys(listOfTestCases).length > 0) {
    return (
      <AddRemoveDetails
        selectedProject={selectedProject}
        selectedTestPlan={selectedTestPlan}
        listItems={listOfTestCases}
        selectedTestSuite={selectedTestSuite}
      />
    );
  } else
    return (
      <>
        <h1>{"Test Plan"}</h1>
        <Card className="section h-100">
          <CardBody>
            {selectedTestPlan && <div className="panel-header">{`Test plan: ${selectedTestPlan.name} `}</div>}
            {selectedTestPlan && (
              <div
                className="panel-content"
                dangerouslySetInnerHTML={{ __html: he.decode(selectedTestPlan.notes) }}
              ></div>
            )}
          </CardBody>
        </Card>
      </>
    );
}

export default AddRemoveContainer;
