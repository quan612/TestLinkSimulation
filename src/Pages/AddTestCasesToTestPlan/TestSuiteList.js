import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import useTestSuitesFetching from "../../Component/CustomHooks/useTestSuitesFetching";
import { selectTestItemAction } from "../../Redux/actions";
import { TreeLeaf } from "../../Component/Common/TreeLeaf";
import { Card, Header } from "../../Component/styles/BodyStyles";
import TestPlanDropDownWithFetching, { TestPlanDropDown } from "../../Component/Common/TestPlanDropDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TestSuiteList = ({ testPlans }) => {
  const { selectedProject, isLoading, isProjectLoading, isTestPlanLoading } = useSelector(state => ({
    selectedProject: state.selectedProject,
    isLoading: state.isLoading,
    isProjectLoading: state.isProjectLoading,
    isTestPlanLoading: state.isTestPlanLoading
  }));

  let history = useHistory();
  let dispatch = useDispatch();
  const dataItems = useTestSuitesFetching(selectedProject);

  useEffect(() => {
    return function cleanup() {};
  }, [testPlans]);

  const handleOnClick = async item => {
    dispatch(selectTestItemAction(item));
  };

  const loading = [isLoading, isProjectLoading, isTestPlanLoading].some(x => x === true); // return true if either one of element is true

  const renderTreeItems = (loading, testPlans, dataItems) => {
    if (loading) return null;
    if (!loading && testPlans.length !== 0 && dataItems)
      return (
        <TreeLeaf
          child={dataItems}
          key={dataItems.data.id}
          node={dataItems.data.node}
          onClick={item => handleOnClick(item)}
        />
      );

    if (!loading && testPlans.length === 0)
      return (
        <a
          href="testplan"
          onClick={e => {
            e.preventDefault();
            history.push("/addPlan");
          }}
        >
          Create a test plan
        </a>
      );
  };
  return (
    <div className="h_100 d-flex flex-column">
      <Card className="tree">
        <Header className="d-flex justify-content-between">
          <span>Setting</span>
          <FontAwesomeIcon
            icon="info-circle"
            color={"white"}
            title={'Test case can be added in "Create Test Case" '}
          ></FontAwesomeIcon>
        </Header>
        <TestPlanDropDownWithFetching selectedProject={selectedProject} />
        <hr />
        {renderTreeItems(loading, testPlans, dataItems)}
      </Card>
    </div>
  );
};

export default TestSuiteList;
