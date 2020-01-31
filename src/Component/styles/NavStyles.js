import styled from "styled-components";

export const Ul = styled.ul`
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0 10px;
  font-size: 1rem;

  svg {
    /* font-size: 0.5em; */
    align-self: center;
    color: ${props => props.theme.grey};
  }
  /* a,
  button {
    
    position: relative;
    align-items: center;
    font-weight: 800;
    font-size: 0.8rem;
    padding: 0.3rem;
    border: 0;
    color: white;
    cursor: pointer;
    @media (max-width: 700px) {
      font-size: 10px;
      padding: 0 10px;
    } */

  /* &.active-link {
      color: #007bff;
      path {
        stroke-width: 18;
        color: #007bff;
      }
    } */
  /* } */

  &:hover ul li a:hover {
    background: -webkit-gradient(linear, center top, center bottom, from(#eee), to(#fff));
    background-image: linear-gradient(#ededed, #fff);
    border-radius: 12px;
    box-shadow: inset 0px 0px 4px 2px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 1300px) {
    border-top: 1px solid red;
    width: auto;
    justify-content: center;
    font-size: 1rem;
  }
`;

export const LiParent = styled.li`
  position: relative;

  > ul {
    position: absolute;
    left: -9999px;
    list-style: none;
    opacity: 0;
    transition: opacity 1s ease;
  }

  /* Displays the dropdown on hover and moves back into position */
  &:hover > ul {
    color: black;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 0 0 6px 6px;
    box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.4);
    left: 5px;
    opacity: 1;
    z-index: 1;
  }

  &:hover > ul > li {
    display: flex;
    flex-direction: column;
  }

  > span,
  a {
    color: ${props => props.theme.grey};
    display: block;
    font-weight: 600;
    font-size: 0.8rem;
    line-height: 1rem;
    padding: 4px 6px;
    margin: 8px 8px;
    vertical-align: middle;
    text-decoration: none;
  }

  &:hover a {
    background: -webkit-gradient(linear, center top, center bottom, from(#ccc), to(#ededed));
    background-image: linear-gradient(#ccc, #ededed);
    border-radius: 12px;
    box-shadow: inset 0px 0px 1px 1px rgba(0, 0, 0, 0.1);
    color: #222;
  }

  &:hover ul a {
    background: none;
    border-radius: 0;
    box-shadow: none;
  }

  > li {
    position: relative;
  }
`;
