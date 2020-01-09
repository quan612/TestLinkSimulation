import styled from "styled-components";
export const StyledTestDetailContainer = styled.div`
  min-width: 99%;
  height: 100%;
  margin-right: 15px;
  margin-left: 15px;
  background: #1f2251;

  @media (min-width: 1200px) .container {
    max-width: 1140px;
  }
  @media (min-width: 992px) .container {
    max-width: 960px;
  }
  @media (min-width: 768px) .container {
    max-width: 720px;
  }
  @media (min-width: 576px) .container {
    max-width: 540px;
  }
`;

export const StyledTestDetails = styled.div`
  .details {
    padding-left: 15px;
    padding-right: 15px;
  }
`;