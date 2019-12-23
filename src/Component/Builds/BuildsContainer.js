import React, { useState } from "react";
import { useSelector } from "react-redux";
import useBuildsFetching from "../CustomHooks/useBuildsFetching";
import BuildsManagement from "./BuildsManagement";
import AddBuildContainer from "./AddBuildContainer";
import CreateNewTestPlanLinkPage from "../Containers/CreateNewTestPlanLinkPage";

const BuildsContainer = () => {
  const { selectedProject, testPlans, selectTestPlan } = useSelector(state => ({
    selectedProject: state.selectedProject,
    testPlans: state.testPlans,
    selectTestPlan: state.selectTestPlan
  }));

  const { isLoading, buildsOfCurrentTestPlan } = useBuildsFetching(selectTestPlan);
  const [isAddBuild, setAddBuild] = useState(false);

  const handleDeleteSubmit = async itemToDelete => {};

  if (testPlans === "") {
    return <CreateNewTestPlanLinkPage selectedProject={selectedProject} />;
  }

  return isAddBuild ? (
    <AddBuildContainer onClose={() => setAddBuild(false)} />
  ) : (
    <BuildsManagement
      isLoading={isLoading}
      selectTestPlan={selectTestPlan}
      builds={buildsOfCurrentTestPlan}
      handleOnAdd={() => setAddBuild(true)}
      handleOnDelete={build => handleDeleteSubmit(build)}
    />
  );
};

export default BuildsContainer;
