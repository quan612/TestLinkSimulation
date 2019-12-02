import React, { useState } from "react";
import constant from "../../Library/constants";
import { useDispatch } from "react-redux";
import { Card, CardTitle, CardBody, Button, Input } from "reactstrap";
import { getTestCasesOfTestProjectHelper, addTestCaseHelper } from "../../Redux/apiHelpers";
import { postNumberOfTestCasesAction } from "../../Redux/testProject.action";

const status = constant.TestCaseStatus;
const execution_type = constant.ExecutionType;

const AddTestCase = ({ selectedProject, selectedTestItem, onSave, onCancel }) => {
  const [testCaseObject, setTestCaseObject] = useState({
    name: "",
    summary: "",
    preconditions: "",
    status: Object.values(status).find(key => key === status.DRAFT),
    execution_type: Object.values(execution_type).find(key => key === execution_type.MANUAL)
  });

  const dispatch = useDispatch();

  const handleOnChange = e => {
    const { name, value } = e.target;
    setTestCaseObject(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const handleOnSave = async () => {
    addTestCaseHelper(selectedProject, selectedTestItem, testCaseObject);
    const testCasesOfProject = await getTestCasesOfTestProjectHelper(selectedProject);
    dispatch(postNumberOfTestCasesAction(testCasesOfProject.length));
    onSave();
  };

  return (
    <>
      {selectedTestItem && <CardTitle>{`Test Suite: ${selectedTestItem.name}`}</CardTitle>}
      <Card>
        <CardBody>
          <div className="panel-header">Title</div>
          <Input type="text" name="name" id="example1" onChange={handleOnChange} />

          <div className="panel-header">Summary</div>
          <Input type="textarea" name="summary" id="example2" onChange={handleOnChange} />

          <div className="panel-header">Additional Information</div>
          <Input type="textarea" name="preconditions" id="example3" onChange={handleOnChange} />

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

export default AddTestCase;
