import { useEffect } from "react";
import { loadTestProjectsAction } from "../../Redux/testProject.action";
import { useSelector, useDispatch } from "react-redux";

const useTestProjectsFetching = () => {
  const { isLoading, testProjects } = useSelector(state => ({
    isLoading: state.isProjectLoading,
    testProjects: state.testProjects
  }));

  let dispatch = useDispatch();

  useEffect(() => {
    const fetchProjects = async () => {
      dispatch(loadTestProjectsAction());
    };
    fetchProjects();
  }, []);

  return { isLoading, testProjects };
};

export default useTestProjectsFetching;
