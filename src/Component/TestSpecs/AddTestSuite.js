import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Card, CardBody, Button, Input, CardHeader } from "reactstrap";
import { getTestSuitesOfTestProjectApi, addTestSuiteHelper } from "../../Redux/apiHelpers";
import { postNumberOfTestSuitesAction } from "../../Redux/testProject.action";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor5-build-classic-with-font/ckeditor5-build-classic";

const AddTestSuite = ({ selectedProject, selectedTestItem, onClose }) => {
  const [testSuiteObject, setTestSuiteObject] = useState({
    name: "",
    details: ""
  });

  const dispatch = useDispatch();

  const handleOnChange = e => {
    const { name, value } = e.target;
    setTestSuiteObject(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const handleOnSave = async () => {
    try {
      await addTestSuiteHelper(selectedProject, selectedTestItem.id, testSuiteObject);
      const testSuites = await getTestSuitesOfTestProjectApi(selectedProject);
      dispatch(postNumberOfTestSuitesAction(testSuites.length));
      onClose();
    } catch (error) {
      console.error("Catch error at handle on Save test suite function ", error);
    }
  };

  return (
    <Card>
      <CardHeader>Create a new test suite</CardHeader>
      <CardBody>
        <form>
          <div className="panel-header">Test Suite Name</div>
          <Input type="text" name="name" id="name" onChange={handleOnChange} />

          <div className="panel-header">Details</div>
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

          <div className=" btn-toolbar mt-2">
            <Button className="btn btn-success" onClick={() => handleOnSave()}>
              Create
            </Button>
            <Button className="btn btn-secondary ml-2" onClick={() => onClose()}>
              Cancel
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default AddTestSuite;
