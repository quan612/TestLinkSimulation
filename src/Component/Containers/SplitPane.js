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
    <>
      <LeftPane className="left">{props.left}</LeftPane>
      <RightPane className="right">{props.right}</RightPane>
    </>
  );
};
