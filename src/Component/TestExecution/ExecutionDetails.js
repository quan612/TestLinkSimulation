import React from "react";
import DropDown from "../Common/DropDown";
import { connect } from "react-redux";
import { reportResultApi } from "../../Redux/apiHelpers";

import { Button, Card, CardBody, Container, Row, Col } from "reactstrap";
import TableSimple from "../Common/TableSimple";

function ExecutionDetails(props) {
  let executeStatus = "";

  const tableColumns = {
    steps: {
      label: "#",
      width: "3%"
    },
    actions: {
      label: "Action",
      width: "44%"
    },
    expected_results: {
      label: "Expected Result",
      width: "45%"
    },
    execution_type: {
      label: "Execution",
      width: "8%"
    }
  };

  let executionStatus = [
    { name: " ", value: "n" },
    { name: "Pass", value: "p" },
    { name: "Fail", value: "f" },
    { name: "Block", value: "b" }
  ];

  const handleOnChangeStatus = eventKey => {
    const temp = executionStatus[eventKey];
    executeStatus = temp.value;
  };

  const handleOnResultSubmit = () => {
    const result = {
      testcase: props.selectedTestItem,
      testPlan: props.selectTestPlan,
      status: executeStatus,
      build: props.selectedBuild,
      notes: ""
    };
    reportResultApi(result)
      .then(message => console.log(message))
      .catch(error => console.log(error));
  };

  return (
    <Container className=" mw-99">
      <Row>
        <Col className="offset-lg-0 offset-md-3">
          <h1>{"Execute Test"}</h1>
          <Card>
            <CardBody>
              <div className="test-detail-case-title">
                {`Test Case ${props.testItemResult.full_external_id} :: Version : ${props.testItemResult.version} :: ${props.testItemResult.tcase_name}`}
                <br />
                {"Assign to"}
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="panel-header">Execution History</div>

              <div className="panel-content">
                {props.buildsOfCurrentTestPlan.map((build, index) => (
                  <div key={index}> {build.name}</div>
                ))}
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="panel-header">Summary</div>
              {props.summary && <div className="panel-content">{props.summary}</div>}
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="panel-header">Precondition</div>
              {props.precondition && <div className="panel-content"> {props.precondition}</div>}
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="panel-header">Test Steps</div>
              <div className="table-container">
                <TableSimple tableItems={props.testItemResult.steps} columns={tableColumns} />
              </div>
            </CardBody>
          </Card>

          <Card className="execution-details-submit">
            <div className="result-box ">
              <span className="mr-3">Execution status:</span>
              <DropDown title={"Execution status"} items={executionStatus} onSelect={handleOnChangeStatus} />
              <Button className="btn btn-info ml-3" color="primary" size="sm" onClick={() => handleOnResultSubmit()}>
                Submit
              </Button>
            </div>
          </Card>
          {/* <Card className="message">
            <div className="messages">
              {
                "Important Notice: Once a Result is updated from 'Not Run' to another value, you cannot set it back to 'Not Run'."
              }
              <br />
              {"You can still set the Result to any other value."}
            </div>
          </Card> */}
        </Col>
      </Row>
    </Container>
  );
}

const mapStateToProps = state => {
  return {
    selectedTestItem: state.selectedTestItem,
    selectedBuild: state.selectedBuild,
    selectTestPlan: state.selectTestPlan,
    buildsOfCurrentTestPlan: state.buildsOfCurrentTestPlan
  };
};

export default connect(mapStateToProps)(ExecutionDetails);
