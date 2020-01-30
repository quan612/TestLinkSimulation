import styled from "styled-components";

export const Ul = styled.ul`
  display: flex;
  align-item: center;
  margin: 0;
  padding: 0;
  font-size: 1rem;

  a,
  button {
    display: flex;
    flex-direction: column;
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
    }

    svg {
      font-size: 0.5em;
      align-self: center;
    }

    &.active-link {
      color: #007bff;
      path {
        stroke-width: 18;
        color: #007bff;
      }
    }
  }

  // & > li {
  //   position: relative;
  // }

  // & > li > ul {
  //   position: absolute;
  //   left: -9999px;
  //   list-style: none;
  //   opacity: 0;
  //   transition: opacity 1s ease;
  // }

  // & > li:hover > ul {
  //   color: black;
  //   background: rgba(255, 255, 255, 0.7);
  //   border-radius: 0 0 6px 6px;
  //   box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.4);
  //   left: 5px;
  //   opacity: 1;
  // }

  // & > li:hover a {
  //   background: -webkit-gradient(linear, center top, center bottom, from(#ccc), to(#ededed));
  //   background-image: linear-gradient(#ccc, #ededed);
  //   border-radius: 12px;
  //   box-shadow: inset 0px 0px 1px 1px rgba(0, 0, 0, 0.1);
  //   color: #222;
  // }
  // & > li:hover ul a {
  //   background: none;
  //   border-radius: 0;
  //   box-shadow: none;
  // }
  // & > li:hover ul li a:hover {
  //   background: -webkit-gradient(linear, center top, center bottom, from(#eee), to(#fff));
  //   background-image: linear-gradient(#ededed, #fff);
  //   border-radius: 12px;
  //   box-shadow: inset 0px 0px 4px 2px rgba(0, 0, 0, 0.3);
  // }

  @media (max-width: 1300px) {
    border-top: 1px solid red;
    width: auto;
    // justify-content: center;
    font-size: 1.5rem;
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

  &:hover > ul {
    color: black;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 0 0 6px 6px;
    box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.4);
    left: 5px;
    opacity: 1;
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
  &:hover ul li a:hover {
    background: -webkit-gradient(linear, center top, center bottom, from(#eee), to(#fff));
    background-image: linear-gradient(#ededed, #fff);
    border-radius: 12px;
    box-shadow: inset 0px 0px 4px 2px rgba(0, 0, 0, 0.3);
  }
`;
