import React from "react";
import { withTestCasesOfTestSuiteTestPlanFetching } from "../../Component/HOC/withTestCasesOfTestSuiteTestPlanFetching";
import AddRemoveDetails from "./AddRemoveDetails";

const AddRemoveContainer = ({ selectedProject, selectedTestSuite, selectedTestPlan, testCases }) => {
  if (selectedProject !== {} && selectedTestSuite !== {} && selectedTestPlan !== {} && testCases !== {})
    return (
      <AddRemoveDetails
        selectedProject={selectedProject}
        selectedTestPlan={selectedTestPlan}
        testCases={testCases}
        selectedTestSuite={selectedTestSuite}
      />
    );
  else return null;
};

export default withTestCasesOfTestSuiteTestPlanFetching(AddRemoveContainer);
