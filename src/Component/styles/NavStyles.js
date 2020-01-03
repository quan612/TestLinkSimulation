import styled from "styled-components";

const NavStyles = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  justify-self: end;
  font-size: 1rem;
  a,
  button {
    display: flex;
    flex-direction: column;
    position: relative;
    align-items: center;
    font-weight: 900;
    font-size: 1rem;
    padding: 0.3rem;
    border: 0;
    color: white;
    cursor: pointer;
    @media (max-width: 700px) {
      font-size: 10px;
      padding: 0 10px;
    }

    svg {
      font-size: 3em;
      align-self: center;
    }

    &.active-link {
      color: #007bff;
      path {
        stroke-width: 18;
        color: #007bff;
      }
    }

    /* &:before {
      content: "";
      width: 2px;
      background: red;
      height: 100%;
      left: 0;
      position: absolute;
      transform: skew(-20deg);
      top: 0;
      bottom: 0;
    }
    &:after {
      height: 2px;
      background: red;
      content: "";
      width: 0;
      position: absolute;
      transform: translateX(-50%);
      transition: width 0.4s;
      transition-timing-function: cubic-bezier(1, -0.65, 0, 2.31);
      left: 50%;
      margin-top: 2rem;
    } */
  }
  @media (max-width: 1300px) {
    border-top: 1px solid red;
    width: 100%;
    justify-content: center;
    font-size: 1.5rem;
  }
`;

export default NavStyles;
