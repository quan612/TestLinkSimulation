import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ExecutionContainer from "./ExecutionContainer";
import ListExecutionItems from "./ListExecutionItems";
import ListFilterSetting from "./ListFilterSetting";
import { NavLink } from "react-router-dom";
import useBuildsFetching from "../CustomHooks/useBuildsFetching";
import { selectBuildAction, clearCurrentBuildsAction } from "../../Redux/build.action";
import { selectTestItemAction } from "../../Redux/actions";

const TestExecution = () => {
  let styles = {
    maincontent: {
      textalign: "left",
      margin: "3px",
      background: "#CDE",
      padding: "3px 3px 50px 3px",
      borderstyle: "groove",
      borderwidth: "thin"
    }
  };

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
      console.log("Build of test plan found here");
      dispatch(selectBuildAction(buildsOfCurrentTestPlan[0]));
    }

    //In clean up execution, should clear selected build and builds of current test plans
    return () => {
      dispatch(selectTestItemAction({}));
      dispatch(selectBuildAction({}));

      if (buildsOfCurrentTestPlan && Object.keys(buildsOfCurrentTestPlan).length > 0) {
        dispatch(clearCurrentBuildsAction());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProject, selectTestPlan, buildsOfCurrentTestPlan]);

  if (isLoading) {
    return <div>isLoading........</div>;
  }

  // if (buildsOfCurrentTestPlan && (Object.keys(buildsOfCurrentTestPlan).length < 1 || buildsOfCurrentTestPlan == "")) {
  if ((buildsOfCurrentTestPlan && Object.keys(buildsOfCurrentTestPlan).length < 1) || buildsOfCurrentTestPlan === "") {
    return (
      <div style={{ ...styles.maincontent }}>
        <p>Execute Tests</p>
        <p>
          {selectTestPlan && (
            <b> {`At least one Build (Active &amp; Open) is needed for this Test Plan<b> ${selectTestPlan.name}`}</b>
          )}
        </p>
        <p>
          <NavLink className="nav-inine-text px-1" to="/Builds">
            Create A New Build
          </NavLink>
        </p>
      </div>
    );
  }

  if (selectedBuild && Object.keys(selectedBuild).length > 0) {
    console.log(" there is a build");
    return (
      <div className="TestSpecsContainer workBody">
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
    console.log("should not go here");
    return null;
  }
};

export default TestExecution;
