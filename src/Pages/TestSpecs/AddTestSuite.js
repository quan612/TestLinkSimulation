import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Input } from "reactstrap";
import { getTestSuitesOfTestProjectApi, addTestSuiteHelper } from "../../Redux/apiHelpers";
import { postNumberOfTestSuitesAction } from "../../Redux/testProject.action";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor5-build-classic-with-font/ckeditor5-build-classic";
import { StyledTestDetails } from "../../Component/styles/StyledTestDetails";
import FormStyles from "../../Component/styles/FormStyles";

const AddTestSuite = ({ selectedProject, selectedTestItem, onClose }) => {
  const [testSuiteObject, setTestSuiteObject] = useState({
    name: "",
    details: ""
  });

  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const handleOnChange = e => {
    const { name, value } = e.target;
    setTestSuiteObject(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const handleOnSave = async e => {
    try {
      e.preventDefault();
      await addTestSuiteHelper(selectedProject, selectedTestItem.id, testSuiteObject)
        .then(async result => {
          console.log(result);
          const testSuites = await getTestSuitesOfTestProjectApi(selectedProject);
          dispatch(postNumberOfTestSuitesAction(testSuites.length));
          onClose();
        })
        .catch(error => {
          setError(error);
          console.log(error);
        });
    } catch (error) {
      console.error("Catch error at handle on Save test suite function ", error);
    }
  };

  return (
    <StyledTestDetails>
      <h1>Create a new test suite under Suite: {selectedTestItem.name}</h1>
      <div className="details">
        <FormStyles>
          <form onSubmit={e => handleOnSave(e)}>
            <div className="panel-header">Test Suite Name</div>
            <Input type="text" name="name" id="name" onChange={handleOnChange} invalid={error ? true : false} />
            {error && <label className="error">{error}</label>}
            <div className="panel-header">Test Suite Details</div>
            <CKEditor
              editor={ClassicEditor}
              data={testSuiteObject.details}
              onInit={editor => {}}
              onChange={(event, editor) => {
                const data = editor.getData();
                setTestSuiteObject(prevState => {
                  return { ...prevState, details: data };
                });
              }}
            />

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

export default AddTestSuite;
