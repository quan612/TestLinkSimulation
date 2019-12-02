import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ListFilter = () => {
  const [toggle, setToggle] = useState(true);

  const handleSettingCollapse = () => {
    setToggle(!toggle);
  };

  // useEffect(() => {}, []);

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
            <span style={{ color: "white" }}>Test Plan</span>
            {/* to do: should add test plan drop down here */}
            {/* <DropDown title={selectedBuild.name} items={builds} onSelect={handleOnChangeBuild} /> */}
          </div>
          <div style={{ color: "red" }}>{"may be put test plan drop down here"}</div>
        </div>
      )}
    </div>
  );
};

export default ListFilter;
