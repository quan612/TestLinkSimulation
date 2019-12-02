import React from "react";
import { Card, CardBody, Container, Row, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TestSuiteDetails = ({
  selectedSuite,
  onCreateTestSuite,
  onEditTestSuite,
  onDeleteTestSuite,
  OnCreateTestCase
}) => {
  return (
    <Container className="h_100 mw-99">
      <Row className="h-100">
        <Col className="offset-lg-0 offset-md-3">
          <h1>{"Test Suite Details"}</h1>
          <Card>
            <CardBody>
              <div className="test-detail-case-title">{`${selectedSuite.name}`}</div>
            </CardBody>
            <CardBody>
              <FontAwesomeIcon
                icon="tools"
                size={"2x"}
                color={"white"}
                style={{ animation: `spin720 1s ease`, animationDelay: `0.3s` }}
                data-toggle="collapse"
                href="#testSuiteUtilities"
              />
              <div className="collapse" id="testSuiteUtilities">
                <form>
                  <label>Test Suite Operations:</label>
                  <FontAwesomeIcon
                    className="ml-2"
                    icon="plus-circle"
                    size={"lg"}
                    style={{ color: "#00e676" }}
                    data-toggle="tooltip"
                    title="Create"
                    onClick={() => onCreateTestSuite()}
                  />
                  <FontAwesomeIcon
                    className="ml-2"
                    icon="pencil-alt"
                    size={"lg"}
                    style={{ color: "#ffab00" }}
                    data-toggle="tooltip"
                    title="Edit"
                    onClick={() => onEditTestSuite()}
                  />
                  <FontAwesomeIcon
                    className="ml-2"
                    icon="trash-alt"
                    size={"lg"}
                    style={{ color: "red" }}
                    data-toggle="tooltip"
                    title="Delete test suite with all children"
                    onClick={() => onDeleteTestSuite()}
                  />
                </form>

                <form>
                  {/* <div> */}
                  <label>Test Case Operations:</label>
                  <FontAwesomeIcon
                    className="ml-2"
                    icon="plus-circle"
                    size={"lg"}
                    style={{ color: "#00e676" }}
                    title="Create"
                    onClick={() => OnCreateTestCase()}
                  />
                  {/* </div> */}
                </form>
              </div>

              <div className="panel-header">Test Suite Details</div>
              {selectedSuite.details && (
                <div className="panel-content">
                  <div dangerouslySetInnerHTML={{ __html: selectedSuite.details }} />
                </div>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TestSuiteDetails;
