import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StyledBar } from "./styles";

const getDisplayStyle = element => {
  return element.currentStyle ? element.currentStyle.display : getComputedStyle(element, null).display;
};

const BarIcon = () => {
  const handleToggleMenu = () => {
    let mainNav = document.getElementById("menu");
    console.log(mainNav);
    let mainNavStyle = getDisplayStyle(mainNav);
    console.log("current display", mainNavStyle);
    if (mainNavStyle === "none") mainNav.style.display = "block";
    else mainNav.style.display = "none";
  };

  return (
    <StyledBar id="js-navbar-toggle" onClick={handleToggleMenu}>
      <FontAwesomeIcon icon="bars" color="b" />
    </StyledBar>
  );
};

export default BarIcon;
