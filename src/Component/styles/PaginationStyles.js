import styled from "styled-components";

const PaginationStyles = styled.div`
  text-align: center;

  .children {
    text-align: left;
  }

  .pagination {
    display: inline-grid;
    grid-template-columns: repeat(4, auto);
    align-items: stretch;
    justify-content: center;
    align-content: center;
    margin: 2rem 0;
    border: 1px solid ${props => props.theme.lightgrey};
    border-radius: 10px;

    button {
      background-color: Transparent;
      color: ${props => props.theme.black};
      font-weight: 500;

      &:disabled {
        color: ${props => props.theme.lightgrey};
        cursor: auto;
        font-weight: 300;
      }
    }

    & > * {
      margin: 0;
      padding: 7px 15px;
      border-right: 1px solid ${props => props.theme.lightgrey};
      &:last-child {
        border-right: 0;
      }
    }
  }
`;

export default PaginationStyles;
