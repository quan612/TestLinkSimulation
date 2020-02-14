import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useTestPlansFetching from "../../Component/CustomHooks/useTestPlansFetching";
import { selectTestItemAction } from "../../Redux/actions";
import AddRemoveContainer from "./AddRemoveContainer";
import TestSuiteList from "./TestSuiteList";
import { SplitPane } from "../../Component/Containers/SplitPane";
import { StyledTestDetail } from "../../Component/styles/StyledTestDetails";
import { Container, Card } from "../../Component/styles/BodyStyles";
import CreateNewTestPlanLinkPage from "../../Component/Containers/CreateNewTestPlanLinkPage";
import LoadingContainer from "../../Component/Containers/LoadingContainer";

const AddTestCaseToTestPlanContainer = () => {
  const { selectedProject, selectedTestPlan, selectedTestItem } = useSelector(state => ({
    selectedProject: state.selectedProject,
    selectedTestPlan: state.selectedTestPlan,
    selectedTestItem: state.selectedTestItem
  }));

  const dispatch = useDispatch();
  const { isTestPlanLoading, testPlans } = useTestPlansFetching(selectedProject);

  useEffect(() => {
    return function cleanup() {
      dispatch(selectTestItemAction({}));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTestPlan, selectedProject]);

  // if (isTestPlanLoading) return <LoadingContainer color="white" label={"Fetching test plans"} />;

  if (testPlans)
    return (
      <Container className="body-container">
        <SplitPane
          left={
            <>
              <TestSuiteList testPlans={testPlans} />
            </>
          }
          right={
            <StyledTestDetail>
              <Card>
                <AddRemoveContainer
                  selectedProject={selectedProject}
                  selectedTestSuite={selectedTestItem}
                  selectedTestPlan={selectedTestPlan}
                />
              </Card>
            </StyledTestDetail>
          }
        />
      </Container>
    );
  else return null;
};

export default AddTestCaseToTestPlanContainer;
