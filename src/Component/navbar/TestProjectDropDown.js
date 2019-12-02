import React, { useState, useEffect } from "react";
import withTestProjectsFetching from "../HOC/withTestProjectsFetching";
import { useDispatch } from "react-redux";
import { selectTestProjectAction } from "../../Redux/testProject.action";
import DropDown from "../DropDown";

const TestProjectDropDown = ({ isLoading, testProjects }) => {
  const [selectedItem, setSelectedItem] = useState({ name: "" });
  let dispatch = useDispatch();

  useEffect(() => {
    if (testProjects) {
      setSelectedItem(testProjects[0]);
      dispatch(selectTestProjectAction(testProjects[0]));
    }
  }, [testProjects]);

  const handleChangeProject = eventKey => {
    setSelectedItem(testProjects[eventKey]);
    dispatch(selectTestProjectAction(testProjects[eventKey]));
  };

  return (
    <React.Fragment>
      <label className="mr-1 text-light">Test Project: </label>
      {
        <DropDown
          title={isLoading ? "Fetching projects..." : selectedItem.name}
          items={testProjects}
          onSelect={handleChangeProject}
        />
      }
    </React.Fragment>
  );
};

const TestProjectDropDownWithFetching = withTestProjectsFetching(TestProjectDropDown);
export default TestProjectDropDownWithFetching;
