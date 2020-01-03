import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Label, Input } from "reactstrap";
import { TreeLeaf } from "../Common/TreeLeaf";
import { selectTestItemAction } from "../../Redux/actions";
import { useSelector, useDispatch } from "react-redux";
import useTestSpecItemsFetching from "../CustomHooks/useTestSpecItemsFetching";
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
