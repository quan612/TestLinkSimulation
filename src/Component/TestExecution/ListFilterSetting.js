import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DropDown from "../DropDown";
import { selectBuildAction } from "../../Redux/build.action";

const ListFilterSetting = ({ selectedBuild, builds }) => {
  let dispatch = useDispatch();

  const [toggle, setToggle] = useState(true);

  const handleSettingCollapse = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    //  if (builds) {
    //dispatch(selectBuildAction(builds[0]));
    // }
  }, []);

  const handleOnChangeBuild = eventKey => {
    let currentBuild = builds[eventKey];
    dispatch(selectBuildAction(currentBuild));
  };
  return (
    <div>
      <div className="panel-header">
        <span>Settings</span>
        <FontAwesomeIcon className="panel-header-icon" icon={"question-circle"} />
        <FontAwesomeIcon
          className="panel-header-icon"
          icon={toggle ? "caret-square-up" : "caret-square-down"}
          onClick={() => handleSettingCollapse()}
        />
      </div>
      {toggle && (
        <div className="filter-builds">
          <div className="d-flex justify-content-between">
            <span style={{ color: "white" }}>Build to execute</span>
            <DropDown title={selectedBuild.name} items={builds} onSelect={handleOnChangeBuild} />
          </div>
          <div style={{ color: "red" }}>{"may be put test plan drop down here"}</div>
        </div>
      )}
    </div>
  );
};

export default ListFilterSetting;
