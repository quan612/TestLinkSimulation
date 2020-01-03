import styled from "styled-components";

const DropdownStyles = styled.div`
  .dropdown-toggle {
    max-height: 20vh;
    min-width: 250px;
    text-align: left;
    overflow-y: auto;

    &::after {
      display: none;
    }
  }
  .dropdown-menu {
    max-height: 20vh;
    min-width: 250px;
    text-align: left;
    overflow-y: auto;
  }
  .btn {
    background-color: transparent;
  }
  .dropdown-toggle:focus,
  .dropdown-toggle.active:focus,
  .dropdown-toggle.active,
  .dropdown-toggle:hover {
    background-color: transparent;
  }
`;

export default DropdownStyles;
