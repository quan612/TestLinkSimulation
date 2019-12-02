import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTestCaseToTestPlanAction } from "../../Redux/testCase.action";
import { Button, Card, CardBody, Container, Col, CustomInput } from "reactstrap";

function AddRemoveDetails({ listItems, selectedTestItem }) {
  const [listSubmit, setListSubmit] = useState([...listItems]);

  const { selectedProject, selectTestPlan } = useSelector(state => ({
    selectedProject: state.selectedProject,
    selectTestPlan: state.selectTestPlan
  }));
  const dispatch = useDispatch();

  const handleCheckAll = () => {};

  const handleOnCheckBoxChange = (e, index) => {
    let checked = e.target.checked;
    let temp = [...listItems];
    temp[index].checked = checked;
    setListSubmit([...temp]);
  };

  const handleOnSubmit = async () => {
    // let submitItems = listSubmit.filter(item => (item.checked ? item.checked === true : null));
    let test = [...listSubmit];
    console.log("obj before submit", listSubmit);
    Promise.all(
      test.map(async testCase => {
        if (testCase.chilrenOfThisTestPlan === false && testCase.checked === true) {
          testCase.chilrenOfThisTestPlan = true;

          await dispatch(
            addTestCaseToTestPlanAction(selectedProject, selectTestPlan, testCase.tc_external_id, testCase.version)
          )
            .then(message => {
              console.log(message);
            })
            .catch(error => console.log("error at submit case to plan", error));
        }
      })
    );
    console.log("obj after submit", test);
    setListSubmit(test);
  };

  return (
    <Container className="h_100 mw-99 d-flex">
      {/* <Row className="h-100"> */}
      <Col className="offset-lg-0 offset-md-3 d-flex flex-column">
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
            {selectedTestItem && (
              <div className="panel-header">{`Test Cases belong to Test Suite ${selectedTestItem.name}`}</div>
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
        {/* <DisplayState {...listSubmit} /> */}
      </Col>
      {/* </Row> */}
    </Container>
  );
}

export default AddRemoveDetails;

const DisplayState = listSubmit => (
  <div style={{ margin: "1rem 0", background: "#f6f8fa", padding: ".5rem" }}>
    <strong>Injected state (the form's state)</strong>
    {/* <div>
      <code>errors:</code> {JSON.stringify(props.errors, null, 2)}
    </div>
    <div>
      <code>values:</code> {JSON.stringify(props.value, null, 2)}
    </div> */}
    <div>
      <code>Items checked:</code> {JSON.stringify(listSubmit, null, 2)}
    </div>
  </div>
);
