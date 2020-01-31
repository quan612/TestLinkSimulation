import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import Header from "./Component/navbar/Header";

import * as PAGES from "./pages";
import * as ROUTES from "./routes";
import GlobalStyles from "./Component/styles/Global";

const theme = {
  red: "#FF0000",
  black: "#393939",
  grey: "#3A3A3A",
  lightgrey: "#E1E1E1",
  offWhite: "#EDEDED",
  maxWidth: "1000px",
  bs: "0 12px 24px 0 rgba(0, 0, 0, 0.09)",
  grayscale: "#444",
  nav_bg: "-webkit-gradient(linear, center top, center bottom, from(#fff), to(#ccc))",
  nav_bgImg: "linear-gradient(#fff, #ccc)"
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <GlobalStyles />
        <Header />

        <Switch>
          <Route exact path={ROUTES.HOME} component={PAGES.Home} />
          <Route exact path={ROUTES.PROJECTS} render={() => <PAGES.PROJECTS />} />
          <Route exact path={ROUTES.ADD_PROJECT} render={() => <PAGES.ADD_PROJECT />} />
          <Route exact path={ROUTES.SPECIFICATIONS} render={() => <PAGES.TestSpecsContainer />} />

          <Route exact path={ROUTES.PLANS} render={() => <PAGES.PLANS />} />
          <Route exact path={ROUTES.ADD_PLAN} render={() => <PAGES.ADD_PLAN />} />
          <Route exact path={ROUTES.BUILDS} render={() => <PAGES.BuildsContainer />} />

          <Route
            exact
            path={ROUTES.ADD_TESTCASES_TO_TESTPLAN}
            render={() => <PAGES.AddTestCaseToTestPlanContainer />}
          />
          <Route exact path={ROUTES.TEST_EXECUTION} render={() => <PAGES.TestExecution />} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};
export default App;
