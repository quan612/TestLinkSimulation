import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
`;

export const SectionHeader = styled.div`
  color: ${props => props.theme.whiteSmoke};
  font-weight: bold;
  font-size: 1em;

  border-color: #99bbe8;
  padding: 7px;
  margin: 2px;
  background-color: #252e37;
  border-radius: 5px;
`;

export const SectionHeaderIcon = styled.div`
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
  /* border-bottom: 1px solid; */
`;

export const CardContent = styled.div`
  text-align: left;
  padding: 7px;
  margin: 2px;
`;
