import React from "react";
import { NavLink } from "react-router-dom";
import { Card, Container, Row, Col, Label } from "reactstrap";
const CreateNewBuildLinkPage = ({ selectedTestPlan }) => {
  return (
    <Container>
      <Row>
        <Col className="offset-lg-0 offset-md-3">
          <Card className="card-register">
            <Label>Execute Tests</Label>
            <Label>
              {selectedTestPlan && (
                <b> {`At least one Build (Active) is needed for this Test Plan: ${selectedTestPlan.name}`}</b>
              )}
            </Label>
            <div>
              <NavLink className="nav-inine-text px-1" to="/Builds">
                Create A New Build
              </NavLink>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateNewBuildLinkPage;
