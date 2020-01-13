import React from "react";
import { NavLink } from "react-router-dom";

const CreateNewTestPlanLinkPage = ({ selectedProject }) => {
  let styles = {
    maincontent: {
      textalign: "left",
      margin: "3px",
      background: "#CDE",
      padding: "3px 3px 50px 3px",
      borderstyle: "groove",
      borderwidth: "thin"
    }
  };

  return (
    <div style={{ ...styles.maincontent }}>
      <p>{<b> {`There is no test plan for this project ${selectedProject.name}. Please add a test plan.`}</b>}</p>
      <p>
        <NavLink className="nav-inine-text px-1" to="/plans">
          To Test Plan Management
        </NavLink>
      </p>
    </div>
  );
};

export default CreateNewTestPlanLinkPage;
