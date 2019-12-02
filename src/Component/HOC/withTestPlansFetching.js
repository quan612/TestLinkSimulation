import React from "react";
import useTestPlanFetching from "../CustomHooks/useTestPlansFetching";

const withTestPlanFetching = BaseComponent => ({ selectedProject }) => {
  const { isLoading, testPlans } = useTestPlanFetching(selectedProject);

  return <BaseComponent isLoading={isLoading} testPlans={testPlans} />;
};

export default withTestPlanFetching;
