import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TestCaseDetails from "./TestCaseDetails";
import TestSuiteContainer from "./TestSuiteContainer";
import { Card, CardBody } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddTestSuite from "./AddTestSuite";
import { getTestCaseHelper } from "../../Redux/apiHelpers";
var he = require("he");

function TestDetailsContainer() {
  const { isLoading, selectedTestItem, selectedProject } = useSelector(state => ({
    selectedTestItem: state.selectedTestItem,
    selectedProject: state.selectedProject,
    isLoading: state.isProjectLoading
  }));

  const [testItem, setTestItem] = useState({});
  // const [isAddSuite, setAddSuite] = useState(false);

  useEffect(() => {
    console.log("use effect in details container is updated again");
    if (selectedTestItem && (selectedTestItem.node === "File" || selectedTestItem.hasOwnProperty("testcase_id"))) {
      console.log("use effect to run force update???");

      getTestCaseHelper(selectedTestItem.testcase_id ? selectedTestItem.testcase_id : selectedTestItem.id)
        .then(testcase => {
          testcase.forEach(caseObj => {
            caseObj.node = "File";
            setTestItem(caseObj);
            console.log("new test case item", testItem);
          });
        })
        .catch(error => console.log("catch error at getTestCase", error));
    } else {
      setTestItem(selectedTestItem);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTestItem]);

  if (isLoading) {
    return <div style={{ color: "white" }}>{"is loading"}</div>;
  }

  // when user selected a test case from the left navigator
  if (testItem && testItem.node === "File") {
    return <TestCaseDetails selectedTestCase={testItem} />;
  }

  // when user selected a test suite from the left navigator
  if (
    (testItem && testItem.node === "Folder") ||
    !selectedTestItem ||
    (selectedTestItem && selectedTestItem.hasOwnProperty("prefix"))
  ) {
    return <TestSuiteContainer selectedTestItem={testItem} />;
  } else return <div>{console.log("should not go here")}</div>;
}

export default TestDetailsContainer;
