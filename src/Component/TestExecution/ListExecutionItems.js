import React from "react";
import TreeLeaf from "../Common/TreeLeaf";
import { selectTestItemAction } from "../../Redux/actions";
import { useDispatch } from "react-redux";
import useTestPlanItemsFetching from "../CustomHooks/useTestPlanItemsFetching";
import { Card } from "react-bootstrap";

const ListExecutionItems = ({ selectedBuild }) => {
  const dispatch = useDispatch();
  const dataItems = useTestPlanItemsFetching(selectedBuild);

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

export default ListExecutionItems;
