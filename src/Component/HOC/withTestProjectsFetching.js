import React from "react";
import useTestProjectFetching from "../CustomHooks/useTestProjectsFetching";

const withTestProjectsFetching = BaseComponent => ({ ...props }) => {
  const { isLoading, testProjects } = useTestProjectFetching();

  return <BaseComponent isLoading={isLoading} testProjects={testProjects} />;
};

export default withTestProjectsFetching;
