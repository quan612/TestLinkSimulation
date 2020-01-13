import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { selectTestPlanAction } from "../../Redux/testPlan.action";
import DropDown from "../Common/DropDown";
import DropdownStyles from "../styles/DropdownStyles";
import withTestPlansFetching from "../HOC/withTestPlansFetching";

const TestPlanDropDown = ({ isTestPlanLoading, testPlans }) => {
  const [selectedItem, setSelectedItem] = useState({ name: "" });
  let dispatch = useDispatch();

  useEffect(() => {
    if (testPlans.length > 0) {
      setSelectedItem(testPlans[0]);
      dispatch(selectTestPlanAction(testPlans[0]));
    } else {
      setSelectedItem({ name: "There is no test plan" });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testPlans]);

  const handleOnChangeTestPlan = eventKey => {
    setSelectedItem(testPlans[eventKey]);
    dispatch(selectTestPlanAction(testPlans[eventKey]));
  };

  return (
    <React.Fragment>
      <label className="mr-1 text-light">Test Plan: </label>
      {
        <DropdownStyles>
          <DropDown
            title={isTestPlanLoading || testPlans === [] ? "Fetching Test Plan..." : selectedItem.name}
            items={testPlans}
            onSelect={handleOnChangeTestPlan}
          />
        </DropdownStyles>
      }
    </React.Fragment>
  );
};

const TestPlanDropDownWithFetching = withTestPlansFetching(TestPlanDropDown);
export default TestPlanDropDownWithFetching;
