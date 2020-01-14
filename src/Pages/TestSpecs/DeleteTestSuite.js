import React from "react";
import { StyledTestDetails } from "../../Component/styles/StyledTestDetails";
import FormStyles from "../../Component/styles/FormStyles";

const DeleteTestSuite = ({ selectedTestItem, onClose }) => {
  const handleSubmit = e => {
    e.preventDefault();
  };
  return (
    <StyledTestDetails>
      {selectedTestItem && <h1>{`Delete Test Suite: ${selectedTestItem.name}`}</h1>}
      <div className="details">
        <FormStyles>
          <form onSubmit={e => handleSubmit(e)}>
            <label className="error">
              This feature is not supported by the API right now, due to test execution being recorded into Test Plan
            </label>
            <hr />
            <div className="buttonBar">
              <button className="btn btn-success" type="submit">
                Delete
              </button>
              <button className="btn btn-secondary ml-2" onClick={() => onClose()}>
                Cancel
              </button>
            </div>
          </form>
        </FormStyles>
      </div>
    </StyledTestDetails>
  );
};

export default DeleteTestSuite;
