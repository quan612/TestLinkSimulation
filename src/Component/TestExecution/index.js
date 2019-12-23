import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ExecutionContainer from "./ExecutionContainer";
import ListExecutionItems from "./ListExecutionItems";
import ListFilterSetting from "./ListFilterSetting";
import useBuildsFetching from "../CustomHooks/useBuildsFetching";
import { selectBuildAction, clearCurrentBuildsAction } from "../../Redux/build.action";
import { selectTestItemAction } from "../../Redux/actions";
import CreateNewBuildContainer from "../Containers/CreateNewBuildLinkPage";
import LoadingContainer from "../Containers/LoadingContainer";

const TestExecution = () => {
  const { selectedProject, selectTestPlan, selectedBuild, selectTestItem } = useSelector(state => ({
    selectedProject: state.selectedProject,
    selectTestPlan: state.selectTestPlan,
    selectedBuild: state.selectedBuild,
    selectTestItem: state.selectTestItem
  }));

  const dispatch = useDispatch();

  const { isLoading, buildsOfCurrentTestPlan } = useBuildsFetching(selectTestPlan);

  useEffect(() => {
    if (buildsOfCurrentTestPlan && Object.keys(buildsOfCurrentTestPlan).length > 0) {
      dispatch(selectBuildAction(buildsOfCurrentTestPlan[0]));
    }

    //In clean up execution, should clear selected build and builds of current test plans
    return () => {
      dispatch(selectTestItemAction({}));
      dispatch(selectBuildAction({}));
      if (buildsOfCurrentTestPlan && Object.keys(buildsOfCurrentTestPlan).length > 1)
        dispatch(clearCurrentBuildsAction());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProject, selectTestPlan, buildsOfCurrentTestPlan]);

  if (isLoading) {
    return <LoadingContainer label={"Fetching Builds"} />;
  }
  if (
    (!isLoading && buildsOfCurrentTestPlan && Object.keys(buildsOfCurrentTestPlan).length < 1) ||
    buildsOfCurrentTestPlan === ""
  ) {
    return <CreateNewBuildContainer selectTestPlan={selectTestPlan} />;
  }

  if (!isLoading && selectedBuild && Object.keys(selectedBuild).length > 0) {
    return (
      <div className="TestSpecsContainer">
        {/* 30% */}
        <div className="ListContainer h_100 d-flex flex-column">
          <h1>{"Test cases"}</h1>
          <ListFilterSetting selectedBuild={selectedBuild} builds={buildsOfCurrentTestPlan} />
          <ListExecutionItems selectedBuild={selectedBuild} />
        </div>
        {/* 70% */}
        <div className="testItemWrapper">
          <ExecutionContainer
            selectedBuild={selectedBuild}
            selectTestPlan={selectTestPlan}
            selectTestItem={selectTestItem}
          />
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default TestExecution;
