import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTestPlanAction, loadTestPlansAction } from "../../Redux/testPlan.action";
import AddTestPlanContainer from "./AddTestPlanContainer";
import TestPlanManagement from "./TestPlanManagement";

const TestPlansContainer = () => {
  const { isTestPlanLoading, selectedProject, testPlans } = useSelector(state => ({
    isTestPlanLoading: state.isTestPlanLoading,
    selectedProject: state.selectedProject,
    testPlans: state.testPlans
  }));

  const dispatch = useDispatch();
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
      testPlans={testPlans}
      handleOnAdd={() => setCreateTestPlan(true)}
      handleOnDelete={testPlan => handleDeleteSubmit(testPlan)}
    />
  );
};

export default TestPlansContainer;
