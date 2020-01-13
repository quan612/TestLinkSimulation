import styled from "styled-components";

export const TableManagementStyles = styled.div`
  height: 75%;
  width: 100%;
  padding: 15px;
  margin-right: auto;
  margin-left: auto;
  text-align: center;
  .body {
    background: #1f2251;
    border: 0;
    position: relative;
    height: 100%;
    width: 100%;
    box-shadow: 0 1px 20px 0px rgba(0, 0, 0, 0.1);

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
  }
`;
