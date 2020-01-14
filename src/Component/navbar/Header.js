import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import TestProjectDropDownWithFetching from "./TestProjectDropDown";
import TestPlanDropDownWithFetching from "./TestPlanDropDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as ROUTES from "../../routes";
import NavStyles from "../styles/NavStyles";
import styled from "styled-components";

const StyledHeader = styled.header`
  .head {
    border-bottom: 12px solid ${props => props.theme.black};
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
    @media (max-width: 1300px) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }
`;

const DropDownContainer = styled.div`
display:flex;
justify-content: space-evenly;
align-items: center;
  font-size: 2rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  /* transform: skew(-7deg); */
  /* a {
    padding: 0.5rem 1rem;
    background: ${props => props.theme.red};
    color: white;
    text-transform: uppercase;
    text-decoration: none;
  } */
  @media (max-width: 1300px) {
    margin: 0;
    text-align: center;
  }
`;

const Nav = () => {
  return (
    <NavStyles>
      <NavLink to={ROUTES.HOME} activeClassName="active-link" exact>
        <FontAwesomeIcon className="d-inline-block mx-1" icon="home" style={{ color: "white" }} />
        Home
      </NavLink>

      <NavLink to={ROUTES.PROJECTS} activeClassName="active-link" exact>
        <FontAwesomeIcon className="d-inline-block mx-1" icon="archive" style={{ color: "white" }} />
        Projects
      </NavLink>

      <NavLink to={ROUTES.SPECIFICATIONS} activeClassName="active-link" exact>
        <FontAwesomeIcon className="d-inline-block mx-1" icon="paperclip" style={{ color: "white" }} />
        Specifications
      </NavLink>

      <NavLink to={ROUTES.PLANS} activeClassName="active-link" exact>
        <FontAwesomeIcon className="d-inline-block mx-1" icon="tasks" style={{ color: "white" }} />
        Plans
      </NavLink>

      <NavLink to={ROUTES.BUILDS} activeClassName="active-link" exact>
        <FontAwesomeIcon className="d-inline-block mx-1" icon="list-ol" style={{ color: "white" }} />
        Builds
      </NavLink>

      <NavLink to={ROUTES.ADD_TESTCASES_TO_TESTPLAN} activeClassName="active-link" exact>
        <FontAwesomeIcon className="d-inline-block mx-1" icon="list-ol" style={{ color: "white" }} />
        Add Cases to Plan
      </NavLink>

      <NavLink to={ROUTES.TEST_EXECUTION} activeClassName="active-link" exact>
        <FontAwesomeIcon className="d-inline-block mx-1" icon="running" style={{ color: "white" }} />
        Executions
      </NavLink>
    </NavStyles>
  );
};

const Header = ({ selectedProject }) => (
  <StyledHeader>
    <div className="head">
      <DropDownContainer>
        <TestProjectDropDownWithFetching />
        <TestPlanDropDownWithFetching selectedProject={selectedProject} />
      </DropDownContainer>
      <Nav />
    </div>
  </StyledHeader>
);

const mapStateToProps = state => {
  return {
    selectedProject: state.selectedProject
  };
};

export default connect(mapStateToProps)(Header);
