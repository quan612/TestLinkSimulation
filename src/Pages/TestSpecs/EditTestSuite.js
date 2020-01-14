import { Card, CardHeader, CardBody } from "reactstrap";
import React, { useState } from "react";
import { updateTestSuiteHelper } from "../../Redux/apiHelpers";
import { StyledTestDetails } from "../../Component/styles/StyledTestDetails";
import FormStyles from "../../Component/styles/FormStyles";

const EditTestSuite = ({ selectedProject, selectedTestSuite, onClose }) => {
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

  const handleOnSave = e => {
    e.preventDefault();
    updateTestSuiteHelper(selectedProject, selectedTestSuite.parent_id, data)
      .then(message => {
        console.log(message);
        onClose();
      })
      .catch(error => {
        console.log("catch error at update test suite helper", error);
      });
  };

  return (
    <StyledTestDetails>
      {selectedTestSuite && <h1>Update test suite: {selectedTestSuite.name}</h1>}
      <b style={{ color: "red" }}>The API provided by Test Link does not work</b>

      <div className="details">
        <FormStyles>
          <form onSubmit={e => handleOnSave(e)}>
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

            <div className="buttonBar">
              <button className="btn btn-success" type="submit">
                Update Suite
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

export default EditTestSuite;
