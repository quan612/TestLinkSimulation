import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTestItemAction } from "../../Redux/actions";
import { updateTestCaseWithoutStepsUpdateHelper, getTestCaseHelper } from "../../Redux/apiHelpers";
import { FormDetailContainer } from "../../Component/styles/StyledTestDetails";
import FormStyles from "../../Component/styles/FormStyles";
import { Input } from "reactstrap";
import { Card, Header, CardTitle } from "../../Component/styles/BodyStyles";
import constant from "../../Library/constants";

const status = constant.TestCaseStatus;
const execution_type = constant.ExecutionType;

const EditTestCase = ({ testCase, onClose }) => {
  const [testCaseObject, setTestCaseObject] = useState({
    name: testCase.name,
    tc_external_id: testCase.tc_external_id,
    summary: testCase.summary,
    preconditions: testCase.preconditions,
    status: testCase.status,
    execution_type: testCase.execution_type,
    steps: testCase.steps,
    version: testCase.version
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

    // change the return object so that we dont need to loop foreach there
    updateTestCaseWithoutStepsUpdateHelper(selectedProject, testCaseObject)
      .then(async message => {
        const testcase = await getTestCaseHelper(testCase.testcase_id);
        testcase.forEach(async data => {
          data.node = "File";
          await dispatch(selectTestItemAction(data));
          onClose();
        });
      })
      .catch(error => console.log("catch error at update test case ", error));
  };

  return (
    <FormDetailContainer>
      <Header>Edit Test Case</Header>

      <FormStyles>
        <Card>
          <form onSubmit={e => handleOnSave(e)}>
            <CardTitle>Title</CardTitle>
            <Input type="text" name="name" id="example1" onChange={handleOnChange} value={testCaseObject.name} />

            <CardTitle>Summary</CardTitle>
            <Input
              type="textarea"
              name="summary"
              id="summary"
              onChange={handleOnChange}
              value={testCaseObject.summary}
            />

            <CardTitle>Additional Information</CardTitle>
            <Input
              type="textarea"
              name="preconditions"
              id="preconditions"
              onChange={handleOnChange}
              value={testCaseObject.preconditions}
            />

            <CardTitle className="d-flex ">
              <span className="align-self-center">Status:</span>
              <Input
                className="ml-2"
                type="select"
                name="status"
                id="status"
                onChange={handleOnChange}
                defaultValue={testCaseObject.status}
                maxLength={100}
              >
                {Object.keys(status).map((item, index) => {
                  return (
                    <option key={index} value={Object.values(status)[index]}>
                      {item}
                    </option>
                  );
                })}
              </Input>
              <span className="align-self-center ml-2">Execution:</span>
              <Input
                className="ml-2"
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
            </CardTitle>

            <div className="button-wrapper">
              <button className="btn btn-success" type="submit">
                Update
              </button>
              <button className="btn btn-secondary ml-2" onClick={() => onClose()}>
                Cancel
              </button>
            </div>
          </form>
        </Card>
      </FormStyles>
    </FormDetailContainer>
  );
};

export default EditTestCase;
