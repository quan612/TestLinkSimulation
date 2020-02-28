import styled from "styled-components";

const DropdownStyles = styled.div`
  .dropdown-toggle {
    max-height: 20vh;
    min-width: 200px;
    text-align: left;
    overflow-y: auto;

    &::after {
      display: none;
    }
  }

  .show > .dropdown-menu {
    max-height: 20vh;
    min-width: 180px;
    text-align: left;
    overflow-y: auto;
    border: none;
    background: ${props => props.theme.nav_bg};
    background-image: ${props => props.theme.nav_bgImg};
  }

  .btn {
    background-color: transparent;
    border-color: black;
    border-radius: 20px;
    border: 1.5px solid black;
  }

  .btn-primary {
    color: ${props => props.theme.grey};
    font-weight: 600;
    font-size: 0.8rem;
  }

  .show > .btn-primary.dropdown-toggle:focus,
  .show > .btn-primary.dropdown-toggle,
  .btn-primary,
  .btn-primary:focus {
    background-color: transparent;
    border-color: black;
    box-shadow: none;
    color: black;
  }
  .dropdown-toggle:focus,
  .dropdown-toggle.active:focus,
  .dropdown-toggle.active,
  .dropdown-toggle:hover {
    background-color: transparent;
  }
`;

export const DropDownContainer = styled.div`
  display: flex;

  align-items: center;
  position: relative;

  @media (max-width: 1300px) {
    margin-left: auto;
  }
`;

export default DropdownStyles;
