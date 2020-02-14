import React, { useState, useEffect } from "react";
import { getTestCaseHelper } from "../../Redux/apiHelpers";
import ExecutionDetails from "./ExecutionDetails";
import { Header, CardContent } from "../../Component/styles/BodyStyles";
var he = require("he");

function ExecutionContainer({ selectedBuild, selectedTestPlan, selectedTestItem }) {
  const [testCaseDetails, setTestCaseDetails] = useState(null);

  useEffect(() => {
    const getTestCaseDetails = async () => {
      if (selectedTestItem) {
        getTestCaseHelper(selectedTestItem.tc_id).then(data => {
          data.forEach(tcase => {
            setTestCaseDetails(tcase);
          });
        });
      }
    };

    getTestCaseDetails();
  }, [selectedTestItem]);

  //when user selects a test case from the left navigator
  if (selectedTestItem && selectedTestItem.node === "File" && testCaseDetails) {
    return <ExecutionDetails testItemResult={selectedTestItem} testItemDetails={testCaseDetails} />;
  }
  //default page to load current test plan details
  else return <TestPlanDetails selectedTestPlan={selectedTestPlan} selectedBuild={selectedBuild} />;
}

export default ExecutionContainer;

const TestPlanDetails = ({ selectedTestPlan, selectedBuild }) => {
  return (
    <>
      {selectedTestPlan && (
        <>
          <Header>{`Test plan: ${selectedTestPlan.name} `}</Header>
          {selectedTestPlan.notes && (
            <CardContent dangerouslySetInnerHTML={{ __html: he.decode(selectedTestPlan.notes) }} />
          )}
        </>
      )}

      {selectedBuild ? (
        <>
          <Header>{`Build: ${selectedBuild.name} `}</Header>
          {selectedBuild.notes && <CardContent dangerouslySetInnerHTML={{ __html: he.decode(selectedBuild.notes) }} />}
        </>
      ) : (
        <span> Create build now to execute</span>
      )}
    </>
  );
};
