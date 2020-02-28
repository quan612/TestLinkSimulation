import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../../routes";
import TestProjectDropDownWithFetching from "../TestProjectDropDown";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavContainer, DropDownContainer, Ul, LiParent } from "./styles";
import BarIcon from "../BarIcon";

const Nav = () => {
  return (
    <Ul id="menu">
      <LiParent>
        <Link to={ROUTES.HOME}>
          <FontAwesomeIcon icon="home" />
          Home
        </Link>
      </LiParent>
      <LiParent>
        <a href="/#">
          <FontAwesomeIcon icon="archive" /> Projects
        </a>
        <ul>
          <li>
            <Link to={ROUTES.PROJECTS}>Projects Management</Link>
          </li>
          <li>
            <Link to={ROUTES.ADD_PROJECT}>Add Project</Link>
          </li>
          <li>
            <Link to={ROUTES.SPECIFICATIONS}>Create Test Case</Link>
          </li>
        </ul>
      </LiParent>

      <LiParent>
        <a href="/#">
          <FontAwesomeIcon icon="tasks" /> Plans
        </a>
        <ul>
          <li>
            <Link to={ROUTES.PLANS}>Plans Management</Link>
          </li>
          <li>
            <Link to={ROUTES.ADD_PLAN}>Create Plan</Link>
          </li>
          <li>
            <Link to={ROUTES.ADD_TESTCASES_TO_TESTPLAN}>Add Cases to Plan</Link>
          </li>
        </ul>
      </LiParent>

      <LiParent>
        <a href="/#">
          <FontAwesomeIcon icon="running" /> Executions
        </a>
        <ul>
          <li>
            <Link to={ROUTES.BUILDS}>Builds</Link>
          </li>
          <li>
            <Link to={ROUTES.ADD_BUILD}>Create Builds</Link>
          </li>
          <li>
            <Link to={ROUTES.TEST_EXECUTION}>Test Executions</Link>
          </li>
        </ul>
      </LiParent>
    </Ul>
  );
};

const Header = () => {
  return (
    <NavContainer>
      <DropDownContainer>
        <TestProjectDropDownWithFetching />
      </DropDownContainer>
      <Nav />
      <BarIcon />
    </NavContainer>
  );
};
export default Header;
