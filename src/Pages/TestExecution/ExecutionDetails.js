import React, { useState } from "react";
import DropDown from "../../Component/Common/DropDown";
import { useDispatch, useSelector } from "react-redux";
import { reportResultApi } from "../../Redux/apiHelpers";
import { selectTestItemAction } from "../../Redux/actions";
import { Button, Card, CardBody } from "reactstrap";
import TableSimple from "../../Component/Common/TableSimple";

//TODO update list tree after submit test result

function ExecutionDetails(props) {
  const [executeStatus, setExecutionStatus] = useState({});

  const { selectedTestPlan, selectedBuild } = useSelector(state => ({
    selectedTestPlan: state.selectedTestPlan,
    selectedBuild: state.selectedBuild
  }));

  const dispatch = useDispatch();

  const tableColumns = {
    steps: {
      label: "#",
      width: "3%"
    },
    actions: {
      label: "Action",
      width: "44%"
    },
    expected_results: {
      label: "Expected Result",
      width: "45%"
    },
    execution_type: {
      label: "Execution",
      width: "8%"
    }
  };

  let executionStatus = [
    { name: " ", value: "n" },
    { name: "Pass", value: "p" },
    { name: "Fail", value: "f" },
    { name: "Block", value: "b" }
  ];

  const handleOnChangeStatus = eventKey => {
    const temp = executionStatus[eventKey];

    setExecutionStatus(temp);
  };

  const handleOnResultSubmit = () => {
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
  };

  return (
    <>
      <h1>{"Execute Test"}</h1>
      <Card>
        <CardBody>
          <div className="test-detail-case-title">
            {`Test Case ${props.testItemDetails.full_tc_external_id} :: Version : ${props.testItemDetails.version} :: ${props.testItemDetails.name}`}
            <br />
            {"Assign to"}
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <div className="panel-header">Summary</div>
          {props.summary && <div className="panel-content">{props.testItemDetails.summary}</div>}
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <div className="panel-header">Precondition</div>
          {props.precondition && <div className="panel-content"> {props.testItemDetails.precondition}</div>}
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <div className="panel-header">Test Steps</div>
          <div className="table-container">
            <TableSimple tableItems={props.testItemDetails.steps} columns={tableColumns} />
          </div>
        </CardBody>
      </Card>

      <Card className="execution-details-submit">
        <div className="result-box ">
          <span className="mr-3">Execution status:</span>
          <DropDown
            title={executeStatus === {} ? "Execution status" : executeStatus.name}
            items={executionStatus}
            onSelect={handleOnChangeStatus}
          />
          <Button className="btn btn-info ml-3" color="primary" size="sm" onClick={() => handleOnResultSubmit()}>
            Submit
          </Button>
        </div>
      </Card>
    </>
  );
}

export default ExecutionDetails;
