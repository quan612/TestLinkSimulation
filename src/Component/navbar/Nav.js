import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import TestProjectDropDownWithFetching from "./TestProjectDropDown";
import TestPlanDropDownWithFetching from "./TestPlanDropDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Nav = props => (
  <div className="navbar bg-info sticky-top">
    <div className="h-100 w-100 d-flex">
      <div className="dd_container">
        <TestProjectDropDownWithFetching />
        <TestPlanDropDownWithFetching selectedProject={props.selectedProject} />
      </div>
      <ul className="navbar-nav col flex-row navlink">
        <li className="nav-item">
          <NavLink className="nav-text px-1" to="/" activeClassName="active-link" exact>
            <FontAwesomeIcon className="d-inline-block mx-1" icon="home" style={{ color: "white" }} />
            <span>Home</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-text px-1" to="/TestProjects" activeClassName="active-link" exact>
            <FontAwesomeIcon className="d-inline-block mx-1" icon="archive" style={{ color: "white" }} />
            <span>Projects</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-text px-1" to="/TestSpecs" activeClassName="active-link" exact>
            <FontAwesomeIcon className="d-inline-block mx-1" icon="paperclip" style={{ color: "white" }} />
            <span>Specifications</span>
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-text px-1" to="/TestPlans" activeClassName="active-link" exact>
            <FontAwesomeIcon className="d-inline-block mx-1" icon="tasks" style={{ color: "white" }} />
            <span>Plans</span>
          </NavLink>
        </li>

        {props.testPlans && (
          <li className="nav-item">
            <NavLink className="nav-text px-1" to="/Builds" activeClassName="active-link" exact>
              <FontAwesomeIcon className="d-inline-block mx-1" icon="list-ol" style={{ color: "white" }} />
              <span>Builds</span>
            </NavLink>
          </li>
        )}

        <li className="nav-item">
          <NavLink className="nav-text px-1" to="/AddCaseToPlan" activeClassName="active-link" exact>
            <FontAwesomeIcon className="d-inline-block mx-1" icon="list-ol" style={{ color: "white" }} />
            <span>Add Case to Plan</span>
          </NavLink>
        </li>

        {props.testPlans && (
          <li className="nav-item">
            <NavLink className="nav-text" to="/TestExecution" activeClassName="active-link" exact>
              <FontAwesomeIcon className="d-inline-block mx-1" icon="running" style={{ color: "white" }} />
              <span>Executions</span>
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  </div>
);

const mapStateToProps = state => {
  return {
    testPlans: state.testPlans,
    selectedProject: state.selectedProject
  };
};

export default connect(mapStateToProps)(Nav);
