import { useEffect, useState } from "react";
import { getTestCasesOfSelectedTestSuiteHelper, getTestCasesForCurrentTestPlanApi } from "../../Redux/apiHelpers";

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

/**
 * The hook is used within Add Case To Plan page, to show test cases belongs to selected test suite and test plan
 *
 * The hook is rerun whenever user selects another project, another test plan, or another test suite from the left side bar
 * @param {*} selectedProject
 * @param {*} selectedTestSuite
 * @param {*} selectedTestPlan
 */
const useTestCasesOfTestSuiteTestPlanFetching = (selectedProject, selectedTestSuite, selectedTestPlan) => {
  const [testCases, setTestCases] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      if (
        selectedTestSuite &&
        Object.keys(selectedTestSuite).length > 0 &&
        selectedProject.id !== selectedTestSuite.id
      ) {
        const testCasesOfTestSuite = await getTestCasesOfSelectedTestSuiteTestPlan(selectedTestSuite, selectedTestPlan);
        setTestCases([...testCasesOfTestSuite]);
        setIsLoading(false);
      }
    };
    setTestCases([]);
    getData();
  }, [selectedProject, selectedTestSuite, selectedTestPlan]);
  return { isLoading, testCases };
};

export default useTestCasesOfTestSuiteTestPlanFetching;
