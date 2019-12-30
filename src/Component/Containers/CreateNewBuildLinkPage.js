import React from "react";
import { NavLink } from "react-router-dom";
import { Card, Container, Row, Col, Label } from "reactstrap";
const CreateNewBuildLinkPage = ({ selectTestPlan }) => {
  return (
    <Container>
      <Row>
        <Col className="offset-lg-0 offset-md-3">
          <Card className="card-register">
            <Label>Execute Tests</Label>
            <Label>
              {selectTestPlan && (
                <b> {`At least one Build (Active) is needed for this Test Plan: ${selectTestPlan.name}`}</b>
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
