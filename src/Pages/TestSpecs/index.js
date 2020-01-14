import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { selectTestItemAction } from "../../Redux/actions";
import { SplitPane } from "../../Component/Containers/SplitPane";
import TestSpecsNavigator from "./TestSpecsNavigator";
import TestDetailsContainer from "./TestDetailsContainer";
import { StyledTestDetailContainer } from "../../Component/styles/StyledTestDetails";

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
        <StyledTestDetailContainer>
          <TestDetailsContainer />
        </StyledTestDetailContainer>
      }
    />
  );
};

export default TestSpecsContainer;
