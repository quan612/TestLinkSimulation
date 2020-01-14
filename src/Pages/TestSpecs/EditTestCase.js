import React, { useState } from "react";
import constant from "../../Library/constants";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "reactstrap";
import { selectTestItemAction } from "../../Redux/actions";
import { updateTestCaseWithoutStepsUpdateHelper, getTestCaseHelper } from "../../Redux/apiHelpers";
import { StyledTestDetails } from "../../Component/styles/StyledTestDetails";
import FormStyles from "../../Component/styles/FormStyles";

const status = constant.TestCaseStatus;
const execution_type = constant.ExecutionType;

const EditTestCase = ({ selectedTestItem, onClose }) => {
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
  const handleOnSave = e => {
    e.preventDefault();
    console.log("selectedTestItem", selectedTestItem);
    // change the return object so that we dont need to loop foreach there
    updateTestCaseWithoutStepsUpdateHelper(selectedProject, testCaseObject)
      .then(async message => {
        const testcase = await getTestCaseHelper(selectedTestItem.testcase_id);
        console.log("testcase testing", testcase); // test this
        testcase.forEach(async data => {
          data.node = "File";
          await dispatch(selectTestItemAction(data));
          onClose();
        });
      })
      .catch(error => console.log("catch error at update test case ", error));
  };

  return (
    <StyledTestDetails>
      {selectedTestItem && <h1>{`Edit Test Case: ${selectedTestItem.name}`}</h1>}
      <div className="details">
        <FormStyles>
          <form onSubmit={e => handleOnSave(e)}>
            <div className="panel-header">Title</div>
            <Input type="text" name="name" id="example1" onChange={handleOnChange} value={testCaseObject.name} />

            <div className="panel-header">Summary</div>
            <Input
              type="textarea"
              name="summary"
              id="summary"
              onChange={handleOnChange}
              value={testCaseObject.sumary}
            />

            <div className="panel-header">Additional Information</div>
            <Input
              type="textarea"
              name="preconditions"
              id="preconditions"
              onChange={handleOnChange}
              value={testCaseObject.preconditions}
            />

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
                Update Test Case
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

export default EditTestCase;
