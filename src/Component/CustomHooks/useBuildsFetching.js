import { useEffect } from "react";
import { loadBuildsAsyncAction } from "../../Redux/build.action";
import { useSelector, useDispatch } from "react-redux";

const useBuildsFetching = selectedTestPlan => {
  const { isLoading, buildsOfCurrentTestPlan } = useSelector(state => ({
    buildsOfCurrentTestPlan: state.buildsOfCurrentTestPlan,
    isLoading: state.isLoading
  }));

  const dispatch = useDispatch();

  const fetchBuilds = async testPlanId => {
    await dispatch(loadBuildsAsyncAction(testPlanId));
  };

  useEffect(() => {
    if (selectedTestPlan && Object.values(selectedTestPlan).length > 0) {
      const testPlanId = selectedTestPlan.testplan_id ? selectedTestPlan.testplan_id : selectedTestPlan.id;
      fetchBuilds(testPlanId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTestPlan]);

  return { isLoading, buildsOfCurrentTestPlan };
};

export default useBuildsFetching;
