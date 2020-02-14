import styled from "styled-components";

export const NavContainer = styled.div`
  display: block;
  position: relative;
  width: 100%;
  font-size: 16px;
  margin: 0.5rem auto;
  padding: 0.2rem 0;
  background: ${props => props.theme.nav_bg};
  background-image: ${props => props.theme.nav_bgImg};
  border-radius: 15px;
  box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.4);

  /* the container for navigation, on desktop its flex and justify item space between, 
     on mobile it is block */
  @media (min-width: 768px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const DropDownContainer = styled.div`
  display: flex;
  position: relative;
  padding: 0 20px;
  margin-right: 1em;
  align-items: center;

  /* the container of the dropdown always stay as flex to align children within */
`;

export const Ul = styled.ul`
  display: none;
  list-style-type: none;
  margin: 0;
  padding: 0 5px;
  font-size: 1rem;

  svg {
    align-self: center;
    color: ${props => props.theme.grey};
  }

  /* the UL menu: when on mobile we don't show it, and it is toggle as block by the hamburger icon
  on desktop it is flex
  */
  @media (min-width: 768px) {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  &:hover ul li a:hover {
    background-color: black;
    color: white;
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
    /* vertical-align: middle; */
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
