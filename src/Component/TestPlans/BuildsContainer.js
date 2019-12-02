import React, { useState } from "react";
import { useSelector } from "react-redux";
import useBuildsFetching from "../CustomHooks/useBuildsFetching";
import BuildsManagementWithLoading from "./BuildsManagement";
import AddBuildContainer from "./AddBuildContainer";

const BuildsContainer = () => {
  const { selectTestPlan } = useSelector(state => ({
    selectTestPlan: state.selectTestPlan
  }));

  const { isLoading, buildsOfCurrentTestPlan } = useBuildsFetching(selectTestPlan);
  const [isAddBuild, setAddBuild] = useState(false);

  const handleDeleteSubmit = async itemToDelete => {};

  return isAddBuild ? (
    <div className="workBody">
      <AddBuildContainer onCancel={() => setAddBuild(false)} />
    </div>
  ) : (
    <div className="workBody">
      {selectTestPlan && <h1 className="mt-10 title">{`Build Management - Test Plan ${selectTestPlan.name}`}</h1>}
      <BuildsManagementWithLoading
        isLoading={isLoading}
        builds={buildsOfCurrentTestPlan}
        handleOnAdd={() => setAddBuild(true)}
        handleOnDelete={build => handleDeleteSubmit(build)}
      />
    </div>
  );
};

export default BuildsContainer;
