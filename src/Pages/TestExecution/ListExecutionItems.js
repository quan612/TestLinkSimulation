import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useTestPlanItemsFetching from "../../Component/CustomHooks/useTestPlanItemsFetching";
import { selectTestItemAction } from "../../Redux/testSpec.action";
import { TreeLeaf } from "../../Component/Common/TreeLeaf";
import { Card } from "../../Component/styles/BodyStyles";
import LoadingContainer from "../../Component/Containers/LoadingContainer";

const ListExecutionItems = () => {
  const dispatch = useDispatch();

  const { selectedProject, selectedTestPlan, selectedTestItem, selectedBuild, buildsOfCurrentTestPlan } = useSelector(
    state => ({
      selectedProject: state.selectedProject,
      selectedTestItem: state.selectedTestItem,
      selectedTestPlan: state.selectedTestPlan,
      selectedBuild: state.selectedBuild,
      buildsOfCurrentTestPlan: state.buildsOfCurrentTestPlan
    })
  );

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
    <Card>
      {buildsOfCurrentTestPlan && Object.values(buildsOfCurrentTestPlan).length > 0 && dataItems && (
        <div className="tree">
          <TreeLeaf
            child={dataItems}
            key={dataItems.data.id}
            node={dataItems.data.node}
            onClick={item => handleOnClick(item)}
          />
        </div>
      )}
      {isLoading && <LoadingContainer />}
    </Card>
  );
};

export default ListExecutionItems;
