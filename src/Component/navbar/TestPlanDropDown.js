import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { selectTestPlanAction } from "../../Redux/testPlan.action";
import DropDown from "../Common/DropDown";
import withTestPlansFetching from "../HOC/withTestPlansFetching";

const TestPlanDropDown = ({ isTestPlanLoading, testPlans }) => {
  const [selectedItem, setSelectedItem] = useState({ name: "" });
  let dispatch = useDispatch();

  useEffect(() => {
    if (testPlans) {
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
        <DropDown
          title={isTestPlanLoading ? "Fetching Test Plan..." : selectedItem.name}
          items={testPlans}
          onSelect={handleOnChangeTestPlan}
        />
      }
    </React.Fragment>
  );
};

const TestPlanDropDownWithFetching = withTestPlansFetching(TestPlanDropDown);
export default TestPlanDropDownWithFetching;
