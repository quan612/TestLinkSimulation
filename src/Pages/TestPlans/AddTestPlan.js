import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor5-build-classic-with-font/ckeditor5-build-classic";

import { loadTestPlansAction, addTestPlanAction } from "../../Redux/testPlan.action";

import { Formik } from "formik";
import * as Yup from "yup";
import { Container, Card } from "../../Component/styles/BodyStyles";
import { FormGroup, Input, CustomInput, Button } from "reactstrap";
import FormStyles from "../../Component/styles/FormStyles";

const styles = {
  errorText: {
    color: "red",
    fontWeight: "bold"
  }
};

const AddTestPlan = () => {
  const { selectedProject } = useSelector(state => ({
    selectedProject: state.selectedProject
  }));

  let history = useHistory();

  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(" Test Plan Name is required!")
  });

  const handleSubmit = async (values, { setErrors }) => {
    console.log("add test plan  ", values);
    dispatch(addTestPlanAction(values, selectedProject))
      .then(result => {
        console.log("add test plan success ", result);
        dispatch(loadTestPlansAction(selectedProject));
        if (history) {
          console.log("history", history);
          history.goBack();
        }
        history.push("/plans");
      })
      .catch(error => setErrors({ name: "Validation: " + error }));
  };

  return (
    <div className=" w-100 ml-auto mr-auto">
      <Formik
        initialValues={{
          name: "",
          description: "",
          isActive: true,
          isPublic: true
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {formikProps => <AddForm formikProps={formikProps} />}
      </Formik>
    </div>
  );
};

export default AddTestPlan;

const AddForm = ({ formikProps }) => {
  let history = useHistory();

  return (
    <FormStyles>
      <form onSubmit={formikProps.handleSubmit}>
        <Container>
          <Card className="wrapper h-75">
            <h2>Add New Plan</h2>

            <div className="input wrapper w-25">
              <Input
                placeholder="Name"
                type="text"
                name="name"
                value={formikProps.values.name}
                onChange={formikProps.handleChange}
              />

              <br />
            </div>
            {formikProps.errors.name && <span style={{ ...styles.errorText }}>{formikProps.errors.name}</span>}

            <div>
              <CKEditor
                editor={ClassicEditor}
                data={formikProps.values.description}
                onInit={editor => {}}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  formikProps.setFieldValue("description", data);
                }}
              />
              <br />
            </div>

            <div className="d-flex justify-content-star">
              <FormGroup check className="mr-2">
                <CustomInput
                  id="isActive"
                  type="checkbox"
                  name="isActive"
                  checked={formikProps.values.isActive}
                  onChange={e => formikProps.setFieldValue("isActive", e.target.checked)}
                  label="Active"
                />
              </FormGroup>

              <FormGroup check>
                <CustomInput
                  id="isPublic"
                  type="checkbox"
                  name="isPublic"
                  checked={formikProps.values.isPublic}
                  onChange={e => formikProps.setFieldValue("isPublic", e.target.checked)}
                  label="Public"
                />
              </FormGroup>
            </div>

            <div className="d-flex pb-2 pt-2">
              <Button className="mr-2" color="primary" type="submit">
                Submit
              </Button>
              <Button
                color="secondary"
                onClick={() => {
                  if (history) {
                    history.goBack();
                  }
                  history.push("/plans");
                }}
              >
                Cancel
              </Button>
            </div>
          </Card>
        </Container>
      </form>
    </FormStyles>
  );
};
