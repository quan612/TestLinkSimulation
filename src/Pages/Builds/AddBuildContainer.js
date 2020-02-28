//todo: add validation to date that is not before today
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addBuildAction, loadBuildsAsyncAction } from "../../Redux/build.action";
import { Formik } from "formik";

import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor5-build-classic-with-font/ckeditor5-build-classic";

import { Container, Card } from "../../Component/styles/BodyStyles";
import { FormGroup, Input, CustomInput, Button } from "reactstrap";
import FormStyles from "../../Component/styles/FormStyles";
import TestPlanDropDownWithFetching from "../../Component/Common/TestPlanDropDown";
import { DropDownContainer } from "../../Component/styles/DropdownStyles";

const AddBuildContainer = () => {
  const { selectedProject, selectedTestPlan } = useSelector(state => ({
    selectedProject: state.selectedProject,
    selectedTestPlan: state.selectedTestPlan
  }));

  let history = useHistory();

  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(" Name is required!"),
    releaseDate: Yup.string().required(" Release date is required!")
    // .test(releaseDate)
  });

  const handleSubmit = async (values, { setErrors }) => {
    dispatch(addBuildAction(values))
      .then(message => {
        message.forEach(data => {
          if (data.status === false) {
            setErrors({ name: data.message });
          } else {
            console.log("Add build success ", data.message);
            dispatch(loadBuildsAsyncAction(selectedTestPlan));
            history.push("/builds");
          }
        });
      })
      .catch(error => {
        setErrors({ name: error });
        console.log("error ", error);
      });
  };

  return (
    <div className=" w-100 ml-auto mr-auto">
      <Container>
        <Card className="wrapper h-75">
          <DropDownContainer>
            <TestPlanDropDownWithFetching selectedProject={selectedProject} />
          </DropDownContainer>
          {selectedTestPlan && (
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
              {formikProps => <BuildForm formikProps={formikProps} />}
            </Formik>
          )}
        </Card>
      </Container>
    </div>
  );
};

export default AddBuildContainer;

const BuildForm = ({ formikProps }) => {
  const styles = {
    errorText: {
      color: "red",
      fontWeight: "bold"
    }
  };

  let history = useHistory();

  return (
    <FormStyles>
      <form onSubmit={formikProps.handleSubmit}>
        <h2>Create Build</h2>

        <div className="input wrapper w-25">
          <Input
            placeholder="Name"
            type="text"
            name="name"
            value={formikProps.values.name}
            onChange={formikProps.handleChange}
          />
          {formikProps.errors.name && <span style={{ ...styles.errorText }}>{formikProps.errors.name}</span>}
          <br />
        </div>

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

        <div className="d-flex justify-content-start">
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
              id="isOpen"
              type="checkbox"
              name="isOpen"
              checked={formikProps.values.isOpen}
              onChange={e => formikProps.setFieldValue("isOpen", e.target.checked)}
              label="Open"
            />
          </FormGroup>
        </div>
        <br />

        <div>
          <DatePicker
            name="releaseDate"
            placeholderText="Set Release Date"
            value={formikProps.values.releaseDate}
            onChange={val => formikProps.setFieldValue("releaseDate", moment(val).format("YYYY-MM-DD"))}
          />
          {formikProps.errors.releaseDate && (
            <span style={{ ...styles.errorText }}>{formikProps.errors.releaseDate}</span>
          )}
        </div>
        <br />

        <div className="d-flex mt-3">
          <Button className="mr-2" color="primary" type="submit">
            Save Build
          </Button>
          <Button
            color="secondary"
            onClick={() => {
              history.push("/builds");
            }}
          >
            Cancel
          </Button>
        </div>
      </form>
    </FormStyles>
  );
};

// const DisplayFormikState = props => (
//   <div style={{ margin: "1rem 0", background: "#f6f8fa", padding: ".5rem" }}>
//     <strong>Injected Formik props (the form's state)</strong>
//     <div>
//       <code>errors:</code> {JSON.stringify(props.errors, null, 2)}
//     </div>
//     <div>
//       <code>values:</code> {JSON.stringify(props.value, null, 2)}
//     </div>
//     <div>
//       <code>isSubmitting:</code> {JSON.stringify(props, null, 2)}
//     </div>
//   </div>
// );
