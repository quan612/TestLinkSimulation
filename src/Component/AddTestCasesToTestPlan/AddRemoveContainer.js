import React, { useState, useEffect } from "react";
import { getTestCasesOfSelectedTestSuiteHelper, getTestCasesForCurrentTestPlanApi } from "../../Redux/apiHelpers";
import { Card, CardBody } from "reactstrap";
import AddRemoveDetails from "./AddRemoveDetails";
var he = require("he");

const getTestCasesOfSelectedTestSuiteTestPlan = async (selectedTestSuite, selectTestPlan) => {
  const testCasesOfTestSuite = await getTestCasesOfSelectedTestSuiteHelper(selectedTestSuite);
  const testCasesOfTestPlan = await getTestCasesForCurrentTestPlanApi(selectTestPlan);

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

function AddRemoveContainer({ selectedProject, selectedTestSuite, selectTestPlan }) {
  const [listOfTestCases, setListOfTestCases] = useState([""]);

  useEffect(() => {
    const getData = async () => {
      if (
        selectedTestSuite &&
        Object.keys(selectedTestSuite).length > 0 &&
        selectedProject.id !== selectedTestSuite.id
      ) {
        const testCasesOfTestSuite = await getTestCasesOfSelectedTestSuiteTestPlan(selectedTestSuite, selectTestPlan);
        setListOfTestCases([...testCasesOfTestSuite]);
      }
    };
    setListOfTestCases([]);
    getData();
  }, [selectedProject, selectedTestSuite, selectTestPlan]);

  if (listOfTestCases && Object.keys(listOfTestCases).length > 0) {
    return (
      <AddRemoveDetails
        selectedProject={selectedProject}
        selectTestPlan={selectTestPlan}
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
            {selectTestPlan && <div className="panel-header">{`Test plan: ${selectTestPlan.name} `}</div>}
            {selectTestPlan && (
              <div
                className="panel-content"
                dangerouslySetInnerHTML={{ __html: he.decode(selectTestPlan.notes) }}
              ></div>
            )}
          </CardBody>
        </Card>
      </>
    );
}

export default AddRemoveContainer;
