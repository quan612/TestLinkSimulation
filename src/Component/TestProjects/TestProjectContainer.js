import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadTestProjectsAction, deleteTestProjectAction } from "../../Redux/testProject.action";
import AddTestProjectContainer from "./AddTestProjectContainer";
import TestProjectsManagement from "./TestProjectsManagement";

const TestProjectContainer = () => {
  const { isProjectLoading, testProjects } = useSelector(state => ({
    isProjectLoading: state.isProjectLoading,
    testProjects: state.testProjects
  }));

  const dispatch = useDispatch();
  const [isAddProject, setAddProject] = useState(false);

  const handleDeleteSubmit = async project => {
    await dispatch(deleteTestProjectAction(project));
    await dispatch(loadTestProjectsAction());
  };

  return isAddProject ? (
    <AddTestProjectContainer onClose={() => setAddProject(false)} />
  ) : (
    <TestProjectsManagement
      isProjectLoading={isProjectLoading}
      testProjects={testProjects}
      handleOnAdd={() => setAddProject(true)}
      handleOnDelete={project => handleDeleteSubmit(project)}
    />
  );
};

export default TestProjectContainer;
