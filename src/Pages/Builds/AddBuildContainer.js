//todo: add validation to date that is not before today
import React from "react";
import { addBuildAction, loadBuildsAsyncAction } from "../../Redux/build.action";
import { Formik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
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

const AddBuildContainer = ({ onClose }) => {
  const { selectedTestPlan } = useSelector(state => ({
    selectedTestPlan: state.selectedTestPlan
  }));

  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(" Name is required!"),
    releaseDate: Yup.string().required(" Release date is required!")
    // .test(releaseDate)
  });

  const handleSubmit = async (values, { setErrors }) => {
    // console.log("values", values);
    dispatch(addBuildAction(values))
      .then(message => {
        message.forEach(data => {
          if (data.status === false) {
            setErrors({ name: data.message });
          } else {
            console.log("Add build success ", data.message);
            dispatch(loadBuildsAsyncAction(selectedTestPlan));
            onClose();
          }
        });
      })
      .catch(error => {
        setErrors({ name: error });
        console.log("error ", error);
      });
  };

  return (
    <div className="w-75 m-auto">
      <Formik
        initialValues={{
          name: "",
          description: "",
          isActive: true,
          isOpen: true,
          releaseDate: "",
          testPlanId: selectedTestPlan.id
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {formikProps => <BuildForm formikProps={formikProps} onClose={onClose} />}
      </Formik>
    </div>
  );
};

export default AddBuildContainer;

const BuildForm = ({ formikProps, onClose }) => {
  const styles = {
    errorText: {
      color: "red",
      fontWeight: "bold"
    }
  };

  return (
    <form onSubmit={formikProps.handleSubmit} autoComplete="off">
      <div className="form-group">
        <div className="content">
          <Container>
            <Row>
              <Col className="offset-lg-0 offset-md-3">
                <Card className="card-register">
                  <CardHeader>
                    <h4>Create New Build</h4>
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
                            name="isOpen"
                            checked={formikProps.values.isOpen}
                            onChange={e => formikProps.setFieldValue("isOpen", e.target.checked)}
                            label="Open"
                          />
                        </Label>
                      </FormGroup>
                    </div>
                    <br />
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText></InputGroupText>
                      </InputGroupAddon>
                      <DatePicker
                        name="releaseDate"
                        placeholderText="Set Release Date"
                        value={formikProps.values.releaseDate}
                        onChange={val => formikProps.setFieldValue("releaseDate", moment(val).format("YYYY-MM-DD"))}
                      />
                      {formikProps.errors.releaseDate && (
                        <span style={{ ...styles.errorText }}>{formikProps.errors.releaseDate}</span>
                      )}
                    </InputGroup>
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
          <DisplayFormikState {...formikProps} />
        </div>
      </div>
    </form>
  );
};

const DisplayFormikState = props => (
  <div style={{ margin: "1rem 0", background: "#f6f8fa", padding: ".5rem" }}>
    <strong>Injected Formik props (the form's state)</strong>
    <div>
      <code>errors:</code> {JSON.stringify(props.errors, null, 2)}
    </div>
    <div>
      <code>values:</code> {JSON.stringify(props.value, null, 2)}
    </div>
    <div>
      <code>isSubmitting:</code> {JSON.stringify(props, null, 2)}
    </div>
  </div>
);
