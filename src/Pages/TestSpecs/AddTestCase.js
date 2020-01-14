import React, { useState } from "react";
import constant from "../../Library/constants";
import { useDispatch } from "react-redux";
import { Input } from "reactstrap";
import { getTestCasesOfTestProjectHelper, addTestCaseHelper } from "../../Redux/apiHelpers";
import { postNumberOfTestCasesAction } from "../../Redux/testProject.action";
import { StyledTestDetails } from "../../Component/styles/StyledTestDetails";
import FormStyles from "../../Component/styles/FormStyles";

const status = constant.TestCaseStatus;
const execution_type = constant.ExecutionType;

const AddTestCase = ({ selectedProject, selectedTestSuite, onClose }) => {
  const [testCaseObject, setTestCaseObject] = useState({
    name: "",
    summary: "",
    preconditions: "",
    status: Object.values(status).find(key => key === status.DRAFT),
    execution_type: Object.values(execution_type).find(key => key === execution_type.MANUAL)
  });

  const [validationError, setValidationError] = useState("");

  const dispatch = useDispatch();

  const handleOnChange = e => {
    const { name, value } = e.target;
    setTestCaseObject(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const handleOnSave = e => {
    e.preventDefault();
    addTestCaseHelper(selectedProject, selectedTestSuite, testCaseObject)
      .then(async success => {
        console.log(success);
        const testCasesOfProject = await getTestCasesOfTestProjectHelper(selectedProject);
        dispatch(postNumberOfTestCasesAction(testCasesOfProject.length));
        onClose();
      })
      .catch(error => {
        setValidationError(error);
      });
  };

  return (
    <StyledTestDetails>
      {selectedTestSuite && <h1>{`Creating test case under test suite: ${selectedTestSuite.name}`}</h1>}
      <div className="details">
        <FormStyles>
          <form onSubmit={e => handleOnSave(e)}>
            <div className="panel-header">Test Case Title</div>

            <Input type="text" name="name" onChange={handleOnChange} invalid={validationError ? true : false} />
            {validationError && <span style={{ color: "red" }}>{validationError}</span>}

            <div className="panel-header">Summary</div>
            <Input type="textarea" name="summary" onChange={handleOnChange} />

            <div className="panel-header">Additional Information</div>
            <Input type="textarea" name="preconditions" onChange={handleOnChange} />

            <fieldset className="border mt-2">
              <div className="form-row mt-1">
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
              </div>
            </fieldset>

            <div className="buttonBar">
              <button className="btn btn-success" type="submit">
                Create
              </button>
              <button className="btn btn-secondary ml-2" onClick={() => onClose()}>
                Cancel
              </button>
            </div>
          </form>
        </FormStyles>
      </div>
    </StyledTestDetails>
  );
};

export default AddTestCase;
