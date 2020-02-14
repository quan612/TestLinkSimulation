import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { selectTestItemAction } from "../../Redux/actions";
import { SplitPane } from "../../Component/Containers/SplitPane";
import TestSpecsNavigator from "./TestSpecsNavigator";
import TestDetailsContainer from "./TestDetailsContainer";
import { StyledTestDetail } from "../../Component/styles/StyledTestDetails";
import { Container, Card } from "../../Component/styles/BodyStyles";

const TestSpecsContainer = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    return function cleanup() {
      dispatch(selectTestItemAction({}));
    };
  });
  return (
    <Container className="body-container">
      <SplitPane
        left={
          <>
            <TestSpecsNavigator />
          </>
        }
        right={
          <StyledTestDetail>
            <Card>
              <TestDetailsContainer />
            </Card>
          </StyledTestDetail>
        }
      />
    </Container>
  );
};

export default TestSpecsContainer;
