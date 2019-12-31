import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { selectTestItemAction } from "../../Redux/actions";
import ListItems from "./ListItems";
import TestDetailsContainer from "./TestDetailsContainer";
import ListItemsFilter from "./ListItemsFilter";
import { SplitPane } from "../Containers/SplitPane";
import { Container, Row, Col } from "reactstrap";

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
          <h1>Test Specifications</h1>
          <ListItemsFilter />
          <ListItems />
        </>
      }
      right={
        <Container className="h_100 mw-99">
          <Row className="h-100">
            <Col className="offset-lg-0 offset-md-3">
              <TestDetailsContainer />{" "}
            </Col>
          </Row>
        </Container>
      }
    />
  );
};

export default TestSpecsContainer;
