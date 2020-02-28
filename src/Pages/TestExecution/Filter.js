import React from "react";
import { useSelector } from "react-redux";

import TestPlanDropDownWithFetching from "../../Component/Common/TestPlanDropDown";
import BuildDropDownWithFetching from "../../Component/Common/BuildDropDown";
import styled from "styled-components";

const Styled = styled.div`
  color: ${props => props.theme.black};
  padding: 10px;
  max-width: 500px;
`;

const Filter = () => {
  const { selectedProject, testPlans, selectedTestPlan, isTestPlanLoading } = useSelector(state => ({
    selectedProject: state.selectedProject,
    testPlans: state.testPlans,
    selectedTestPlan: state.selectedTestPlan,
    isTestPlanLoading: state.isTestPlanLoading
  }));

  return (
    <Styled>
      <TestPlanDropDownWithFetching selectedProject={selectedProject} />
      <hr />
      {!isTestPlanLoading && testPlans && Object.values(testPlans).length > 0 && (
        <BuildDropDownWithFetching selectedTestPlan={selectedTestPlan} />
      )}
    </Styled>
  );
};

export default Filter;
