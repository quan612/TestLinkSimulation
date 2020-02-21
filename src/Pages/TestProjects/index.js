import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadTestProjectsAction, deleteTestProjectAction } from "../../Redux/testProject.action";
import { ProjectsManagement } from "./ProjectsManagement";

const Projects = () => {
  const { isProjectLoading, testProjects } = useSelector(state => ({
    isProjectLoading: state.isProjectLoading,
    testProjects: state.testProjects
  }));

  const dispatch = useDispatch();

  const handleDeleteSubmit = async project => {
    await dispatch(deleteTestProjectAction(project));
    await dispatch(loadTestProjectsAction());
  };

  return (
    <ProjectsManagement
      isProjectLoading={isProjectLoading}
      projects={testProjects}
      handleOnDelete={project => handleDeleteSubmit(project)}
    />
  );
};

export default Projects;
