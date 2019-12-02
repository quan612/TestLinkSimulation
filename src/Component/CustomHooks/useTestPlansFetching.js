import { useEffect } from "react";
import { loadTestPlansAction } from "../../Redux/testPlan.action";
import { useSelector, useDispatch } from "react-redux";

const useTestPlanFetching = selectedProject => {
  const { isLoading, testPlans } = useSelector(state => ({
    testPlans: state.testPlans,
    isLoading: state.isLoading
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedProject) {
      const fetchTestPlans = async () => {
        await dispatch(loadTestPlansAction(selectedProject));
      };
      fetchTestPlans();
    }
  }, [selectedProject]);

  return { isLoading, testPlans };
};

export default useTestPlanFetching;
