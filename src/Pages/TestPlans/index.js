import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTestPlanAction, loadTestPlansAction } from "../../Redux/testPlan.action";
import PlansManagement from "./PlansManagement";
import useTestPlansFetching from "../../Component/CustomHooks/useTestPlansFetching";

const TestPlans = () => {
  const { selectedProject } = useSelector(state => ({
    selectedProject: state.selectedProject
  }));

  const dispatch = useDispatch();
  const { isTestPlanLoading, testPlans } = useTestPlansFetching(selectedProject);

  const handleDeleteSubmit = async testPlan => {
    await dispatch(deleteTestPlanAction(testPlan, selectedProject));
    await dispatch(loadTestPlansAction(selectedProject));
  };

  return (
    <PlansManagement
      selectedProject={selectedProject}
      isTestPlanLoading={isTestPlanLoading}
      listOfItems={testPlans}
      handleOnDelete={testPlan => handleDeleteSubmit(testPlan)}
    />
  );
};

export default TestPlans;
