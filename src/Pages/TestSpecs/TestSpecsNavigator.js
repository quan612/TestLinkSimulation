import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useTestSpecItemsFetching from "../../Component/CustomHooks/useTestSpecItemsFetching";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Label, Input } from "reactstrap";
import { TreeLeaf } from "../../Component/Common/TreeLeaf";
import { selectTestItemAction } from "../../Redux/actions";
import LoadingContainer from "../../Component/Containers/LoadingContainer";
import { Card } from "react-bootstrap";

const ListItemsFilter = () => {
  const [toggle, setToggle] = useState(false);

  const handleSettingCollapse = () => {
    setToggle(!toggle);
  };

  return (
    <div>
      <div className="panel-header">
        <span>Filter</span>
        <FontAwesomeIcon className="panel-header-icon" icon={"question-circle"} />
        <FontAwesomeIcon
          className="panel-header-icon"
          icon={toggle === true ? "caret-square-up" : "caret-square-down"}
          onClick={() => handleSettingCollapse()}
        />
      </div>
      {toggle && (
        <div className="filter-testcase">
          <div className="d-flex justify-content-between">
            <Label style={{ color: "white" }}>Test case</Label>
            <Input
              className="w-75"
              placeholder="Search"
              type="text"
              name="name"
              //  onChange={handleChange}
            ></Input>
          </div>
        </div>
      )}
    </div>
  );
};

const ListItems = () => {
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
    <div className="h_100 d-flex flex-column">
      <Card className="list-tree-items">
        {testItems && (
          <TreeLeaf
            child={testItems}
            key={testItems.data.id}
            node={testItems.data.node}
            onClick={item => handleOnClick(item)}
          />
        )}
        {isLoading === true ? <LoadingContainer label={"Fetching test specs"} /> : null}
      </Card>
    </div>
  );
};

const TestSpecsNavigator = () => {
  return (
    <>
      <h1>Test Specifications</h1>
      <ListItemsFilter />
      <ListItems />
    </>
  );
};

export default TestSpecsNavigator;
