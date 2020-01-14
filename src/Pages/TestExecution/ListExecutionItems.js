import React from "react";
import { useDispatch } from "react-redux";
import useTestPlanItemsFetching from "../../Component/CustomHooks/useTestPlanItemsFetching";
import { selectTestItemAction } from "../../Redux/actions";
import { TreeLeaf } from "../../Component/Common/TreeLeaf";
import { Card } from "react-bootstrap";
import LoadingContainer from "../../Component/Containers/LoadingContainer";

const ListExecutionItems = ({ selectedBuild }) => {
  const dispatch = useDispatch();
  const { isLoading, dataItems } = useTestPlanItemsFetching(selectedBuild);

  const handleOnClick = async item => {
    dispatch(selectTestItemAction(item));
  };

  return (
    <div className="h_100 d-flex flex-column">
      <div className="panel-header">
        <span>Navigation</span>
      </div>
      <Card className="list-tree-items">
        {dataItems && (
          <TreeLeaf
            child={dataItems}
            key={dataItems.data.id}
            node={dataItems.data.node}
            onClick={item => handleOnClick(item)}
          />
        )}
        {isLoading === true ? <LoadingContainer /> : null}
      </Card>
      }
    </div>
  );
};

export default ListExecutionItems;