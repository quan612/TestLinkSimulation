import React from "react";
import useTestPlanFetching from "../CustomHooks/useTestPlansFetching";

const withTestPlanFetching = BaseComponent => ({ selectedProject }) => {
  const { isTestPlanLoading, testPlans } = useTestPlanFetching(selectedProject);

  return <BaseComponent isTestPlanLoading={isTestPlanLoading} testPlans={testPlans} />;
};

export default withTestPlanFetching;
