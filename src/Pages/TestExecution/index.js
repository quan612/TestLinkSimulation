import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ExecutionContainer from "./ExecutionContainer";
import ListExecutionItems from "./ListExecutionItems";
import ListFilterSetting from "./ListFilterSetting";
import useBuildsFetching from "../../Component/CustomHooks/useBuildsFetching";
import { selectBuildAction, clearCurrentBuildsAction } from "../../Redux/build.action";
import { selectTestItemAction } from "../../Redux/actions";
import CreateNewBuildContainer from "../../Component/Containers/CreateNewBuildLinkPage";
import LoadingContainer from "../../Component/Containers/LoadingContainer";
import { SplitPane } from "../../Component/Containers/SplitPane";
import { Container, Row, Col } from "reactstrap";

const TestExecution = () => {
  const { selectedProject, selectedTestPlan, selectedBuild, selectedTestItem } = useSelector(state => ({
    selectedProject: state.selectedProject,
    selectedTestPlan: state.selectedTestPlan,
    selectedBuild: state.selectedBuild,
    selectedTestItem: state.selectedTestItem
  }));

  const dispatch = useDispatch();

  const { isLoading, buildsOfCurrentTestPlan } = useBuildsFetching(selectedTestPlan);

  useEffect(() => {
    if (buildsOfCurrentTestPlan && Object.keys(buildsOfCurrentTestPlan).length > 0) {
      dispatch(selectBuildAction(buildsOfCurrentTestPlan[0]));
    }

    return function cleanup() {
      dispatch(selectTestItemAction({}));
      dispatch(selectBuildAction({}));
      if (buildsOfCurrentTestPlan && Object.keys(buildsOfCurrentTestPlan).length > 1)
        dispatch(clearCurrentBuildsAction());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProject, selectedTestPlan, buildsOfCurrentTestPlan]);

  if (isLoading) {
    return <LoadingContainer label={"Fetching Builds"} />;
  }
  if (
    (!isLoading && buildsOfCurrentTestPlan && Object.keys(buildsOfCurrentTestPlan).length < 1) ||
    buildsOfCurrentTestPlan === ""
  ) {
    return <CreateNewBuildContainer selectedTestPlan={selectedTestPlan} />;
  }

  if (!isLoading && selectedBuild && Object.keys(selectedBuild).length > 0) {
    return (
      <SplitPane
        left={
          <>
            <h1>{"Test cases list"}</h1>
            <ListFilterSetting selectedBuild={selectedBuild} builds={buildsOfCurrentTestPlan} />
            <ListExecutionItems selectedBuild={selectedBuild} />
          </>
        }
        right={
          <Container className="h_100 mw-99">
            <Row className="h-100">
              <Col className="offset-lg-0 offset-md-3">
                <ExecutionContainer
                  selectedBuild={selectedBuild}
                  selectedTestPlan={selectedTestPlan}
                  selectedTestItem={selectedTestItem}
                />
              </Col>
            </Row>
          </Container>
        }
      />
    );
  } else {
    return <h1>TEST</h1>;
  }
};

export default TestExecution;
