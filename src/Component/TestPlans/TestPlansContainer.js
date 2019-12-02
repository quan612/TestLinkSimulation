import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTestPlanAction, loadTestPlansAction } from "../../Redux/testPlan.action";
import AddTestPlanContainer from "./AddTestPlanContainer";
import TestPlanManagement from "./TestPlanManagement";

const TestPlansContainer = () => {
  const { isLoading, selectedProject, testPlans } = useSelector(state => ({
    isLoading: state.isLoading,
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
    <div className="workBody">
      <AddTestPlanContainer onCancel={() => setCreateTestPlan(false)} />
    </div>
  ) : (
    <div className="workBody">
      <h1 className="mt-10 title">
        Test Plan Management - Test Project: {selectedProject ? selectedProject.name : null}
      </h1>
      <TestPlanManagement
        isLoading={isLoading}
        testPlans={testPlans}
        handleOnAdd={() => setCreateTestPlan(true)}
        handleOnDelete={testPlan => handleDeleteSubmit(testPlan)}
      />
    </div>
  );
};

export default TestPlansContainer;
