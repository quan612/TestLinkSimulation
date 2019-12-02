import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadTestProjectsAction, deleteTestProjectAction } from "../../Redux/testProject.action";
import AddTestProject from "./AddTestProject";
import TestProjectsManagement from "./TestProjectsManagement";

const TestProjectContainer = () => {
  const { isLoading, testProjects } = useSelector(state => ({
    isLoading: state.isProjectLoading,
    testProjects: state.testProjects
  }));

  const dispatch = useDispatch();
  const [isCreateProject, setCreateProject] = useState(false);

  const handleDeleteSubmit = async project => {
    await dispatch(deleteTestProjectAction(project));
    await dispatch(loadTestProjectsAction());
  };

  return isCreateProject ? (
    <div className="workBody">
      <AddTestProject onCancel={() => setCreateProject(false)} />
    </div>
  ) : (
    <div className="workBody">
      <TestProjectsManagement
        isLoading={isLoading}
        testProjects={testProjects}
        handleOnAdd={() => setCreateProject(true)}
        handleOnDelete={project => handleDeleteSubmit(project)}
      />
    </div>
  );
};

export default TestProjectContainer;
