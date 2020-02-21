// todo: Add Edit Test Case function
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { selectTestItemAction } from "../../Redux/testSpec.action";
import { createTestCaseStepsApi } from "../../Redux/apiHelpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "reactstrap";
import TableSimple from "../../Component/Common/TableSimple";
import TableWithCreateItem from "../../Component/Common/TableWithCreateItem";
import constant from "../../Library/constants";
import EditTestCase from "./EditTestCase";
import { Card, CardTitle, CardContent, SectionHeader } from "../../Component/styles/BodyStyles";

const TestCase = ({ testCase }) => {
  const [isEditTestCase, setEditTestCase] = useState(false);

  if (isEditTestCase) {
    return <EditTestCase testCase={testCase} onClose={() => setEditTestCase(false)} />;
  } else {
    return <TestCaseDetails testCase={testCase} onEdit={() => setEditTestCase(true)} />;
  }
};

export default TestCase;

const tableColumns = {
  step_number: {
    label: "#",
    width: "8%"
  },
  actions: {
    label: "Action",
    width: "47%"
  },
  expected_results: {
    label: "Expected Result",
    width: "45%"
  }
};

const status = constant.TestCaseStatus;
const execution_type = constant.ExecutionType;

const TestCaseDetails = ({ testCase, onEdit }) => {
  const [onCreateStep, setCreateStep] = useState(false);
  const dispatch = useDispatch();

  const handleOnSaveSteps = async data => {
    let newSteps = [...testCase.steps, data];
    createTestCaseStepsApi(testCase, newSteps)
      .then(async message => {
        testCase.node = "File";
        await dispatch(selectTestItemAction(testCase));
        await setCreateStep(false);
      })
      .catch(error => console.log(error));
  };

  return (
    <>
      {testCase && <SectionHeader>{`Test Case: ${testCase.name}`}</SectionHeader>}

      <div className="icon-wrapper m-2">
        <FontAwesomeIcon
          icon="tools"
          size={"2x"}
          color={"black"}
          style={{ animation: `spin720 1s ease`, animationDelay: `0.3s` }}
          data-toggle="collapse"
          href="#testcase"
        />
        <div className="collapse" id="testcase">
          <label>Test Case Operations:</label>
          <FontAwesomeIcon
            className="ml-1"
            icon="pencil-alt"
            size={"lg"}
            style={{ color: "#ffab00" }}
            title="Edit Test Case"
            onClick={onEdit}
          />
        </div>
      </div>

      <CardTitle>
        <div className="mr-1">Version</div>
        <FontAwesomeIcon icon="info-circle" color={"black"} data-toggle="collapse" href="#version"></FontAwesomeIcon>
      </CardTitle>
      <div className="collapse ml-2" id="version">
        <div>{`Created on ${testCase.creation_ts} by ${testCase.author_first_name} ${testCase.author_last_name}`}</div>
        <div>
          {testCase.updater_first_name && (
            <>
              {`Last Modified ${testCase.modification_ts} by ${testCase.updater_first_name} ${testCase.updater_last_name}`}
            </>
          )}
        </div>
      </div>

      <CardTitle>Summary</CardTitle>
      {testCase.summary && <CardContent>{testCase.summary}</CardContent>}

      <CardTitle>Addtional Information</CardTitle>
      {testCase.preconditions && <CardContent>{testCase.preconditions}</CardContent>}

      {/* test case steps details */}

      <CardTitle>Test Steps</CardTitle>
      <div className="table-container">
        {onCreateStep ? (
          <TableWithCreateItem
            tableItems={testCase.steps}
            columns={tableColumns}
            onSave={handleOnSaveSteps}
            onCancel={() => setCreateStep(false)}
          />
        ) : (
          <TableSimple tableItems={testCase.steps} columns={tableColumns} />
        )}
      </div>

      <div className="button-wrapper ml-2">
        {!onCreateStep && (
          <Button className="btn btn-info mt-2" color="primary" size="sm" onClick={() => setCreateStep(true)}>
            Create Step
          </Button>
        )}
      </div>

      <div className="form-row mt-1  d-flex flex-column">
        <CardContent>
          <b>Status:</b>
          {Object.keys(status).find(key => status[key] === parseInt(testCase.status))}
        </CardContent>
        <CardContent>
          <b>Execution Type:</b>
          {Object.keys(execution_type).find(key => execution_type[key] === parseInt(testCase.execution_type))}
        </CardContent>
      </div>
    </>
  );
};
