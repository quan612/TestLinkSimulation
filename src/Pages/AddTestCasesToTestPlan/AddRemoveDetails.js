import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTestCaseToTestPlanAction } from "../../Redux/testCase.action";
import { CardTitle, CardContent, SectionHeader } from "../../Component/styles/BodyStyles";
import { Button, CustomInput } from "reactstrap";
var he = require("he");

function AddRemoveDetails({ selectedProject, selectedTestPlan, testCases, selectedTestSuite }) {
  const [listSubmit, setListSubmit] = useState([...testCases]);
  const dispatch = useDispatch();

  const handleCheckAll = () => {
    let temp = [...testCases];
    temp.forEach(item => {
      if (item.chilrenOfThisTestPlan === false) item.checked = true;
    });
    setListSubmit([...temp]);
  };

  const handleOnCheckBoxChange = (e, index) => {
    let temp = [...testCases];
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
            addTestCaseToTestPlanAction(selectedProject, selectedTestPlan, testCase.tc_external_id, testCase.version)
          ).catch(error => console.log("error at submit case to plan", error));
        }
      })
    );

    setListSubmit(data);
  };

  if (selectedTestSuite && testCases && Object.keys(testCases).length > 0) {
    return (
      <>
        {selectedTestPlan && <SectionHeader>Add Test Cases To Test Plan: {`${selectedTestPlan.name}`}</SectionHeader>}

        <div className="d-flex ml-2 align-items-center">
          <span>Select below test cases then submit:</span>
          <Button className="btn btn-info my-1 ml-1" color="secondary" size="sm" onClick={handleCheckAll}>
            Check All
          </Button>
          <Button className="btn btn-info my-1 ml-1" color="primary" size="sm" onClick={() => handleOnSubmit()}>
            Submit
          </Button>
        </div>

        {selectedTestSuite && (
          <SectionHeader>{`Test Cases belong to Test Suite - ${selectedTestSuite.name}`}</SectionHeader>
        )}

        <div className="d-flex flex-column">
          {testCases &&
            testCases.map((item, index) => (
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
      </>
    );
  } else {
    return (
      <>
        {selectedTestPlan && Object.keys(selectedTestPlan).length > 0 && (
          <CardTitle>{`Test Plan: ${selectedTestPlan.name}`}</CardTitle>
        )}
        <div>
          <SectionHeader>Details</SectionHeader>
          {selectedTestPlan && selectedTestPlan.notes && (
            <CardContent dangerouslySetInnerHTML={{ __html: he.decode(selectedTestPlan.notes) }}></CardContent>
          )}
        </div>
      </>
    );
  }
}

export default AddRemoveDetails;
