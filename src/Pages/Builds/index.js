import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import BuildsManagement from "./BuildsManagement";
import { Container, Card } from "../../Component/styles/BodyStyles";

import TestPlanDropDownWithFetching from "../../Component/Common/TestPlanDropDown";
import { DropDownContainer } from "../../Component/styles/DropdownStyles";
import LoadingContainer from "../../Component/Containers/LoadingContainer";
import { selectTestPlanAction } from "../../Redux/testPlan.action";

const BuildsContainer = () => {
  const { isProjectLoading, selectedProject, isTestPlanLoading, testPlans, selectedTestPlan } = useSelector(state => ({
    isProjectLoading: state.isProjectLoading,
    isTestPlanLoading: state.isTestPlanLoading,
    selectedProject: state.selectedProject,
    testPlans: state.testPlans,
    selectedTestPlan: state.selectedTestPlan
  }));

  const handleDeleteSubmit = async itemToDelete => {};
  const dispatch = useDispatch();

  useEffect(() => {
    return async function cleanup() {
      await dispatch(selectTestPlanAction({}));
    };
  }, [dispatch]);

  if (isProjectLoading) {
    return <LoadingContainer color="white" label="Fetching Projects" />;
  }

  return (
    <Container className="wrapper ">
      <Card>
        <DropDownContainer>
          <TestPlanDropDownWithFetching selectedProject={selectedProject} />
        </DropDownContainer>

        {!isTestPlanLoading && testPlans && Object.values(testPlans).length > 0 && (
          <BuildsManagement selectedTestPlan={selectedTestPlan} handleOnDelete={build => handleDeleteSubmit(build)} />
        )}
      </Card>
    </Container>
  );
};

export default BuildsContainer;
