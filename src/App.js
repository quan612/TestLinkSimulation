import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import Header from "./Component/Navigation/Header/Header";
import * as PAGES from "./pages";
import * as ROUTES from "./routes";
import GlobalStyles from "./Component/styles/Global";
import { Wrapper, HeaderContainer, BodyContainer } from "./styles.js";
import { theme } from "./theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <GlobalStyles />
        <Wrapper>
          <HeaderContainer>
            <Header />
          </HeaderContainer>
          <BodyContainer>
            <Switch>
              <Route exact path={ROUTES.HOME} component={PAGES.Home} />
              <Route exact path={ROUTES.PROJECTS} render={() => <PAGES.PROJECTS />} />
              <Route exact path={ROUTES.ADD_PROJECT} render={() => <PAGES.ADD_PROJECT />} />
              <Route exact path={ROUTES.SPECIFICATIONS} render={() => <PAGES.SPECIFICATIONS />} />
              <Route exact path={ROUTES.PLANS} render={() => <PAGES.PLANS />} />
              <Route exact path={ROUTES.ADD_PLAN} render={() => <PAGES.ADD_PLAN />} />
              <Route exact path={ROUTES.BUILDS} render={() => <PAGES.BUILDS />} />
              <Route exact path={ROUTES.ADD_BUILD} render={() => <PAGES.ADD_BUILD />} />

              <Route
                exact
                path={ROUTES.ADD_TESTCASES_TO_TESTPLAN}
                render={() => <PAGES.AddTestCaseToTestPlanContainer />}
              />
              <Route exact path={ROUTES.TEST_EXECUTION} render={() => <PAGES.TestExecution />} />
            </Switch>
          </BodyContainer>
        </Wrapper>
      </BrowserRouter>
    </ThemeProvider>
  );
};
export default App;
