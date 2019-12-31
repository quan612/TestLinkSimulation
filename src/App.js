import React from "react";
import Nav from "./Component/navbar/Nav";
import LogRocket from "logrocket";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Home from "./Component/Home/Home";
import TestSpecsContainer from "./Component/TestSpecs/index";
import TestProjectContainer from "./Component/TestProjects/TestProjectContainer";
import TestPlansContainer from "./Component/TestPlans/TestPlansContainer";
import BuildsContainer from "./Component/Builds/BuildsContainer";
import TestExecution from "./Component/TestExecution/";
import AddTestCaseToTestPlanContainer from "./Component/AddTestCasesToTestPlan/AddTestCaseToTestPlanContainer";

LogRocket.init("wivqby/test-link");

const App = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/TestProjects" render={() => <TestProjectContainer />} />
        <Route exact path="/TestPlans" render={() => <TestPlansContainer />} />
        <Route exact path="/TestSpecs" render={() => <TestSpecsContainer />} />
        <Route exact path="/Builds" render={() => <BuildsContainer />} />
        <Route exact path="/AddCaseToPlan" render={() => <AddTestCaseToTestPlanContainer />} />
        <Route exact path="/TestExecution" render={() => <TestExecution />} />
      </Switch>
    </BrowserRouter>
  );
};
export default App;
