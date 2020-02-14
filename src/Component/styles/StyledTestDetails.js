import styled from "styled-components";

export const StyledTestDetail = styled.div`
  min-width: 99% !important;
  height: 100%;
  margin-right: 15px;
  margin-left: 15px;

  .container {
    @media (min-width: 1200px) {
      max-width: 1140px;
    }
    @media (min-width: 992px) {
      max-width: 960px;
    }
    @media (min-width: 768px) {
      max-width: 720px;
    }
    @media (min-width: 576px) {
      max-width: 540px;
    }
  }
`;

export const FormDetailContainer = styled.div`
  .details {
    padding-left: 15px;
    padding-right: 15px;
  }
`;
