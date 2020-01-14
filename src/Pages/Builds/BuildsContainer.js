import React, { useState } from "react";
import { useSelector } from "react-redux";
import useBuildsFetching from "../../Component/CustomHooks/useBuildsFetching";
import BuildsManagement from "./BuildsManagement";
import AddBuildContainer from "./AddBuildContainer";
import CreateNewTestPlanLinkPage from "../../Component/Containers/CreateNewTestPlanLinkPage";

const BuildsContainer = () => {
  const { selectedProject, testPlans, selectedTestPlan } = useSelector(state => ({
    selectedProject: state.selectedProject,
    testPlans: state.testPlans,
    selectedTestPlan: state.selectedTestPlan
  }));

  const { isLoading, buildsOfCurrentTestPlan } = useBuildsFetching(selectedTestPlan);
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
      selectedTestPlan={selectedTestPlan}
      listOfItems={buildsOfCurrentTestPlan}
      handleOnAdd={() => setAddBuild(true)}
      handleOnDelete={build => handleDeleteSubmit(build)}
    />
  );
};

export default BuildsContainer;
