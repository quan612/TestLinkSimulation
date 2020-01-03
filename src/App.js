import React from "react";
import Header from "./Component/navbar/Header";
import LogRocket from "logrocket";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Home from "./Component/Home/Home";
import TestSpecsContainer from "./Component/TestSpecs/index";
import TestProjectContainer from "./Component/TestProjects/TestProjectContainer";
import TestPlansContainer from "./Component/TestPlans/TestPlansContainer";
import BuildsContainer from "./Component/Builds/BuildsContainer";
import TestExecution from "./Component/TestExecution/";
import AddTestCaseToTestPlanContainer from "./Component/AddTestCasesToTestPlan/AddTestCaseToTestPlanContainer";

import * as ROUTES from "./routes";
LogRocket.init("wivqby/test-link");

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      {/* <hr /> */}
      <Switch>
        <Route exact path={ROUTES.HOME} component={Home} />
        <Route exact path={ROUTES.PROJECTS} render={() => <TestProjectContainer />} />
        <Route exact path={ROUTES.PLANS} render={() => <TestPlansContainer />} />
        <Route exact path={ROUTES.SPECIFICATIONS} render={() => <TestSpecsContainer />} />
        <Route exact path={ROUTES.BUILDS} render={() => <BuildsContainer />} />
        <Route exact path={ROUTES.ADD_TESTCASES_TO_TESTPLAN} render={() => <AddTestCaseToTestPlanContainer />} />
        <Route exact path={ROUTES.TEST_EXECUTION} render={() => <TestExecution />} />
      </Switch>
    </BrowserRouter>
  );
};
export default App;
