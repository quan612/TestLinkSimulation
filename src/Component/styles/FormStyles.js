import styled from "styled-components";

const FormStyles = styled.div`
  .error {
    color: red;
  }
  .buttonBar {
    display: inline-block;
    margin-top: 1rem;
  }

  .form-control {
    display: block;
    width: 100%;
    background-color: transparent;
    background-clip: padding-box;
    box-shadow: none;
  }

  label {
    display: inline;
    margin-left: 0.5em;
    margin-right: 2em;
    line-height: 1em;
  }

  .form-check {
    padding-left: 0;
  }
`;

export default FormStyles;
