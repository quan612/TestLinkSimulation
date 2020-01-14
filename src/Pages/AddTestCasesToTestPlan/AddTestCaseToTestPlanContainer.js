import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectTestItemAction } from "../../Redux/actions";
import AddRemoveContainer from "./AddRemoveContainer";
import TestSuiteList from "./TestSuiteList";
import ListFilterSetting from "./ListFilter";
import { SplitPane } from "../../Component/Containers/SplitPane";
import { StyledTestDetailContainer } from "../../Component/styles/StyledTestDetails";

const AddTestCaseToTestPlanContainer = () => {
  const { selectedProject, selectedTestPlan, selectedTestItem } = useSelector(state => ({
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
  }, [selectedTestPlan]);

  return (
    <SplitPane
      left={
        <>
          <h1>{"Add / Remove Test Cases From Test Plan"}</h1>
          <ListFilterSetting />
          <TestSuiteList />
        </>
      }
      right={
        <StyledTestDetailContainer>
          <AddRemoveContainer
            selectedProject={selectedProject}
            selectedTestSuite={selectedTestItem}
            selectedTestPlan={selectedTestPlan}
          />
        </StyledTestDetailContainer>
      }
    />
  );
};

export default AddTestCaseToTestPlanContainer;
