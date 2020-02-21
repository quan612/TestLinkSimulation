import React, { useState, useEffect } from "react";
import { getTestCaseHelper } from "../../Redux/apiHelpers";
import ExecutionDetails from "./ExecutionDetails";
import { SectionHeader, CardContent } from "../../Component/styles/BodyStyles";
var he = require("he");

function ExecutionContainer({ selectedBuild, selectedTestPlan, selectedTestItem }) {
  const [testCaseDetails, setTestCaseDetails] = useState(null);

  useEffect(() => {
    const getTestCaseDetails = async () => {
      if (selectedTestItem) {
        // getTestCaseHelper(selectedTestItem.tc_id).then(data => {
        //   data.forEach(tcase => {
        //     setTestCaseDetails(tcase);
        //   });
        // });

        const testCase = await getTestCaseHelper(selectedTestItem.tc_id);
        setTestCaseDetails(testCase);
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
          <SectionHeader>{`Test plan: ${selectedTestPlan.name} `}</SectionHeader>
          {selectedTestPlan.notes && (
            <CardContent dangerouslySetInnerHTML={{ __html: he.decode(selectedTestPlan.notes) }} />
          )}
        </>
      )}

      {selectedBuild ? (
        <>
          <SectionHeader>{`Build: ${selectedBuild.name} `}</SectionHeader>
          {selectedBuild.notes && <CardContent dangerouslySetInnerHTML={{ __html: he.decode(selectedBuild.notes) }} />}
        </>
      ) : (
        <span> Create build now to execute</span>
      )}
    </>
  );
};
