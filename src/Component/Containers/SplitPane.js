import React from "react";

export const SplitPane = props => {
  return (
    <div className="workBody">
      <div className="ListContainer d-flex flex-column">{props.left}</div>
      <div className="testItemWrapper h_100">{props.right}</div>
    </div>
  );
};
