import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Label,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  CustomInput,
  Button
} from "reactstrap";

import { getTestLinkVersion } from "../../Redux/apiHelpers";

const Home = () => {
  const [testLinkVersion, setTestLinkVersion] = useState("");

  React.useEffect(() => {
    getTestLinkVersion().then(result => {
      setTestLinkVersion(result);
    });
  }, []);

  return (
    <Container className="h-75">
      <Row className="h-100">
        <Col className="offset-lg-0 offset-md-3">
          <Card className="card-management h-100">
            <CardHeader>
              {testLinkVersion && <h4>{`TestLink Clone Version ${testLinkVersion}`}</h4>}
              <br />
              <h5>Current Functions:</h5>
            </CardHeader>
            <CardBody>
              <Row>
                <Col className="mt-2 col-12">
                  <dl className="row">
                    <dt className="col-sm-3">Projects:</dt>
                    <dd className="col-sm-9">List current projects. User can add / remove project.</dd>
                    <dt className="col-sm-3 text-truncate">Plans:</dt>
                    <dd className="col-sm-9">
                      List of current test plans belong to selected project. User can add a new test plan.
                    </dd>
                    <dt className="col-sm-3">Specifications:</dt>
                    <dd className="col-sm-9">
                      List of test suites and test cases of selected project. User can add new test suites and new test
                      cases.
                    </dd>
                    <dt className="col-sm-3">Builds:</dt>
                    <dd className="col-sm-9">List of current builds of selected test plan.</dd>
                    <dt className="col-sm-3">Add Case to Plan:</dt>
                    <dd className="col-sm-9">
                      Add test cases to selected test plan. Test cases belong to test plan can be executed with a build.
                    </dd>
                    <dt className="col-sm-3">Executions:</dt>
                    <dd className="col-sm-9">Execute test case of selected test plan and selected build release.</dd>
                  </dl>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
