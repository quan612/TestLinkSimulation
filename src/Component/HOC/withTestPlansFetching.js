import React from "react";
import useTestPlansFetching from "../CustomHooks/useTestPlansFetching";
import { useSelector, useDispatch } from "react-redux";

const withTestPlanFetching = BaseComponent => ({ selectedProject }) => {
  const { isTestPlanLoading, testPlans, selectedTestPlan } = useTestPlansFetching(selectedProject);

  return (
    <BaseComponent isTestPlanLoading={isTestPlanLoading} testPlans={testPlans} selectedTestPlan={selectedTestPlan} />
  );
};

export default withTestPlanFetching;
