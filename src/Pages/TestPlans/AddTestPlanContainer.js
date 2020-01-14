import React from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor5-build-classic-with-font/ckeditor5-build-classic";

import { loadTestPlansAction, addTestPlanAction } from "../../Redux/testPlan.action";
import { useSelector, useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
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

const styles = {
  errorText: {
    color: "red",
    fontWeight: "bold"
  }
};

const AddTestPlanContainer = ({ onCancel }) => {
  const { selectedProject } = useSelector(state => ({
    selectedProject: state.selectedProject
  }));

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
        onCancel();
      })
      .catch(error => setErrors({ name: "Validation: " + error }));
  };

  return (
    <div className="w-75 m-auto">
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
        {formikProps => <TestPlanForm formikProps={formikProps} onCancel={onCancel} />}
      </Formik>
    </div>
  );
};

export default AddTestPlanContainer;

const TestPlanForm = ({ formikProps, onCancel }) => {
  return (
    <form onSubmit={formikProps.handleSubmit}>
      <Container>
        <Row>
          <Col className="offset-lg-0 offset-md-3">
            <Card className="card-register">
              <CardHeader>
                <CardTitle>Create New Test Plan</CardTitle>
              </CardHeader>
              <CardBody>
                <div></div>
                <InputGroup className="w-75">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="tim-icons icon-single-02" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Name"
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

                <div className="d-flex w-25 justify-content-between">
                  <FormGroup check>
                    <Label check>
                      <CustomInput
                        id="exampleCustomCheckbox1"
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
                        id="exampleCustomCheckbox2"
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
                <Button color="secondary" onClick={onCancel} label="Cancel">
                  Cancel
                </Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
    </form>
  );
};
