// todo: Add Edit Test Case function
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectTestItemAction } from "../../Redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createTestCaseStepsApi } from "../../Redux/apiHelpers";
import { Button, Card, CardBody, CardText } from "reactstrap";
import TableSimple from "../../Component/Common/TableSimple";
import TableWithCreateItem from "../../Component/Common/TableWithCreateItem";
import constant from "../../Library/constants";
import EditTestCase from "./EditTestCase";

const tableColumns = {
  step_number: {
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

const status = constant.TestCaseStatus;
const execution_type = constant.ExecutionType;

export default function TestCaseDetails({ selectedTestCase }) {
  const [isCreateStep, setIsCreateStep] = useState(false);
  const [isEditTestCase, setEditTestCase] = useState(false);

  const dispatch = useDispatch();

  const handleOnSaveSteps = async data => {
    let newSteps = [...selectedTestCase.steps, data];
    createTestCaseStepsApi(selectedTestCase, newSteps)
      .then(async message => {
        selectedTestCase.node = "File";
        await dispatch(selectTestItemAction(selectedTestCase));
        await setIsCreateStep(false);
      })
      .catch(error => console.log(error));
  };

  if (isEditTestCase) {
    return <EditTestCase selectedTestItem={selectedTestCase} onClose={() => setEditTestCase(false)} />;
  } else {
    return (
      <>
        <h1>{"Test Case Details"}</h1>
        <Card>
          <CardBody>
            <div className="test-detail-case-title">{`Test Case: ${selectedTestCase.name}`}</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <FontAwesomeIcon
              icon="tools"
              size={"2x"}
              color={"white"}
              style={{ animation: `spin720 1s ease`, animationDelay: `0.3s` }}
              data-toggle="collapse"
              href="#testSuiteUtilities"
            />
            <div className="collapse" id="testSuiteUtilities">
              <form>
                <label>Test Case Operations:</label>
                <FontAwesomeIcon
                  className="ml-1"
                  icon="pencil-alt"
                  size={"lg"}
                  style={{ color: "#ffab00" }}
                  title="Edit Test Case"
                  onClick={() => setEditTestCase(true)}
                />
              </form>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="panel-header">Version</div>
            <FontAwesomeIcon icon="info-circle" color={"white"}></FontAwesomeIcon>
            <div className="panel-content">
              <CardText>
                Created on {selectedTestCase.creation_ts} by
                {selectedTestCase.author_first_name + " " + selectedTestCase.author_last_name}
              </CardText>
              {selectedTestCase.updater_first_name && (
                <CardText>
                  Last Modified on {selectedTestCase.modification_ts} by
                  {selectedTestCase.updater_first_name + " " + selectedTestCase.updater_last_name}
                </CardText>
              )}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="panel-header">Summary</div>
            {selectedTestCase.Summary && <div className="panel-content">{selectedTestCase.Summary}</div>}
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="panel-header">Addtional Information</div>
            {selectedTestCase.precondition && <div className="panel-content">{selectedTestCase.precondition}</div>}
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <fieldset className="border mt-2">
              <div className="form-row mt-1 d-flex flex-column">
                <div>
                  <label className="ml-2">Test Case Status: </label>
                  <label className="ml-2">
                    {Object.keys(status).find(key => status[key] === parseInt(selectedTestCase.status))}
                  </label>
                </div>
                <div>
                  <label className="ml-2">Execution Type: </label>
                  <label className="ml-2">
                    {Object.keys(execution_type).find(
                      key => execution_type[key] === parseInt(selectedTestCase.execution_type)
                    )}
                  </label>
                </div>
              </div>
            </fieldset>
          </CardBody>
        </Card>

        {/* test case steps details */}
        <Card>
          <CardBody>
            <div className="panel-header">Test Steps</div>
            <div className="table-container">
              {isCreateStep ? (
                <TableWithCreateItem
                  tableItems={selectedTestCase.steps}
                  columns={tableColumns}
                  onSave={handleOnSaveSteps}
                  onCancel={() => setIsCreateStep(false)}
                />
              ) : (
                <TableSimple tableItems={selectedTestCase.steps} columns={tableColumns} />
              )}
            </div>
          </CardBody>
        </Card>
        {!isCreateStep && (
          <Button className="btn btn-info  mt-3" color="primary" size="sm" onClick={() => setIsCreateStep(true)}>
            Create Step
          </Button>
        )}
      </>
    );
  }
}
