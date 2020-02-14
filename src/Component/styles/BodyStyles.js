import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  height: 92%;

  /* padding-right: 15px;
  padding-left: 15px; */
  margin-right: auto;
  margin-left: auto;

  /* @media (min-width: 576px) {
    max-width: 540px;
  }

  @media (min-width: 768px) {
    max-width: 720px;
  }
  @media (min-width: 992px) {
    max-width: 960px;
  }
  @media (min-width: 1200px) {
    max-width: 1140px;
  } */
`;

export const Header = styled.div`
  color: ${props => props.theme.whiteSmoke};
  font-weight: bold;
  font-size: 1em;

  border-color: #99bbe8;
  padding: 7px;
  margin: 2px;
  background-color: #252e37;
  border-radius: 5px;
`;

export const HeaderIcon = styled.div`
  float: right;
  margin-left: 5px;
  font-size: 1.3em;
`;

export const Card = styled.div`
  background: ${props => props.theme.nav_bg};
  background-image: ${props => props.theme.nav_bgImg};
  border: 0;
  position: relative;
  height: 100%;
  width: 100%;

  box-shadow: 0 1px 20px 0px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  color: ${props => props.theme.black};

  margin-right: auto;
  margin-left: auto;
  padding: 10px 8px 0px 8px;

  h1 {
    font-size: 2rem;
  }

  label {
    margin-bottom: 0.75rem;
    margin: 0 15px;
    color: ${props => props.theme.black};
  }

  .tree {
    overflow-x: auto;
    height: 100%;
    white-space: nowrap;
  }

  > .tree-text,
  * .tree-text {
    cursor: pointer;
    &:hover {
      background-color: lightgray;
    }
  }
`;

export const CardTitle = styled.div`
  color: black;
  font-weight: bold;
  font-size: 1.2em;
  font-family: tahoma, arial, verdana, sans-serif;
  padding: 7px;
  margin: 2px;
`;

export const CardContent = styled.div`
  text-align: left;
  padding: 7px;
  margin: 2px;
  /* background: transparent;       */
  background-image: linear-gradient(to right, #d3d3d3, #9e9e9e);
  border-style: groove;
  border-width: thin;
  border-radius: 5px;
`;
