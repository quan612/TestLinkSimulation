import React, { useState } from "react";
import { useSelector } from "react-redux";
import useBuildsFetching from "../../Component/CustomHooks/useBuildsFetching";
import BuildsManagement from "./BuildsManagement";
import CreateNewTestPlanLinkPage from "../../Component/Containers/CreateNewTestPlanLinkPage";
import { Container, Card } from "../../Component/styles/BodyStyles";

import TestPlanDropDownWithFetching from "../../Component/Common/TestPlanDropDown";
import { DropDownContainer } from "../../Component/styles/DropdownStyles";

const BuildsContainer = () => {
  const { selectedProject, testPlans, selectedTestPlan } = useSelector(state => ({
    selectedProject: state.selectedProject,
    testPlans: state.testPlans,
    selectedTestPlan: state.selectedTestPlan
  }));

  const { isLoading, buildsOfCurrentTestPlan } = useBuildsFetching(selectedTestPlan);

  const handleDeleteSubmit = async itemToDelete => {};

  if (testPlans === "") {
    return <CreateNewTestPlanLinkPage selectedProject={selectedProject} />;
  }

  return (
    <Container className="wrapper h-75">
      <Card>
        <DropDownContainer>
          <TestPlanDropDownWithFetching selectedProject={selectedProject} />
        </DropDownContainer>
        <BuildsManagement
          isLoading={isLoading}
          selectedTestPlan={selectedTestPlan}
          listOfItems={buildsOfCurrentTestPlan}
          handleOnDelete={build => handleDeleteSubmit(build)}
        />
      </Card>
    </Container>
  );
};

export default BuildsContainer;
