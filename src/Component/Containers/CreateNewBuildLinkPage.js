import React from "react";
import { NavLink } from "react-router-dom";

const CreateNewBuildLinkPage = selectTestPlan => {
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
      <p>Execute Tests</p>
      <p>
        {selectTestPlan && (
          <b> {`At least one Build (Active &amp; Open) is needed for this Test Plan<b> ${selectTestPlan.name}`}</b>
        )}
      </p>
      <p>
        <NavLink className="nav-inine-text px-1" to="/Builds">
          Create A New Build
        </NavLink>
      </p>
    </div>
  );
};

export default CreateNewBuildLinkPage;
