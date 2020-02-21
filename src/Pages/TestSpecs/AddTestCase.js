import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Input } from "reactstrap";
import { getTestCasesOfTestProjectHelper, addTestCaseHelper } from "../../Redux/apiHelpers";
import { postNumberOfTestCasesAction } from "../../Redux/testProject.action";
import { FormDetailContainer } from "../../Component/styles/StyledTestDetails";
import { Card, CardTitle, SectionHeader } from "../../Component/styles/BodyStyles";
import FormStyles from "../../Component/styles/FormStyles";
import constant from "../../Library/constants";

const status = constant.TestCaseStatus;
const execution_type = constant.ExecutionType;

const AddTestCase = ({ selectedProject, parentSuite, onClose }) => {
  const [testCaseObject, setTestCaseObject] = useState({
    name: "",
    summary: "",
    preconditions: "",
    status: Object.values(status).find(key => key === status.DRAFT),
    execution_type: Object.values(execution_type).find(key => key === execution_type.MANUAL)
  });

  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  const handleOnChange = e => {
    const { name, value } = e.target;

    setTestCaseObject(prevState => {
      return { ...prevState, [name]: value };
    });

    if (error !== null && testCaseObject.name !== "") setError(null);
  };

  const handleOnSave = e => {
    e.preventDefault();
    if (testCaseObject.name === "") setError("Name is required");
    else {
      addTestCaseHelper(selectedProject, parentSuite, testCaseObject)
        .then(async success => {
          const testCasesOfProject = await getTestCasesOfTestProjectHelper(selectedProject);
          dispatch(postNumberOfTestCasesAction(testCasesOfProject.length));
          onClose();
        })
        .catch(error => {
          console.log(error);
          setError(error);
        });
    }
  };

  return (
    <FormDetailContainer>
      <SectionHeader>Create Test Case</SectionHeader>

      <FormStyles>
        <Card>
          <form onSubmit={e => handleOnSave(e)}>
            <CardTitle>Test Case Title</CardTitle>

            <Input type="text" name="name" onChange={handleOnChange} invalid={error ? true : false} maxLength={100} />
            {error && <span style={{ color: "red" }}>{error}</span>}

            <CardTitle>Summary</CardTitle>
            <Input type="textarea" name="summary" onChange={handleOnChange} />

            <CardTitle>Additional Information</CardTitle>
            <Input type="textarea" name="preconditions" onChange={handleOnChange} />

            <CardTitle className="d-flex ">
              <span className="align-self-center">Status:</span>
              <Input
                className="ml-2"
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

            <div className="button-bar">
              <button className="btn btn-success" type="submit">
                Create
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

export default AddTestCase;
