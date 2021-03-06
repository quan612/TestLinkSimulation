import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTestItemAction } from "../../Redux/testSpec.action";

import { SplitPane } from "../../Component/Containers/SplitPane";
import Navigator from "./Navigator";
import TestDetailsContainer from "./TestDetailsContainer";
import LoadingContainer from "../../Component/Containers/LoadingContainer";

const TestSpecsContainer = () => {
  const dispatch = useDispatch();
  const { isProjectLoading } = useSelector(state => ({
    isProjectLoading: state.isProjectLoading
  }));

  useEffect(() => {
    // clean up the field in store so that in another tab we don't see this selected item again
    return function cleanup() {
      dispatch(selectTestItemAction({}));
    };
  }, [dispatch]);

  if (isProjectLoading) {
    return <LoadingContainer color="white" label="Fetching Projects" />;
  }
  return <SplitPane left={<Navigator />} right={<TestDetailsContainer />} />;
};

export default TestSpecsContainer;
