import React, { useState } from "react";
import constant from "../../Library/constants";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardTitle, CardBody, Button, Input } from "reactstrap";
import { selectTestItemAction } from "../../Redux/actions";
import { updateTestCaseWithoutStepsUpdateHelper, getTestCaseHelper } from "../../Redux/apiHelpers";

const status = constant.TestCaseStatus;
const execution_type = constant.ExecutionType;

const EditTestCase = ({ selectedTestItem, onSave, onCancel }) => {
  const [testCaseObject, setTestCaseObject] = useState({
    name: selectedTestItem.name,
    tc_external_id: selectedTestItem.tc_external_id,
    summary: selectedTestItem.summary,
    preconditions: selectedTestItem.preconditions,
    status: selectedTestItem.status,
    execution_type: selectedTestItem.execution_type,
    steps: selectedTestItem.steps,
    version: selectedTestItem.version
  });

  const { selectedProject } = useSelector(state => ({
    selectedProject: state.selectedProject
  }));

  const dispatch = useDispatch();

  const handleOnChange = e => {
    const { name, value } = e.target;
    setTestCaseObject(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  // we don't update the steps here
  const handleOnSave = async () => {
    // testLink
    //   .updateTestCase({
    //     testcasename: testCaseObject.name,
    //     testsuiteid: selectedTestItem.id,
    //     testcaseexternalid: selectedProject.prefix + "-" + selectedTestItem.tc_external_id,
    //     summary: testCaseObject.summary,
    //     preconditions: testCaseObject.preconditions,
    //     status: testCaseObject.status,
    //     executiontype: testCaseObject.execution_type,
    //     version: parseInt(selectedTestItem.version)
    //   })
    //   .then(async message => {
    //     console.log(message);
    //     const testcase = await testLink.getTestCase({
    //       testcaseid: selectedTestItem.testcase_id ? selectedTestItem.testcase_id : selectedTestItem.id
    //     });
    //     testcase.forEach(async data => {
    //       data.node = "File";
    //       await dispatch(selectTestItemAction(data));
    //       onSave();
    //     });
    //   })
    //   .catch(error => console.log(error));

    // change the return object so that we dont need to loop foreach there
    updateTestCaseWithoutStepsUpdateHelper(selectedProject, testCaseObject)
      .then(async message => {
        console.log(message);
        const testcase = await getTestCaseHelper({
          testCaseId: selectedTestItem.testcase_id ? selectedTestItem.testcase_id : selectedTestItem.id
        });
        console.log("testcase", testcase); // test this
        testcase.forEach(async data => {
          data.node = "File";
          await dispatch(selectTestItemAction(data));
          onSave();
        });
      })
      .catch(error => console.log("catch error at update test case ", error));
  };

  return (
    <>
      {selectedTestItem && <CardTitle>{`Test Suite: ${selectedTestItem.name}`}</CardTitle>}
      <Card>
        <CardBody>
          <div className="panel-header">Title</div>
          <Input type="text" name="name" id="example1" onChange={handleOnChange} value={testCaseObject.name} />

          <div className="panel-header">Summary</div>
          <Input type="textarea" name="summary" id="example2" onChange={handleOnChange} value={testCaseObject.sumary} />

          <div className="panel-header">Additional Information</div>
          <Input
            type="textarea"
            name="preconditions"
            id="example3"
            onChange={handleOnChange}
            value={testCaseObject.preconditions}
          />

          <fieldset className="border mt-2">
            <div className="form-row mt-1">
              <form className="form-group w-50 d-flex dd_container flex-start">
                <label className="mx-1">Test Case Status:</label>
                <Input
                  type="select"
                  name="status"
                  id="status"
                  onChange={handleOnChange}
                  defaultValue={testCaseObject.status}
                >
                  {Object.keys(status).map((item, index) => {
                    return (
                      <option key={index} value={Object.values(status)[index]}>
                        {item}
                      </option>
                    );
                  })}
                </Input>
              </form>

              <form className="form-group w-50 d-flex dd_container flex-start">
                <label className="mx-2">Execution Type:</label>
                <Input
                  type="select"
                  name="execution_type"
                  id="execution_type"
                  onChange={handleOnChange}
                  defaultValue={testCaseObject.execution_type}
                >
                  {Object.keys(execution_type).map((item, index) => {
                    return (
                      <option key={index} value={Object.values(execution_type)[index]}>
                        {item}
                      </option>
                    );
                  })}
                </Input>
              </form>
            </div>
          </fieldset>

          <div className="btn-toolbar mt-2">
            <Button color="success" className="mr-2" onClick={() => handleOnSave()}>
              Save
            </Button>
            <Button color="secondary" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </CardBody>
      </Card>{" "}
    </>
  );
};

export default EditTestCase;
