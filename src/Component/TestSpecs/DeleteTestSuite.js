import { Card, CardBody, Container, Row, Col } from "reactstrap";
import React from "react";

const DeleteTestSuite = ({ selectedTestItem, onCancel }) => {
  return (
    <Card>
      <h4>{selectedTestItem && <b>{`Delete Test Suite: ${selectedTestItem.name}`}</b>}</h4>
      <CardBody>
        <form>
          <h5>
            This feature is not supported by the API right now, due to test execution being recorded into Test Plan
          </h5>

          <div className=" btn-toolbar">
            <button type="button" className="btn btn-outline-danger mr-2" disabled>
              Delete This Suite
            </button>
            <button type="button" className="btn btn-outline-info" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default DeleteTestSuite;
