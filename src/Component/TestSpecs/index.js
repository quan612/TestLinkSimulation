import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { selectTestItemAction } from "../../Redux/actions";
import { SplitPane } from "../Containers/SplitPane";
import TestSpecsNavigator from "./TestSpecsNavigator";
import TestDetailsContainer from "./TestDetailsContainer";
import StyledTestDetails from "../styles/StyledTestDetails";

const TestSpecsContainer = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    return function cleanup() {
      dispatch(selectTestItemAction({}));
    };
  });
  return (
    <SplitPane
      left={
        <>
          <TestSpecsNavigator />
        </>
      }
      right={
        <StyledTestDetails>
          <TestDetailsContainer />
        </StyledTestDetails>
      }
    />
  );
};

export default TestSpecsContainer;
