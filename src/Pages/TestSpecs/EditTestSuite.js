import React, { useState } from "react";
import { updateTestSuiteHelper } from "../../Redux/apiHelpers";
import { FormDetailContainer } from "../../Component/styles/StyledTestDetails";
import { SectionHeader, CardTitle } from "../../Component/styles/BodyStyles";
import FormStyles from "../../Component/styles/FormStyles";

const EditTestSuite = ({ selectedProject, testSuite, onClose }) => {
  const [data, setData] = useState({
    name: testSuite.name,
    details: testSuite.details,
    parent_id: testSuite.parent_id
  });

  const handleOnChange = e => {
    const { name, value } = e.target;
    setData(prevState => {
      return {
        ...prevState,
        [name]: value
      };
    });
  };

  const handleOnSave = e => {
    e.preventDefault();
    updateTestSuiteHelper(selectedProject, testSuite.parent_id, data)
      .then(message => {
        console.log(message);
        onClose();
      })
      .catch(error => {
        console.log("catch error at update test suite helper", error);
      });
  };

  return (
    <FormDetailContainer>
      <SectionHeader>Update test suite</SectionHeader>
      <b style={{ color: "red" }}>The API provided by Test Link does not work</b>

      <div className="details">
        <FormStyles>
          <form onSubmit={e => handleOnSave(e)}>
            <CardTitle>Test Suite Name</CardTitle>
            <input
              type="text"
              name="name"
              className="form-control"
              value={data.name}
              onChange={handleOnChange}
              maxLength={100}
            ></input>

            <CardTitle>Test Suite Details</CardTitle>
            <input
              type="text"
              name="details"
              className="form-control"
              value={data.details}
              onChange={handleOnChange}
            ></input>

            <div className="buttonBar">
              <button className="btn btn-success" type="submit">
                Update Suite
              </button>
              <button className="btn btn-secondary ml-2" onClick={() => onClose()}>
                Cancel
              </button>
            </div>
          </form>
        </FormStyles>
      </div>
    </FormDetailContainer>
  );
};

export default EditTestSuite;
