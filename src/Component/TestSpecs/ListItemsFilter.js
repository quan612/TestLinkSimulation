import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Label, Input } from "reactstrap";

const ListItemsFilter = () => {
  const [toggle, setToggle] = useState(false);

  const handleSettingCollapse = () => {
    setToggle(!toggle);
  };

  useEffect(() => {}, []);

  return (
    <div>
      <div className="panel-header">
        <span>Filter</span>
        <FontAwesomeIcon className="panel-header-icon" icon={"question-circle"} />
        <FontAwesomeIcon
          className="panel-header-icon"
          icon={toggle === true ? "caret-square-up" : "caret-square-down"}
          onClick={() => handleSettingCollapse()}
        />
      </div>
      {toggle && (
        <div className="filter-testcase">
          <div className="d-flex justify-content-between">
            <Label style={{ color: "white" }}>Test case</Label>
            <Input
              className="w-75"
              placeholder="Search"
              type="text"
              name="name"
              //  onChange={handleChange}
            ></Input>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListItemsFilter;
