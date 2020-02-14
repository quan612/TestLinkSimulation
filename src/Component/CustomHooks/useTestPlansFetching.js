import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadTestPlansAction } from "../../Redux/testPlan.action";
import { selectTestPlanAction } from "../../Redux/testPlan.action";

const useTestPlansFetching = selectedProject => {
  const { isTestPlanLoading, testPlans, selectedTestPlan } = useSelector(state => ({
    testPlans: state.testPlans,
    isTestPlanLoading: state.isTestPlanLoading,
    selectedTestPlan: state.selectedTestPlan
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedProject) {
      const fetchTestPlans = async () => {
        await dispatch(loadTestPlansAction(selectedProject));
        await dispatch(selectTestPlanAction(testPlans[0]));
      };
      fetchTestPlans();
    }
  }, [selectedProject]);

  return { isTestPlanLoading, testPlans, selectedTestPlan };
};

export default useTestPlansFetching;
