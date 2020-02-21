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
    background: url('img/black_thread.png');
    font-family: 'Droid Sans', sans-serif;
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

  button, a,  svg {
    cursor: pointer;
  }

  .custom-control-label::before {
    top: 0 !important;
  }

  .custom-control-label::after {
    top: 0.1rem !important;
  }

  /* .panel-title{
    color: black;
      font-weight: bold;
      font-size: 1.2em;
      font-family: tahoma, arial, verdana, sans-serif;
      padding: 7px;
      margin: 2px;
  } */


  /* .panel-header {
      color: #f4f4f4;
      font-weight: bold;
      font-size: 1em;
      font-family: tahoma, arial, verdana, sans-serif;
      border-color: #99bbe8;
      padding: 7px;
      margin: 2px;
      background-color: #252e37;      
      border-radius: 5px;
  }  */
  
  /* .panel-header-icon {
       
  }
   */
  /* .panel-content {
      text-align: left;
      /* color: black; */
      /* padding: 7px;
      margin: 2px; */
      /* background: transparent;       */
      /* background-image: linear-gradient(to right, #d3d3d3 , #9e9e9e);
      border-style: groove;
      border-width: thin;
      border-radius: 5px; }*/
  

  dl,
  dt {
    color: black;
  }

table {
        border-collapse: collapse;
    }

th, td {
  border: 0!important;
}

label {
  margin: 0 !important;
}

@keyframes spin720 {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

select { 
  max-width: 200px;
  max-height: 20vh;
  text-align: left;
  overflow-y: auto;
}

select:focus {
  border-color:white!important;
}

select option {
  color: white;
  background-color: #252e37;
  border-color:white;
}

hr{
  margin-top:4px;
  margin-bottom:4px;
}

/* #style-7::-webkit-scrollbar { */
  ::-webkit-scrollbar {
  height: 12px;
  width: 10px;
  /* background-color: #f5f5f5; */
}

/** STYLE 7 */
::-webkit-scrollbar-track { 
  background-color: transparent; 
  border-radius: 10px;   
}

::-webkit-scrollbar-corner {
  background-color: transparent;
}

::-webkit-scrollbar-thumb:vertical {
  border-radius: 10px; 
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	background-color: #555;
}

::-webkit-scrollbar-thumb:horizontal {
  border-radius: 10px; 
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	background-color: #555;
}

`;

export default GlobalStyles;
