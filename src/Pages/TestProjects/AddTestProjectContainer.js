import React from "react";
import { useDispatch } from "react-redux";
import { addTestProjectAction, loadTestProjectsAction } from "../../Redux/testProject.action";
import { Formik } from "formik";
import * as Yup from "yup";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor5-build-classic-with-font/ckeditor5-build-classic";

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

const AddTestProjectContainer = ({ onClose }) => {
  const dispatch = useDispatch();

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
          onClose();
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
    <div className="w-75 m-auto">
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
        {formikProps => <AddProjectForm formikProps={formikProps} onClose={onClose} />}
      </Formik>
    </div>
  );
};

export default AddTestProjectContainer;

const AddProjectForm = ({ formikProps, onClose }) => {
  const styles = {
    errorText: {
      color: "red",
      fontWeight: "bold"
    }
  };

  return (
    <form onSubmit={formikProps.handleSubmit}>
      <div className="form-group">
        <Container>
          <Row>
            <Col className="offset-lg-0 offset-md-3">
              <Card className="card-register">
                <CardHeader>Create a new project</CardHeader>
                <CardBody>
                  <InputGroup className="w-75">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="tim-icons icon-single-02" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Project Name"
                      type="text"
                      name="name"
                      value={formikProps.values.name}
                      onChange={formikProps.handleChange}
                    />
                  </InputGroup>
                  {formikProps.errors.name && <span style={{ ...styles.errorText }}>{formikProps.errors.name}</span>}
                  <br />

                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText></InputGroupText>
                    </InputGroupAddon>
                    <CKEditor
                      editor={ClassicEditor}
                      data={formikProps.values.description}
                      onInit={editor => {}}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        formikProps.setFieldValue("description", data);
                      }}
                    />
                  </InputGroup>
                  <br />

                  <InputGroup className="w-15">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="tim-icons icon-single-02" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Prefix"
                      type="text"
                      name="prefix"
                      value={formikProps.values.prefix}
                      onChange={formikProps.handleChange}
                    />
                  </InputGroup>
                  {formikProps.errors.prefix && (
                    <span style={{ ...styles.errorText }}>{formikProps.errors.prefix}</span>
                  )}
                  <br />
                  <div className="d-flex w-25 justify-content-between">
                    <FormGroup check>
                      <Label check>
                        <CustomInput
                          id="exampleCustomCheckbox1"
                          type="checkbox"
                          name="requirement"
                          checked={formikProps.values.requirement}
                          onChange={e => formikProps.setFieldValue("requirement", e.target.checked)}
                          label="Requirement"
                        />
                      </Label>
                    </FormGroup>

                    <FormGroup check>
                      <Label check>
                        <CustomInput
                          id="exampleCustomCheckbox2"
                          type="checkbox"
                          name="isActive"
                          checked={formikProps.values.isActive}
                          onChange={e => formikProps.setFieldValue("isActive", e.target.checked)}
                          label="Active"
                        />
                      </Label>
                    </FormGroup>

                    <FormGroup check>
                      <Label check>
                        <CustomInput
                          id="exampleCustomCheckbox3"
                          type="checkbox"
                          name="isPublic"
                          checked={formikProps.values.isPublic}
                          onChange={e => formikProps.setFieldValue("isPublic", e.target.checked)}
                          label="Public"
                        />
                      </Label>
                    </FormGroup>
                  </div>
                </CardBody>
                <CardFooter>
                  <Button className="mr-2" color="success" type="submit" label="Submit">
                    Submit
                  </Button>
                  <Button color="secondary" onClick={onClose} label="Cancel">
                    Cancel
                  </Button>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </form>
  );
};
