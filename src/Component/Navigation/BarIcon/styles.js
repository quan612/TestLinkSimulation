import styled from "styled-components";

export const StyledBar = styled.div`
  display: block;
  position: absolute;
  height: 70px;
  top: 10px;
  right: 10px;
  cursor: pointer;
  color: black;
  font-size: 18px;

  @media (min-width: 768px) {
    display: none;
  }
`;
