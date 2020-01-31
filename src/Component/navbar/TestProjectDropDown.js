import React, { useState, useEffect } from "react";
import withTestProjectsFetching from "../HOC/withTestProjectsFetching";
import { useDispatch } from "react-redux";
import { selectTestProjectAction } from "../../Redux/testProject.action";
import DropDown from "../Common/DropDown";
import DropdownStyles from "../styles/DropdownStyles";
import styled from "styled-components";

const Label = styled.label`
  color: ${props => props.theme.grey};
  font-weight: 600;
  font-size: 0.8rem;
  margin-right: 1px;
`;

const TestProjectDropDown = ({ isLoading, testProjects }) => {
  const [selectedItem, setSelectedItem] = useState({ name: "" });
  let dispatch = useDispatch();

  useEffect(() => {
    if (testProjects.length > 0) {
      console.log("testProjects", testProjects);
      setSelectedItem(testProjects[0]);
      dispatch(selectTestProjectAction(testProjects[0]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testProjects]);

  const handleChangeProject = eventKey => {
    setSelectedItem(testProjects[eventKey]);
    dispatch(selectTestProjectAction(testProjects[eventKey]));
  };

  return (
    <React.Fragment>
      <Label>Test Project: </Label>
      {
        <DropdownStyles>
          <DropDown
            title={isLoading ? "Fetching projects..." : selectedItem.name}
            items={testProjects}
            onSelect={handleChangeProject}
          />
        </DropdownStyles>
      }
    </React.Fragment>
  );
};

const TestProjectDropDownWithFetching = withTestProjectsFetching(TestProjectDropDown);
export default TestProjectDropDownWithFetching;
