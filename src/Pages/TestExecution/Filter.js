import React from "react";
import TestPlanDropDownWithFetching from "../../Component/Common/TestPlanDropDown";
import BuildDropDownWithFetching from "../../Component/Common/BuildDropDown";
import styled from "styled-components";

const Styled = styled.div`
  background: ${props => props.theme.nav_bg};
  background-image: ${props => props.theme.nav_bgImg};
  box-shadow: 0 1px 20px 0px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  color: ${props => props.theme.black};
  padding: 10px;
`;

const Filter = ({ selectedTestPlan, selectedProject }) => {
  return (
    <div>
      <Styled>
        <TestPlanDropDownWithFetching selectedProject={selectedProject} />
        <hr />
        <BuildDropDownWithFetching selectedTestPlan={selectedTestPlan} />
      </Styled>
    </div>
  );
};

export default Filter;
