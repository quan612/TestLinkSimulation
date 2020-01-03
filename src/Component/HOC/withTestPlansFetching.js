import React from "react";
import useTestPlansFetching from "../CustomHooks/useTestPlansFetching";

const withTestPlanFetching = BaseComponent => ({ selectedProject }) => {
  const { isTestPlanLoading, testPlans } = useTestPlansFetching(selectedProject);

  return <BaseComponent isTestPlanLoading={isTestPlanLoading} testPlans={testPlans} />;
};

export default withTestPlanFetching;
