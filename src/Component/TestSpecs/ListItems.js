import React from "react";
import { TreeLeaf } from "../Common/TreeLeaf";
import { selectTestItemAction } from "../../Redux/actions";
import { useSelector, useDispatch } from "react-redux";
import useTestSpecItemsFetching from "../CustomHooks/useTestSpecItemsFetching";
import { Card } from "react-bootstrap";

const ListItems = () => {
  const { selectedProject, testSuitesCount, testCasesCount } = useSelector(state => ({
    selectedProject: state.selectedProject,
    testSuitesCount: state.testSuitesCount,
    testCasesCount: state.testCasesCount
  }));

  const dispatch = useDispatch();
  const dataItems = useTestSpecItemsFetching(selectedProject, testSuitesCount, testCasesCount);

  const handleOnClick = async item => {
    dispatch(selectTestItemAction(item));
  };

  return (
    <div className="h_100 d-flex flex-column">
      {/* <div className="panel-header">
        <span>Navigation</span>
      </div> */}
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

export default ListItems;
