import React from "react";
import styled from "styled-components";

const LeftPane = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
`;

const RightPane = styled.div`
  width: 70%;
  margin-left: auto;
`;

export const SplitPane = props => {
  return (
    <div className="workBody">
      <LeftPane>{props.left}</LeftPane>
      <RightPane>{props.right}</RightPane>
    </div>
  );
};
