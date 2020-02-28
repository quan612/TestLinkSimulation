import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { getTestCaseHelper } from "../../Redux/apiHelpers";
import ExecutionDetails from "./ExecutionDetails";
import { SectionHeader, CardContent } from "../../Component/styles/BodyStyles";
import { StyledTestDetail } from "../../Component/styles/StyledTestDetails";

var he = require("he");

const ExecutionContainer = () => {
  const { selectedTestPlan, selectedBuild, selectedTestItem } = useSelector(state => ({
    selectedTestPlan: state.selectedTestPlan,
    selectedBuild: state.selectedBuild,
    selectedTestItem: state.selectedTestItem
  }));
  const [testCaseDetails, setTestCaseDetails] = useState(null);

  useEffect(() => {
    const getTestCaseDetails = async () => {
      if (selectedTestItem) {
        const testCase = await getTestCaseHelper(selectedTestItem.tc_id);
        setTestCaseDetails(testCase);
      }
    };

    getTestCaseDetails();
  }, [selectedTestItem]);

  //when user selects a test case from the left navigator
  if (selectedTestItem && selectedTestItem.node === "File" && testCaseDetails) {
    return (
      <StyledTestDetail>
        <ExecutionDetails testItemResult={selectedTestItem} testItemDetails={testCaseDetails} />
      </StyledTestDetail>
    );
  }
  //default page to load current test plan details
  else
    return (
      <StyledTestDetail>
        <TestPlanDetails selectedTestPlan={selectedTestPlan} selectedBuild={selectedBuild} />
      </StyledTestDetail>
    );
};

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
