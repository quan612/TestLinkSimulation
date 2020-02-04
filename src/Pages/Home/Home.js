import React, { useState } from "react";
import { Container, Card } from "../../Component/styles/BodyStyles";
import { getTestLinkVersion } from "../../Redux/apiHelpers";

const Home = () => {
  const [testLinkVersion, setTestLinkVersion] = useState("");

  React.useEffect(() => {
    getTestLinkVersion().then(result => {
      setTestLinkVersion(result);
    });
  }, []);

  return (
    <Container className="h-75">
      <Card className=" h-100">
        <label>{testLinkVersion && <h4>{`TestLink Clone Version ${testLinkVersion}`}</h4>}</label>
        <div>
          <div className="mt-2 col-12">
            <dl className="row">
              <dt className="col-sm-3">Projects:</dt>
              <dd className="col-sm-9">List current projects. User can add / remove project.</dd>
              <dt className="col-sm-3 text-truncate">Plans:</dt>
              <dd className="col-sm-9">
                List of current test plans belong to selected project. User can add a new test plan.
              </dd>
              <dt className="col-sm-3">Specifications:</dt>
              <dd className="col-sm-9">
                List of test suites and test cases of selected project. User can add new test suites and new test cases.
              </dd>
              <dt className="col-sm-3">Builds:</dt>
              <dd className="col-sm-9">List of current builds of selected test plan.</dd>
              <dt className="col-sm-3">Add Case to Plan:</dt>
              <dd className="col-sm-9">
                Add test cases to selected test plan. Test cases belong to test plan can be executed with a build.
              </dd>
              <dt className="col-sm-3">Executions:</dt>
              <dd className="col-sm-9">Execute test case of selected test plan and selected build release.</dd>
            </dl>
          </div>
        </div>
      </Card>{" "}
    </Container>
  );
};

export default Home;
