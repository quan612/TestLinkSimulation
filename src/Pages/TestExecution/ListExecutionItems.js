import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useTestPlanItemsFetching from "../../Component/CustomHooks/useTestPlanItemsFetching";
import { selectTestItemAction } from "../../Redux/testSpec.action";
import { TreeLeaf } from "../../Component/Common/TreeLeaf";
import { Card } from "../../Component/styles/BodyStyles";
import LoadingContainer from "../../Component/Containers/LoadingContainer";

const ListExecutionItems = ({ selectedBuild }) => {
  const dispatch = useDispatch();

  const { selectedProject, selectedTestPlan, selectedTestItem } = useSelector(state => ({
    selectedProject: state.selectedProject,
    selectedTestItem: state.selectedTestItem,
    selectedTestPlan: state.selectedTestPlan
  }));

  const { isLoading, dataItems } = useTestPlanItemsFetching(
    selectedProject,
    selectedTestPlan,
    selectedBuild,
    selectedTestItem
  );

  const handleOnClick = async item => {
    dispatch(selectTestItemAction(item));
  };

  return (
    <div className="h_100 d-flex flex-column mt-3">
      <Card className="tree">
        {dataItems && (
          <TreeLeaf
            child={dataItems}
            key={dataItems.data.id}
            node={dataItems.data.node}
            onClick={item => handleOnClick(item)}
          />
        )}
        {isLoading && <LoadingContainer />}
      </Card>
    </div>
  );
};

export default ListExecutionItems;
