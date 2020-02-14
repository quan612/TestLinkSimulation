import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addTestProjectAction, loadTestProjectsAction } from "../../Redux/testProject.action";
import { Formik } from "formik";
import * as Yup from "yup";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor5-build-classic-with-font/ckeditor5-build-classic";

import { Container, Card } from "../../Component/styles/BodyStyles";
import { FormGroup, Input, CustomInput, Button } from "reactstrap";
import FormStyles from "../../Component/styles/FormStyles";

const AddProject = () => {
  const dispatch = useDispatch();
  let history = useHistory();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(" Name is required!"),
    prefix: Yup.string().required(" Prefix is required!")
  });

  const handleSubmit = async (values, { setErrors }) => {
    try {
      await dispatch(addTestProjectAction(values))
        .then(message => {
          console.log("Add project successfully", message);
          dispatch(loadTestProjectsAction());
          history.push("/projects");
        })
        .catch(error => {
          if (error.indexOf(`There's already Test Project named`)) {
            setErrors({ name: error });
          }
          if (error.indexOf("Prefix")) {
            setErrors({ prefix: error });
          }
        });
    } catch (error) {
      console.log("catch error at submit new project", error);
    }
  };

  return (
    <div className="w-100 m-auto">
      <Formik
        initialValues={{
          name: "",
          prefix: "",
          description: "",
          requirement: true,
          issueTracker: false,
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

export default AddProject;

const AddForm = ({ formikProps }) => {
  let history = useHistory();
  const styles = {
    errorText: {
      color: "red",
      fontWeight: "bold"
    }
  };

  return (
    <FormStyles>
      <form onSubmit={formikProps.handleSubmit}>
        <div className="form-group">
          <Container>
            <Card className="wrapper h-75">
              <h2>Create a new project</h2>

              <div className="input wrapper w-25">
                <Input
                  placeholder="Project Name"
                  type="text"
                  name="name"
                  value={formikProps.values.name}
                  onChange={formikProps.handleChange}
                />
                {formikProps.errors.name && <span style={{ ...styles.errorText }}>{formikProps.errors.name}</span>}
                <br />
              </div>

              <div className="input wrapper w-25">
                <Input
                  placeholder="Prefix"
                  type="text"
                  name="prefix"
                  value={formikProps.values.prefix}
                  onChange={formikProps.handleChange}
                />

                {formikProps.errors.prefix && <span style={{ ...styles.errorText }}>{formikProps.errors.prefix}</span>}
                <br />
              </div>

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

              <div className="d-flex justify-content-start">
                <FormGroup check className="mr-2">
                  <CustomInput
                    id="requirement"
                    type="checkbox"
                    name="requirement"
                    checked={formikProps.values.requirement}
                    onChange={e => formikProps.setFieldValue("requirement", e.target.checked)}
                    label="Requirement"
                  />
                </FormGroup>

                <FormGroup check>
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

              <div className="d-flex">
                <Button className="mr-2" color="primary" type="submit">
                  Submit
                </Button>
                <Button color="secondary" onClick={() => history.push("/projects")}>
                  Cancel
                </Button>
              </div>
            </Card>
          </Container>
        </div>
      </form>
    </FormStyles>
  );
};
