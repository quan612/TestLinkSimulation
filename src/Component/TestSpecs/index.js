import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { selectTestItemAction } from "../../Redux/actions";
import ListSpecItems from "./ListItems";
import TestDetailsContainer from "./TestDetailsContainer";
import ListItemsFilter from "./ListItemsFilter";

const TestSpecsContainer = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    //on clean up, clear selected item
    return () => {
      dispatch(selectTestItemAction({}));
    };
  });
  return (
    <div className="TestSpecsContainer workBody">
      {/* 30% */}
      <div className="ListContainer h_100 d-flex flex-column">
        <h1>{"Test Specifications"}</h1>
        <ListItemsFilter />
        <ListSpecItems />
      </div>
      {/* 70% */}
      <div className="testItemWrapper h_100">
        <TestDetailsContainer />
      </div>
    </div>
  );
};

export default TestSpecsContainer;
