import { Card, CardHeader, CardBody, Button, Input, Container, Row, Col } from "reactstrap";
import React, { useState } from "react";

const EditTestSuite = ({ testLink, selectedProject, selectedTestItem, onSave, onCancel }) => {
  const [suiteName, setSuiteName] = useState(selectedTestItem.name);
  const [suiteDetails, setSuiteDetails] = useState(selectedTestItem.details);

  const handleOnNameChange = e => {
    setSuiteName(e.target.value);
  };

  const handleOnDetailsChange = e => {
    setSuiteDetails(e.target.value);
  };

  const handleOnSave = async () => {
    try {
      // console.log(selectedProject.id);
      // console.log(selectedProject.prefix);
      // console.log(suiteName);
      // console.log(suiteDetails);
      // console.log(selectedTestItem.parent_id);
      testLink
        .updateTestSuite({
          testprojectid: selectedProject.id,
          prefix: selectedProject.prefix,
          testsuitename: suiteName,
          details: suiteDetails,
          parentid: selectedTestItem.parent_id
        })
        .then(message => console.log(message))
        .catch(error => console.log("catch error at update test suite", error));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <b style={{ color: "red" }}>The API provided by Test Link does not work</b>
      </CardHeader>
      <CardBody>
        <form>
          <div className="panel-header">Test Suite Name</div>
          <input type="text" className="form-control" value={suiteName} onChange={e => handleOnNameChange(e)}></input>

          <div className="panel-header">Test Suite Details</div>
          <div dangerouslySetInnerHTML={{ __html: suiteDetails }} onChange={e => handleOnDetailsChange(e)} />

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
