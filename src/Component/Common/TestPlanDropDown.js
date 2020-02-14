import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import withTestPlansFetching from "../HOC/withTestPlansFetching";
import { selectTestPlanAction } from "../../Redux/testPlan.action";
import DropDown from "./DropDown";
import DropdownStyles from "../styles/DropdownStyles";
import styled from "styled-components";

const Label = styled.label`
  color: ${props => props.theme.grey};
  font-weight: 600;
  font-size: 0.8rem;
  margin: 0 !important;
  margin-right: 2px;
`;

export const TestPlanDropDown = ({ isTestPlanLoading, testPlans }) => {
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
    <div className="d-flex align-items-center justify-content-between ">
      <Label>Test Plan: </Label>
      {
        <DropdownStyles>
          <DropDown
            title={isTestPlanLoading || testPlans === [] ? "Fetching Test Plan..." : selectedItem.name}
            items={testPlans}
            onSelect={handleOnChangeTestPlan}
          />
        </DropdownStyles>
      }
    </div>
  );
};

const TestPlanDropDownWithFetching = withTestPlansFetching(TestPlanDropDown);
export default TestPlanDropDownWithFetching;
