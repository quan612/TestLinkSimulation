import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectTestItemAction } from "../../Redux/testSpec.action";
import AddRemoveContainer from "./AddRemoveContainer";
import TestSuiteList from "./TestSuiteList";
import { SplitPane } from "../../Component/Containers/SplitPane";
import LoadingContainer from "../../Component/Containers/LoadingContainer";

const AddTestCaseToTestPlanContainer = () => {
  const { isProjectLoading, selectedProject, selectedTestPlan, selectedTestItem } = useSelector(state => ({
    isProjectLoading: state.isProjectLoading,
    selectedProject: state.selectedProject,
    selectedTestPlan: state.selectedTestPlan,
    selectedTestItem: state.selectedTestItem
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    return function cleanup() {
      dispatch(selectTestItemAction({}));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProject]);

  if (isProjectLoading) {
    return <LoadingContainer color="white" label="Fetching Projects" />;
  }

  return (
    <SplitPane
      left={<TestSuiteList />}
      right={
        <AddRemoveContainer
          selectedProject={selectedProject}
          selectedTestSuite={selectedTestItem}
          selectedTestPlan={selectedTestPlan}
        />
      }
    />
  );
};

export default AddTestCaseToTestPlanContainer;
