import styled from "styled-components";

export const TableStyles = styled.div`
  height: 100%;
  width: 100%;
  margin: 15px 0;
  padding: 0 5px;

  table {
    table-layout: fixed;
  }

  thead,
  tbody {
    display: block;
  }

  tbody {
    min-height: 10px;
    max-height: 300px;
    overflow-y: auto; /* Trigger vertical scroll    */
    overflow-x: hidden; /* Hide the horizontal scroll */
  }

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

  thead tr {
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 0%, rgba(0, 0, 0, 0.15) 100%),
      radial-gradient(at top center, rgba(255, 255, 255, 0.4) 0%, rgba(0, 0, 0, 0.4) 120%) #989898;
    background-blend-mode: multiply, multiply;
    display: block;
    position: relative;
    /* box-shadow: 0 1px 20px 0px rgba(0, 0, 0, 0.1); */
  }

  thead > tr > td,
  thead > tr > th {
    color: ${props => props.theme.offWhite};
  }

  tbody > tr > td,
  tbody > tr > th {
    color: ${props => props.theme.black}!important;
  }

  tbody > tr {
    border-bottom: 2px solid ${props => props.theme.table_row_border} !important;
  }

  p {
    margin-bottom: 0 !important;
  }

  tbody > tr > td {
    word-wrap: break-word;
    white-space: pre-wrap;
  }
`;
