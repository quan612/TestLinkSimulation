import React from "react";
import { useSelector, useDispatch } from "react-redux";
import useTestSuitesFetching from "../../Component/CustomHooks/useTestSuitesFetching";
import { selectTestItemAction } from "../../Redux/actions";
import { TreeLeaf } from "../../Component/Common/TreeLeaf";
import { Card } from "react-bootstrap";

const TestSuiteList = () => {
  const { selectedProject } = useSelector(state => ({
    selectedProject: state.selectedProject
  }));

  const dispatch = useDispatch();
  const dataItems = useTestSuitesFetching(selectedProject);

  const handleOnClick = async item => {
    dispatch(selectTestItemAction(item));
  };

  return (
    <div className="h_100 d-flex flex-column">
      <div className="panel-header">
        <span>Navigation</span>
      </div>
      {dataItems && (
        <Card className="list-tree-items">
          <TreeLeaf
            child={dataItems}
            key={dataItems.data.id}
            node={dataItems.data.node}
            onClick={item => handleOnClick(item)}
          />
        </Card>
      )}
    </div>
  );
};

export default TestSuiteList;
