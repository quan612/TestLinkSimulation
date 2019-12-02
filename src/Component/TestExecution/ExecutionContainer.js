import React, { useState, useEffect } from "react";
import ExecutionDetails from "./ExecutionDetails";
import { Card, CardBody, Container, Row, Col } from "reactstrap";
import { getTestCaseHelper } from "../../Redux/apiHelpers";

function ExecutionContainer({ selectedBuild, selectTestPlan, selectedTestItem }) {
  const [testCaseDetails, setTestCaseDetails] = useState(null);

  useEffect(() => {
    const getTestCaseDetails = async () => {
      if (selectedTestItem) {
        const testcase = getTestCaseHelper(selectedTestItem);
        setTestCaseDetails(testcase);
      }
    };
    getTestCaseDetails();
  }, [selectedTestItem]);

  if (selectedTestItem && selectedTestItem.node === "File" && testCaseDetails) {
    return <ExecutionDetails testItemResult={selectedTestItem} testItemDetails={testCaseDetails} />;
  }
  //default page to load current test plan details - mostly done
  else
    return (
      <Container className="h-100 mw-99">
        <Row className="h-100">
          <Col className="offset-lg-0 offset-md-3">
            <h1>{"Execute Test"}</h1>
            <Card className="section h-100">
              <CardBody>
                <div className="panel-header">{`Test plan: ${selectTestPlan.name} `}</div>
                <div className="panel-content" dangerouslySetInnerHTML={{ __html: selectTestPlan.notes }}></div>
                <div className="panel-header">{`Build info: ${selectedBuild.name} `}</div>
                <div className="panel-content" dangerouslySetInnerHTML={{ __html: selectedBuild.notes }}></div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
}

export default ExecutionContainer;
