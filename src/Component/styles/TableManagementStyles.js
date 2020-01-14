import styled from "styled-components";

export const TableManagementStyles = styled.div`
  height: 75%;
  width: 100%;
  margin-top: 15px;

  .body {
    margin-right: auto;
    margin-left: auto;
    padding: 15px;
    background: #1f2251;
    border: 0;
    height: 100%;

    box-shadow: 0 2px 25px 0px rgba(0, 0, 0, 0.1);

    @media only screen and (min-width: 576px) {
      max-width: 540px;
    }
    @media only screen and (min-width: 768px) {
      max-width: 720px;
    }

    @media only screen and (min-width: 992px) {
      max-width: 960px;
    }
    @media only screen and (min-width: 1200px) {
      max-width: 1140px;
    }

    /* & > * {
      margin: 10px 0;
    } */
  }
`;
