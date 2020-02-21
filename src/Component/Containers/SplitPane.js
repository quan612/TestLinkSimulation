import React from "react";

import styled from "styled-components";

const LeftPane = styled.div`
  background: ${props => props.theme.nav_bg};
  background-image: ${props => props.theme.nav_bgImg};
  box-shadow: 0 1px 20px 0px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;

  width: 30%;
  display: flex;
  margin-right: 2px;
  flex-direction: column;
  /* flex: 1 1 auto; */

  @media (max-width: 960px) {
    display: block;
    width: 100%;
    height: 30vh;
  }
`;

const RightPane = styled.div`
  background: ${props => props.theme.nav_bg};
  background-image: ${props => props.theme.nav_bgImg};
  box-shadow: 0 1px 20px 0px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;

  width: 70%;
  margin-left: auto;

  /* flex: 3 1 auto; */

  @media (max-width: 960px) {
    display: block;
    width: 100%;
    min-height: 64vh;
    height: auto;
    margin-top: 0.2rem;
  }
`;

export const SplitPane = props => {
  return (
    <>
      <LeftPane className="left">{props.left}</LeftPane>
      <RightPane className="right">{props.right}</RightPane>
    </>
  );
};
