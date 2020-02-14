import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import withTestPlanFetching from "../../Component/HOC/withTestPlansFetching";
import useBuildsFetching from "../../Component/CustomHooks/useBuildsFetching";
import { selectBuildAction, clearCurrentBuildsAction } from "../../Redux/build.action";
import { selectTestItemAction } from "../../Redux/actions";

import LoadingContainer from "../../Component/Containers/LoadingContainer";
import { SplitPane } from "../../Component/Containers/SplitPane";

import { StyledTestDetail } from "../../Component/styles/StyledTestDetails";
import { Container, Card } from "../../Component/styles/BodyStyles";

import ExecutionContainer from "./ExecutionContainer";
import ListExecutionItems from "./ListExecutionItems";
import Filter from "./Filter";

const TestExecution = () => {
  const {
    selectedProject,
    testPlans,
    selectedTestPlan,
    selectedBuild,
    selectedTestItem,
    buildsOfCurrentTestPlan
  } = useSelector(state => ({
    selectedProject: state.selectedProject,
    testPlans: state.testPlans,
    selectedTestPlan: state.selectedTestPlan,
    selectedBuild: state.selectedBuild,
    selectedTestItem: state.selectedTestItem,
    buildsOfCurrentTestPlan: state.buildsOfCurrentTestPlan
  }));

  const dispatch = useDispatch();

  // const { isLoading, buildsOfCurrentTestPlan } = useBuildsFetching(selectedTestPlan);

  // useEffect(() => {
  //   // if (buildsOfCurrentTestPlan && Object.keys(buildsOfCurrentTestPlan).length > 0) {
  //   //   dispatch(selectBuildAction(buildsOfCurrentTestPlan[0]));
  //   // }

  //   return function cleanup() {
  //     dispatch(selectTestItemAction({}));
  //     dispatch(selectBuildAction({}));
  //     if (buildsOfCurrentTestPlan && Object.keys(buildsOfCurrentTestPlan).length > 1)
  //       dispatch(clearCurrentBuildsAction());
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [selectedProject, selectedTestPlan, buildsOfCurrentTestPlan]);

  // if ((buildsOfCurrentTestPlan && Object.keys(buildsOfCurrentTestPlan).length < 1) || buildsOfCurrentTestPlan === "") {
  //   return <CreateNewBuildContainer selectedTestPlan={selectedTestPlan} />;
  // }

  return (
    <Container className="tree-container">
      <SplitPane
        left={
          <>
            <Filter selectedTestPlan={selectedTestPlan} selectedProject={selectedProject} />
            <ListExecutionItems selectedBuild={selectedBuild} />
          </>
        }
        right={
          <StyledTestDetail>
            <Card>
              <ExecutionContainer
                selectedBuild={selectedBuild}
                selectedTestPlan={selectedTestPlan}
                selectedTestItem={selectedTestItem}
              />
            </Card>
          </StyledTestDetail>
        }
      />
    </Container>
  );
};

export default TestExecution;
