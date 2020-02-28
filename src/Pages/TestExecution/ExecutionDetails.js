import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reportResultApi } from "../../Redux/apiHelpers";
import { selectTestItemAction } from "../../Redux/testSpec.action";
import TableSteps from "../../Component/Common/TableSteps";
import DropDown from "../../Component/Common/DropDown";
import DropdownStyles from "../../Component/styles/DropdownStyles";
import { CardTitle, CardContent, SectionHeader } from "../../Component/styles/BodyStyles";

const tableColumns = {
  step_number: {
    label: "#",
    width: "3%"
  },
  actions: {
    label: "Action",
    width: "47%"
  },
  expected_results: {
    label: "Expected Result",
    width: "47%"
  }
};

function ExecutionDetails(props) {
  const [executeStatus, setExecutionStatus] = useState(null);

  const { selectedTestPlan, selectedBuild } = useSelector(state => ({
    selectedTestPlan: state.selectedTestPlan,
    selectedBuild: state.selectedBuild
  }));

  const dispatch = useDispatch();

  let executionStatus = [
    { name: " ", value: "n" },
    { name: "Pass", value: "p" },
    { name: "Fail", value: "f" },
    { name: "Block", value: "b" }
  ];

  const handleOnChangeStatus = eventKey => {
    const status = executionStatus[eventKey];
    setExecutionStatus(status);
  };

  const handleOnResultSubmit = () => {
    if (executeStatus && executeStatus.value) {
      const result = {
        testcase: props.testItemDetails,
        testPlan: selectedTestPlan,
        status: executeStatus.value,
        build: selectedBuild,
        notes: ""
      };

      reportResultApi(result)
        .then(async message => {
          // here we submit the new result to store, to refetch the result on left navigation
          let currentTestCaseWithNewResult = { ...props.testItemDetails };
          currentTestCaseWithNewResult.exec_status = executeStatus.value;
          dispatch(selectTestItemAction(currentTestCaseWithNewResult));
        })
        .catch(error => console.log(error));
    }
  };

  return (
    <>
      <CardTitle className=" d-flex flex-wrap">
        <div
          style={{ wordWrap: "break-word", whiteSpace: "pre-wrap" }}
        >{`Test case: ${props.testItemDetails.name}`}</div>
      </CardTitle>

      <SectionHeader>Summary</SectionHeader>
      {props.summary && <CardContent>{props.testItemDetails.summary}</CardContent>}

      <SectionHeader>Precondition</SectionHeader>
      {props.precondition && <CardContent> {props.testItemDetails.precondition}</CardContent>}

      <SectionHeader>Test Steps</SectionHeader>
      <div className="table-container">
        <TableSteps tableItems={props.testItemDetails.steps} columns={tableColumns} maxHeight={"300px"} />
      </div>

      <div className="d-flex ">
        <span className="mr-3">Execution status:</span>
        <DropdownStyles>
          <DropDown
            title={executeStatus === null ? "Execution status" : executeStatus.name}
            items={executionStatus}
            onSelect={handleOnChangeStatus}
          />
        </DropdownStyles>
        <button className="btn btn-info ml-3" color="primary" size="sm" onClick={() => handleOnResultSubmit()}>
          Submit
        </button>
      </div>
    </>
  );
}

export default ExecutionDetails;
