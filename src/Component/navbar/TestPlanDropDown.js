import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import withTestPlansFetching from "../HOC/withTestPlansFetching";
import { selectTestPlanAction } from "../../Redux/testPlan.action";
import DropDown from "../Common/DropDown";
import DropdownStyles from "../styles/DropdownStyles";
import styled from "styled-components";

const Label = styled.label`
  color: ${props => props.theme.grey};
  font-weight: 600;
  font-size: 0.8rem;
  padding-left: 3px;
  margin-right: 1px;
`;

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
      <Label>Plan: </Label>
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
