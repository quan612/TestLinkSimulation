import { useEffect } from "react";
import { loadBuildsAsyncAction } from "../../Redux/build.action";
import { useSelector, useDispatch } from "react-redux";

const useBuildsFetching = selectedTestPlan => {
  const { isLoading, buildsOfCurrentTestPlan } = useSelector(state => ({
    buildsOfCurrentTestPlan: state.buildsOfCurrentTestPlan,
    isLoading: state.isLoading
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedTestPlan) {
      const fetchBuilds = async () => {
        await dispatch(loadBuildsAsyncAction(selectedTestPlan));
      };
      fetchBuilds();
    }
  }, [selectedTestPlan]);

  return { isLoading, buildsOfCurrentTestPlan };
};

export default useBuildsFetching;
