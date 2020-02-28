import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectTestItemAction } from "../../Redux/testSpec.action";

import LoadingContainer from "../../Component/Containers/LoadingContainer";
import { SplitPane } from "../../Component/Containers/SplitPane";

import ExecutionContainer from "./ExecutionContainer";
import ListExecutionItems from "./ListExecutionItems";
import Filter from "./Filter";

const TestExecution = () => {
  const { isProjectLoading } = useSelector(state => ({
    isProjectLoading: state.isProjectLoading
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    // clean up the field in store so that in another tab we don't see this selected item again
    return function cleanup() {
      dispatch(selectTestItemAction({}));
    };
  }, [dispatch]);

  if (isProjectLoading) {
    return <LoadingContainer color="white" label="Fetching Projects" />;
  }

  return (
    <SplitPane
      left={
        <>
          <Filter />
          <ListExecutionItems />
        </>
      }
      right={<ExecutionContainer />}
    />
  );
};

export default TestExecution;
