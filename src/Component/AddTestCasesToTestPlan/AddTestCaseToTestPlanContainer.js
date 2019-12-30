import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectTestItemAction } from "../../Redux/actions";
import AddRemoveContainer from "./AddRemoveContainer";
import TestSuiteList from "./TestSuiteList";
import ListFilterSetting from "./ListFilter";
import { SplitPane } from "../Containers/SplitPane";
import { Container, Row, Col } from "reactstrap";

const AddTestCaseToTestPlanContainer = () => {
  const { selectedProject, selectTestPlan, selectedTestItem } = useSelector(state => ({
    selectedProject: state.selectedProject,
    selectTestPlan: state.selectTestPlan,
    selectedTestItem: state.selectedTestItem
  }));

  const dispatch = useDispatch();
  useEffect(() => {
    return function cleanup() {
      dispatch(selectTestItemAction({}));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectTestPlan]);

  return (
    <SplitPane
      left={
        <>
          <h1>{"Add/Remove Test Cases From Test Plan"}</h1>
          <ListFilterSetting />
          <TestSuiteList />
        </>
      }
      right={
        <Container className="h_100 mw-99">
          <Row className="h-100">
            <Col className="offset-lg-0 offset-md-3">
              <AddRemoveContainer
                selectedProject={selectedProject}
                selectedTestSuite={selectedTestItem}
                selectTestPlan={selectTestPlan}
              />
            </Col>
          </Row>
        </Container>
      }
    />
  );
};

export default AddTestCaseToTestPlanContainer;
