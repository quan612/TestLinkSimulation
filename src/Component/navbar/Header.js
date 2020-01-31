import React from "react";
import { connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import TestProjectDropDownWithFetching from "./TestProjectDropDown";
import TestPlanDropDownWithFetching from "./TestPlanDropDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as ROUTES from "../../routes";
import { Ul, LiParent } from "../styles/NavStyles";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 1rem auto;
`;

const StyledHeader = styled.header`
  display: flex;
  width: 80%;
  margin: auto;
  background: ${props => props.theme.nav_bg};
  background-image: ${props => props.theme.nav_bgImg};
  border-radius: 15px;
  box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.4);
  padding: 0 10px;
  position: relative;

  @media (max-width: 850px) {
    flex-direction: column;
    text-align: left;
  }
`;

const DropDownContainer = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: 1em;
  align-items: center;
  position: relative;

  @media (max-width: 1300px) {
    margin-left: auto;
  }
`;

const Nav = () => {
  return (
    <Ul>
      <LiParent>
        <Link to={ROUTES.HOME} exact>
          <FontAwesomeIcon icon="home" size="xs" />
          Home
        </Link>
      </LiParent>
      <LiParent>
        <a href="#">
          <FontAwesomeIcon icon="archive" /> Projects
        </a>
        <ul>
          <li>
            <Link to={ROUTES.PROJECTS} exact>
              Projects Management
            </Link>
          </li>
          <li>
            <Link to={ROUTES.ADD_PROJECT} exact>
              Add Project
            </Link>
          </li>
          <li>
            <Link to={ROUTES.SPECIFICATIONS} exact>
              Create Test Case
            </Link>
          </li>
        </ul>
      </LiParent>

      <LiParent>
        <a href="#">
          <FontAwesomeIcon icon="tasks" /> Plans
        </a>
        <ul>
          <li>
            <Link to={ROUTES.PLANS} exact>
              Plans Management
            </Link>
          </li>
          <li>
            <Link to={ROUTES.TEST_EXECUTION} exact>
              Create Plans
            </Link>
          </li>
          <li>
            <Link to={ROUTES.ADD_TESTCASES_TO_TESTPLAN} exact>
              Add Cases to Plan
            </Link>
          </li>
        </ul>
      </LiParent>

      <LiParent>
        <a href="#">
          <FontAwesomeIcon icon="running" /> Executions
        </a>
        <ul>
          <li>
            <Link to={ROUTES.BUILDS} exact>
              Builds
            </Link>
          </li>
          <li>
            <Link to={ROUTES.TEST_EXECUTION} exact>
              Create Builds
            </Link>
          </li>
          <li>
            <Link to={ROUTES.ADD_TESTCASES_TO_TESTPLAN} exact>
              Test Executions
            </Link>
          </li>
        </ul>
      </LiParent>
    </Ul>
  );
};

const Header = ({ selectedProject }) => (
  <Wrapper>
    <StyledHeader>
      <Nav />
      <DropDownContainer>
        <TestProjectDropDownWithFetching />
      </DropDownContainer>
    </StyledHeader>
  </Wrapper>
);

const mapStateToProps = state => {
  return {
    selectedProject: state.selectedProject
  };
};

export default connect(mapStateToProps)(Header);
