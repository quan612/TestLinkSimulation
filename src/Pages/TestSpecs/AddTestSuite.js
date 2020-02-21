import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Input } from "reactstrap";
import { getTestSuitesOfTestProjectApi, addTestSuiteHelper } from "../../Redux/apiHelpers";
import { postNumberOfTestSuitesAction } from "../../Redux/testProject.action";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor5-build-classic-with-font/ckeditor5-build-classic";
import { FormDetailContainer } from "../../Component/styles/StyledTestDetails";
import FormStyles from "../../Component/styles/FormStyles";
import { Card, CardTitle, SectionHeader } from "../../Component/styles/BodyStyles";

const AddTestSuite = ({ selectedProject, parentSuite, onClose }) => {
  const [testSuiteObject, setTestSuiteObject] = useState({
    name: "",
    details: ""
  });
  const inputSuiteName = useRef(null);

  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleOnChange = e => {
    const { name, value } = e.target;
    if (value !== "" && error !== null) setError(null);

    setTestSuiteObject(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const handleOnSave = async e => {
    try {
      e.preventDefault();

      if (inputSuiteName.current.value === "") {
        setError("Name is required");
      } else {
        await addTestSuiteHelper(selectedProject, parentSuite.id, testSuiteObject)
          .then(async result => {
            const testSuites = await getTestSuitesOfTestProjectApi(selectedProject);
            dispatch(postNumberOfTestSuitesAction(testSuites.length));
            onClose();
          })
          .catch(error => {
            setError(error);
          });
      }
    } catch (error) {
      console.error("Catch error at handle on Save test suite function ", error);
    }
  };

  return (
    <FormDetailContainer>
      <SectionHeader>Create Test Suite</SectionHeader>
      <FormStyles>
        <Card>
          <form onSubmit={e => handleOnSave(e)}>
            <CardTitle>Test Suite Name</CardTitle>

            <Input
              innerRef={inputSuiteName}
              type="text"
              name="name"
              id="name"
              onChange={handleOnChange}
              invalid={error ? true : false}
              maxLength={100}
            />
            {error && <label className="error">{error}</label>}

            <CardTitle>Test Suite Details</CardTitle>
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

            <div className="button-wrapper mt-2">
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

export default AddTestSuite;
