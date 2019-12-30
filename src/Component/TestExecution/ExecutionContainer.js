import React, { useState, useEffect } from "react";
import ExecutionDetails from "./ExecutionDetails";
import { Card, CardBody, Container, Row, Col } from "reactstrap";
import { getTestCaseHelper } from "../../Redux/apiHelpers";
var he = require("he");

function ExecutionContainer({ selectedBuild, selectTestPlan, selectedTestItem }) {
  const [testCaseDetails, setTestCaseDetails] = useState(null);

  useEffect(() => {
    const getTestCaseDetails = async () => {
      if (selectedTestItem) {
        getTestCaseHelper(selectedTestItem.tc_id).then(data => {
          data.forEach(tcase => {
            console.log("Test", tcase);
            setTestCaseDetails(tcase);
          });
        });

        // const data = await getTestCaseHelper(selectedTestItem.tc_id);
        // console.log("Test", await data);
      }
    };

    getTestCaseDetails();
  }, [selectedTestItem]);

  if (selectedTestItem && selectedTestItem.node === "File" && testCaseDetails) {
    return <ExecutionDetails testItemResult={selectedTestItem} testItemDetails={testCaseDetails} />;
  }
  //default page to load current test plan details
  else
    return (
      <>
        <h1>{"Execute Test"}</h1>
        <Card className="section h-100">
          <CardBody>
            <div className="panel-header">{`Test plan: ${selectTestPlan.name} `}</div>
            <div className="panel-content" dangerouslySetInnerHTML={{ __html: he.decode(selectTestPlan.notes) }}></div>
            <div className="panel-header">{`Build info: ${selectedBuild.name} `}</div>
            <div className="panel-content" dangerouslySetInnerHTML={{ __html: he.decode(selectedBuild.notes) }}></div>
          </CardBody>
        </Card>
      </>
    );
}

export default ExecutionContainer;
