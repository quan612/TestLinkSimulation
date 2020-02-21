import React from "react";
import { useSelector, useDispatch } from "react-redux";
import useTestSpecItemsFetching from "../../Component/CustomHooks/useTestSpecItemsFetching";
import { selectTestItemAction } from "../../Redux/testSpec.action";

import LoadingContainer from "../../Component/Containers/LoadingContainer";
import { TreeLeaf } from "../../Component/Common/TreeLeaf";
import { Card } from "../../Component/styles/BodyStyles";

const Navigator = () => {
  const { selectedProject, testSuitesCount, testCasesCount, selectedTestItem } = useSelector(state => ({
    selectedProject: state.selectedProject,
    testSuitesCount: state.testSuitesCount,
    testCasesCount: state.testCasesCount,
    selectedTestItem: state.selectedTestItem
  }));

  const dispatch = useDispatch();
  const { isLoading, testItems } = useTestSpecItemsFetching(
    selectedProject,
    testSuitesCount,
    testCasesCount,
    selectedTestItem
  );

  const handleOnClick = async item => {
    dispatch(selectTestItemAction(item));
  };

  return (
    // <div className="h_100 d-flex flex-column">
    <Card>
      {testItems && (
        <div className="tree">
          <TreeLeaf
            child={testItems}
            key={testItems.data.id}
            node={testItems.data.node}
            onClick={item => handleOnClick(item)}
          />
        </div>
      )}
      {isLoading && <LoadingContainer label="Fetching test specs" />}
    </Card>
  );
};

export default Navigator;
