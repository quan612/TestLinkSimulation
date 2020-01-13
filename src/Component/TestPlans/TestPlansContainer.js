import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTestPlanAction, loadTestPlansAction } from "../../Redux/testPlan.action";
import AddTestPlanContainer from "./AddTestPlanContainer";
import TestPlanManagement from "./TestPlanManagement";
import useTestPlansFetching from "../CustomHooks/useTestPlansFetching";

const TestPlansContainer = () => {
  const { selectedProject } = useSelector(state => ({
    selectedProject: state.selectedProject
  }));

  const dispatch = useDispatch();
  const { isTestPlanLoading, testPlans } = useTestPlansFetching(selectedProject);
  const [isCreateTestPlan, setCreateTestPlan] = useState(false);

  const handleDeleteSubmit = async testPlan => {
    await dispatch(deleteTestPlanAction(testPlan, selectedProject));
    await dispatch(loadTestPlansAction(selectedProject));
  };

  return isCreateTestPlan ? (
    <AddTestPlanContainer onCancel={() => setCreateTestPlan(false)} />
  ) : (
    <TestPlanManagement
      selectedProject={selectedProject}
      isTestPlanLoading={isTestPlanLoading}
      listOfItems={testPlans}
      handleOnAdd={() => setCreateTestPlan(true)}
      handleOnDelete={testPlan => handleDeleteSubmit(testPlan)}
    />
  );
};

export default TestPlansContainer;
