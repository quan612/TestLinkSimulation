import { useEffect } from "react";
import { loadTestPlansAction } from "../../Redux/testPlan.action";
import { useSelector, useDispatch } from "react-redux";

const useTestPlanFetching = selectedProject => {
  const { isTestPlanLoading, testPlans } = useSelector(state => ({
    testPlans: state.testPlans,
    isTestPlanLoading: state.isTestPlanLoading
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedProject) {
      const fetchTestPlans = async () => {
        // console.log("Loading test plans ");
        await dispatch(loadTestPlansAction(selectedProject));
      };
      fetchTestPlans();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProject]);

  return { isTestPlanLoading, testPlans };
};

export default useTestPlanFetching;
