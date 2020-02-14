import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useTestSpecItemsFetching from "../../Component/CustomHooks/useTestSpecItemsFetching";
import { selectTestItemAction } from "../../Redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Label, Input } from "reactstrap";
import { TreeLeaf } from "../../Component/Common/TreeLeaf";
import LoadingContainer from "../../Component/Containers/LoadingContainer";
import { Card, Header, HeaderIcon } from "../../Component/styles/BodyStyles";

const TestSpecsNavigator = () => {
  return (
    <>
      {/* <ListItemsFilter /> */}
      <ListItems />
    </>
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
        {isLoading && <LoadingContainer label={"Fetching test specs"} />}
      </Card>
    </div>
  );
};

export default TestSpecsNavigator;

const ListItemsFilter = () => {
  const [toggle, setToggle] = useState(false);

  const handleSettingCollapse = () => {
    setToggle(!toggle);
  };

  return (
    <div>
      <Header>
        <span>Filter</span>
        <HeaderIcon>
          <FontAwesomeIcon
            icon={toggle === true ? "caret-square-up" : "caret-square-down"}
            onClick={() => handleSettingCollapse()}
          />
        </HeaderIcon>
      </Header>
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
