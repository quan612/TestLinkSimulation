import React from "react";
import useBuildsFetching from "../CustomHooks/useBuildsFetching";

const withBuildsFetching = BaseComponent => ({ selectedTestPlan }) => {
  const { isLoading, buildsOfCurrentTestPlan } = useBuildsFetching(selectedTestPlan);

  return <BaseComponent isLoading={isLoading} buildsOfCurrentTestPlan={buildsOfCurrentTestPlan} />;
};

export default withBuildsFetching;
