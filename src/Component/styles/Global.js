import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

  @import url('https://fonts.googleapis.com/css?family=Montserrat:400,600&display=swap');;

  *,
  *::after,
  *::before {
    margin: 0px;
    padding: 0px;
    outline: 0; 
    border: 0;
    box-sizing: border-box;
  }

  *:focus {
    outline: 0;
  }
  html, body, #root {
    height: 100%;
  }
  body {
    -webkit-font-smoothing: antialiased;
  }
  body, input, button {
    font: 14px 'Roboto', sans-serif;
  }
  a {
    text-decoration: none;
  }
  ul {
    list-style: none;
  }
  button {
    cursor: pointer;
  }

  .panel-header {
      color: #f4f4f4;
      font-weight: bold;
      font-size: 1em;
      font-family: tahoma, arial, verdana, sans-serif;
      border-color: #99bbe8;
      padding: 7px;
      background-color: #252e37;
      margin: 5px 0 0 0;
      border-radius: 5px;
}

.panel-header-icon {
      float: right;
      margin-left: 5px;  
      color: white;
      font-size: 1.3em;
}

.panel-content {
    text-align: left;
    color: black;
    margin: 5px 0px 10px 0px;
    background: #cde;
    padding: 7px;
    border-style: groove;
    border-width: thin;
    border-radius: 5px;
}
`;

export default GlobalStyles;
