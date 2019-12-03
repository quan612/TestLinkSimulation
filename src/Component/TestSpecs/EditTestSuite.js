import { Card, CardHeader, CardBody } from "reactstrap";
import React, { useState } from "react";
import { updateTestSuiteHelper } from "../../Redux/apiHelpers";

const EditTestSuite = ({ selectedProject, selectedTestSuite, onSave, onCancel }) => {
  const [data, setData] = useState({
    name: selectedTestSuite.name,
    details: selectedTestSuite.details,
    parent_id: selectedTestSuite.parent_id
  });

  const handleOnChange = e => {
    const { name, value } = e.target;
    setData(prevState => {
      return {
        ...prevState,
        [name]: value
      };
    });
  };

  const handleOnSave = () => {
    updateTestSuiteHelper(selectedProject, selectedTestSuite.parent_id, data)
      .then(message => {
        console.log(message);
        onSave();
      })
      .catch(error => {
        console.log("catch error at update test suite helper", error);
      });
  };

  return (
    <Card className="h-100">
      <CardHeader>
        <b style={{ color: "red" }}>The API provided by Test Link does not work</b>
      </CardHeader>
      <CardBody>
        <form>
          <div className="panel-header">Test Suite Name</div>
          <input type="text" name="name" className="form-control" value={data.name} onChange={handleOnChange}></input>

          <div className="panel-header">Test Suite Details</div>
          <input
            type="text"
            name="details"
            className="form-control"
            value={data.details}
            onChange={handleOnChange}
          ></input>

          <div className=" btn-toolbar">
            <button type="button" className="btn btn-outline-success mr-2" onClick={() => handleOnSave()}>
              Save
            </button>
            <button type="button" className="btn btn-outline-info" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default EditTestSuite;
