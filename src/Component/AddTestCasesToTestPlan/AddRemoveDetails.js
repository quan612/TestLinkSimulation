import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTestCaseToTestPlanAction } from "../../Redux/testCase.action";
import { Button, Card, CardBody, Container, Col, CustomInput } from "reactstrap";

function AddRemoveDetails({ selectedProject, selectTestPlan, listItems, selectedTestSuite }) {
  const [listSubmit, setListSubmit] = useState([...listItems]);

  const dispatch = useDispatch();

  const handleCheckAll = () => {
    let temp = [...listItems];
    temp.forEach(item => {
      if (item.chilrenOfThisTestPlan === false) item.checked = true;
    });
    setListSubmit([...temp]);
  };

  const handleOnCheckBoxChange = (e, index) => {
    let temp = [...listItems];
    temp[index].checked = e.target.checked;
    setListSubmit([...temp]);
  };

  const handleOnSubmit = async () => {
    let data = [...listSubmit];

    Promise.all(
      data.map(async testCase => {
        if (testCase.chilrenOfThisTestPlan === false && testCase.checked === true) {
          testCase.chilrenOfThisTestPlan = true;

          await dispatch(
            addTestCaseToTestPlanAction(selectedProject, selectTestPlan, testCase.tc_external_id, testCase.version)
          ).catch(error => console.log("error at submit case to plan", error));
        }
      })
    );

    setListSubmit(data);
  };

  return (
    <>
      <h1>{"Add or Remove Panel"}</h1>
      <Card className="execution-details-submit">
        <div className="result-box ">
          <span className="mr-3">Add selected test case to selected test plan: </span>
          <Button className="btn btn-info ml-3" color="primary" size="sm" onClick={() => handleOnSubmit()}>
            Submit
          </Button>
        </div>
      </Card>
      <Card className="h_100">
        <CardBody>
          {selectedTestSuite && (
            <div className="panel-header">{`Test Cases belong to Test Suite ${selectedTestSuite.name}`}</div>
          )}

          <Button className="btn btn-info my-2" color="secondary" size="sm" onClick={handleCheckAll}>
            Check All
          </Button>

          <div className="list-tree-items">
            {listItems &&
              listItems.map((item, index) => (
                <CustomInput
                  key={index}
                  id={item.id}
                  type="checkbox"
                  disabled={item.chilrenOfThisTestPlan === true ? true : false}
                  name="testcases"
                  checked={item.checked || item.hasOwnProperty("checked") ? item.checked : false}
                  onChange={e => handleOnCheckBoxChange(e, index)}
                  label={item.name}
                />
              ))}
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default AddRemoveDetails;
