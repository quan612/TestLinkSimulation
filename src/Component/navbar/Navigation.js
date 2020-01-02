import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import TestProjectDropDownWithFetching from "./TestProjectDropDown";
import TestPlanDropDownWithFetching from "./TestPlanDropDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as ROUTES from "../../routes";
import NavStyles from "../styles";

const Nav = () => {};

const Header = props => (
  <div className="navbar bg-info sticky-top">
    <div className="h-100 w-100 d-flex">
      <div className="dd_container">
        <TestProjectDropDownWithFetching />
        <TestPlanDropDownWithFetching selectedProject={props.selectedProject} />
      </div>
      <ul className="navbar-nav col flex-row navlink">
        <li className="nav-item">
          <NavLink className="nav-text px-1" to={ROUTES.HOME} activeClassName="active-link" exact>
            <FontAwesomeIcon className="d-inline-block mx-1" icon="home" style={{ color: "white" }} />
            <span>Home</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-text px-1" to={ROUTES.PROJECTS} activeClassName="active-link" exact>
            <FontAwesomeIcon className="d-inline-block mx-1" icon="archive" style={{ color: "white" }} />
            <span>Projects</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-text px-1" to={ROUTES.PROJECTS} activeClassName="active-link" exact>
            <FontAwesomeIcon className="d-inline-block mx-1" icon="paperclip" style={{ color: "white" }} />
            <span>Specifications</span>
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-text px-1" to={ROUTES.PROJECTS} activeClassName="active-link" exact>
            <FontAwesomeIcon className="d-inline-block mx-1" icon="tasks" style={{ color: "white" }} />
            <span>Plans</span>
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-text px-1" to={ROUTES.PROJECTS} activeClassName="active-link" exact>
            <FontAwesomeIcon className="d-inline-block mx-1" icon="list-ol" style={{ color: "white" }} />
            <span>Builds</span>
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-text px-1" to={ROUTES.PROJECTS} activeClassName="active-link" exact>
            <FontAwesomeIcon className="d-inline-block mx-1" icon="list-ol" style={{ color: "white" }} />
            <span>Add Cases to Plan</span>
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-text" to={ROUTES.TEST_EXECUTION} activeClassName="active-link" exact>
            <FontAwesomeIcon className="d-inline-block mx-1" icon="running" style={{ color: "white" }} />
            <span>Executions</span>
          </NavLink>
        </li>
      </ul>
    </div>
  </div>
);

const mapStateToProps = state => {
  return {
    selectedProject: state.selectedProject
  };
};

export default connect(mapStateToProps)(Header);
