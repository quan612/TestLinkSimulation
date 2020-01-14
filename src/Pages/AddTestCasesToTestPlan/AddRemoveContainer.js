import React from "react";
import useTestCasesOfTestSuiteTestPlanFetching from "../../Component/CustomHooks/useTestCasesOfTestSuiteTestPlanFetching";
import AddRemoveDetails from "./AddRemoveDetails";
import LoadingContainer from "../../Component/Containers/LoadingContainer";
var he = require("he");

function AddRemoveContainer({ selectedProject, selectedTestSuite, selectedTestPlan }) {
  const { isLoading, testCases } = useTestCasesOfTestSuiteTestPlanFetching(
    selectedProject,
    selectedTestSuite,
    selectedTestPlan
  );

  if (isLoading) return <LoadingContainer label={"Fetching test cases..."} />;

  if (selectedTestSuite && testCases && Object.keys(testCases).length > 0) {
    return (
      <AddRemoveDetails
        selectedProject={selectedProject}
        selectedTestPlan={selectedTestPlan}
        listItems={testCases}
        selectedTestSuite={selectedTestSuite}
      />
    );
  } else
    return (
      <>
        {selectedTestPlan && <h1>{`Test Plan: ${selectedTestPlan.name}`}</h1>}
        <div>
          <div className="panel-header"> Details:</div>
          {selectedTestPlan && (
            <div
              className="panel-content"
              dangerouslySetInnerHTML={{ __html: he.decode(selectedTestPlan.notes) }}
            ></div>
          )}
        </div>
      </>
    );
}

export default AddRemoveContainer;
