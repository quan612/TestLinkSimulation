import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
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
  background: -webkit-gradient(linear, center top, center bottom, from(#fff), to(#ccc));
  background-image: linear-gradient(#fff, #ccc);
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

  align-items: center;
  font-size: 0.8rem;
  margin: 0.3rem;
  position: relative;

  @media (max-width: 1300px) {
    margin-left: auto;
  }
`;

const Nav = () => {
  return (
    <Ul>
      {/* <li>
        <NavLink to={ROUTES.HOME} activeClassName="active-link" exact>
          <FontAwesomeIcon className="d-inline-block mx-1" icon="home" style={{ color: "white" }} size="xs" />
          Home
        </NavLink>
      </li>

      <li>
        <NavLink to={ROUTES.PROJECTS} activeClassName="active-link" exact>
          <FontAwesomeIcon className="d-inline-block mx-1" icon="archive" style={{ color: "white" }} />
          Projects
        </NavLink>
      </li>

      <li>
        <NavLink to={ROUTES.SPECIFICATIONS} activeClassName="active-link" exact>
          <FontAwesomeIcon className="d-inline-block mx-1" icon="paperclip" style={{ color: "white" }} />
          Specs
        </NavLink>
      </li>

      <li>
        <NavLink to={ROUTES.PLANS} activeClassName="active-link" exact>
          <FontAwesomeIcon className="d-inline-block mx-1" icon="tasks" style={{ color: "white" }} />
          Plans
        </NavLink>
      </li>

      <li>
        <NavLink to={ROUTES.BUILDS} activeClassName="active-link" exact>
          <FontAwesomeIcon className="d-inline-block mx-1" icon="list-ol" style={{ color: "white" }} />
          Builds
        </NavLink>
      </li>

      <li>
        <NavLink to={ROUTES.ADD_TESTCASES_TO_TESTPLAN} activeClassName="active-link" exact>
          <FontAwesomeIcon className="d-inline-block mx-1" icon="list-ol" style={{ color: "white" }} />
          Add Cases to Plan
        </NavLink>
      </li>

      <li>
        <NavLink to={ROUTES.TEST_EXECUTION} activeClassName="active-link" exact>
          <FontAwesomeIcon className="d-inline-block mx-1" icon="running" style={{ color: "white" }} />
          Executions
        </NavLink>
      </li> */}

      <LiParent>
        <a href="#">Test 111111111</a>
        <ul>
          <li>
            <NavLink to={ROUTES.TEST_EXECUTION} activeClassName="active-link" exact>
              {/* <FontAwesomeIcon className="d-inline-block mx-1" icon="running" style={{ color: "white" }} /> */}
              abcsd
            </NavLink>

            <NavLink to={ROUTES.TEST_EXECUTION} activeClassName="active-link" exact>
              {/* <FontAwesomeIcon className="d-inline-block mx-1" icon="running" style={{ color: "white" }} /> */}
              abcsd
            </NavLink>

            <NavLink to={ROUTES.TEST_EXECUTION} activeClassName="active-link" exact>
              {/* <FontAwesomeIcon className="d-inline-block mx-1" icon="running" style={{ color: "white" }} /> */}
              abcsd
            </NavLink>
          </li>
        </ul>
      </LiParent>

      <LiParent>
        <a href="#">Test 111111111</a>
        <ul c>
          <li>
            <NavLink to={ROUTES.TEST_EXECUTION} activeClassName="active-link" exact>
              {/* <FontAwesomeIcon className="d-inline-block mx-1" icon="running" style={{ color: "white" }} /> */}
              abcsd
            </NavLink>

            <NavLink to={ROUTES.TEST_EXECUTION} activeClassName="active-link" exact>
              {/* <FontAwesomeIcon className="d-inline-block mx-1" icon="running" style={{ color: "white" }} /> */}
              abcsd
            </NavLink>

            <NavLink to={ROUTES.TEST_EXECUTION} activeClassName="active-link" exact>
              {/* <FontAwesomeIcon className="d-inline-block mx-1" icon="running" style={{ color: "white" }} /> */}
              abcsd
            </NavLink>
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
        {/* <TestPlanDropDownWithFetching selectedProject={selectedProject} /> */}
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
