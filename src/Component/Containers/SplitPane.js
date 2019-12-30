import React from "react";

export const SplitPane = props => {
  return (
    <div className="TestSpecsContainer workBody">
      <div className="ListContainer h_100 d-flex flex-column">{props.left}</div>
      <div className="testItemWrapper h_100">{props.right}</div>
    </div>
  );
};
