import React from "react";
import { useSelector, useDispatch } from "react-redux";
import useTestSuitesFetching from "../../Component/CustomHooks/useTestSuitesFetching";

import { selectTestItemAction } from "../../Redux/testSpec.action";
import { TreeLeaf } from "../../Component/Common/TreeLeaf";
import { Card, SectionHeader } from "../../Component/styles/BodyStyles";
import TestPlanDropDownWithFetching from "../../Component/Common/TestPlanDropDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TestSuiteList = () => {
  const { selectedProject, isLoading, isProjectLoading, isTestPlanLoading, testPlans } = useSelector(state => ({
    selectedProject: state.selectedProject,
    isLoading: state.isLoading,
    isProjectLoading: state.isProjectLoading,
    isTestPlanLoading: state.isTestPlanLoading,
    testPlans: state.testPlans
  }));

  let dispatch = useDispatch();
  const dataItems = useTestSuitesFetching(selectedProject);

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
  };

  return (
    <Card className="tree">
      <SectionHeader className="d-flex justify-content-between">
        <span>Setting</span>
        <FontAwesomeIcon
          icon="info-circle"
          color={"white"}
          title={'Test case can be added in "Create Test Case" '}
        ></FontAwesomeIcon>
      </SectionHeader>
      <TestPlanDropDownWithFetching selectedProject={selectedProject} />
      <hr />
      {renderTreeItems(loading, testPlans, dataItems)}
    </Card>
  );
};

export default TestSuiteList;
