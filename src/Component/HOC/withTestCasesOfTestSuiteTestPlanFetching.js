import React from "react";
import useTestCasesOfTestSuiteTestPlanFetching from "../CustomHooks/useTestCasesOfTestSuiteTestPlanFetching";
import LoadingContainer from "../Containers/LoadingContainer";

export const withTestCasesOfTestSuiteTestPlanFetching = Component => ({ ...props }) => {
  const { selectedProject, selectedTestSuite, selectedTestPlan } = props;
  const { isLoading, testCases } = useTestCasesOfTestSuiteTestPlanFetching(
    selectedProject,
    selectedTestSuite,
    selectedTestPlan
  );

  if (isLoading) return <LoadingContainer label={"Fetching test cases..."} />;
  return <Component {...props} testCases={testCases} />;
};
