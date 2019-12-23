import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectTestItemAction } from "../../Redux/actions";
import AddRemoveContainer from "./AddRemoveContainer";
import TestSuiteList from "./TestSuiteList";
import ListFilterSetting from "./ListFilter";

const AddTestCaseToTestPlanContainer = () => {
  const { selectedProject, selectTestPlan, selectedTestItem } = useSelector(state => ({
    selectedProject: state.selectedProject,
    selectTestPlan: state.selectTestPlan,
    selectedTestItem: state.selectedTestItem
  }));

  const dispatch = useDispatch();
  useEffect(() => {
    //on clean up, clear selected item
    return () => {
      dispatch(selectTestItemAction({}));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectTestPlan]);

  return (
    <div className="d-flex h-100">
      <div className="h-100 w-30 d-flex flex-column">
        <h1>{"Add/Remove Test Cases From Test Plan"}</h1>
        <ListFilterSetting />
        <TestSuiteList />
      </div>

      <div className="h-100 w-70 ml-auto d-flex flex-column">
        <AddRemoveContainer
          selectedProject={selectedProject}
          selectedTestSuite={selectedTestItem}
          selectTestPlan={selectTestPlan}
        />
      </div>
    </div>
  );
};

export default AddTestCaseToTestPlanContainer;
