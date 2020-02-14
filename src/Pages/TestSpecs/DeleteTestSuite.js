import React from "react";
import { FormDetailContainer } from "../../Component/styles/StyledTestDetails";
import { Header } from "../../Component/styles/BodyStyles";
import FormStyles from "../../Component/styles/FormStyles";

const DeleteTestSuite = ({ testSuite, onClose }) => {
  const handleSubmit = e => {
    e.preventDefault();
  };
  return (
    <FormDetailContainer>
      <Header>Delete Test Suite</Header>
      <FormStyles>
        <form onSubmit={e => handleSubmit(e)}>
          <label className="error">
            This feature is not supported by the API right now, due to test execution being recorded into Test Plan
          </label>
          <hr />
          <div className="button-bar">
            <button className="btn btn-success" type="submit">
              Delete
            </button>
            <button className="btn btn-secondary ml-2" onClick={() => onClose()}>
              Cancel
            </button>
          </div>
        </form>
      </FormStyles>
    </FormDetailContainer>
  );
};

export default DeleteTestSuite;
