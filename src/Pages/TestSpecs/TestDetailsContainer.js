import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getTestCaseHelper } from "../../Redux/apiHelpers";
import TestCase from "./TestCase";
import TestSuite from "./TestSuite";

const fetchItemDetails = async (selectedTestItem, setItemDetails) => {
  if (selectedTestItem && (selectedTestItem.node === "File" || selectedTestItem.hasOwnProperty("testcase_id"))) {
    const testCase = await getTestCaseHelper(
      selectedTestItem.testcase_id ? selectedTestItem.testcase_id : selectedTestItem.id
    ).catch(error => console.log("catch error at getTestCase", error));

    if (testCase) {
      testCase.forEach(caseObj => {
        caseObj.node = "File";
        console.log("test case test", caseObj);
        setItemDetails(caseObj);
      });
    }
  } else {
    setItemDetails(selectedTestItem);
  }
};

function TestDetailsContainer() {
  const { isLoading, selectedTestItem } = useSelector(state => ({
    isLoading: state.isProjectLoading,
    selectedTestItem: state.selectedTestItem
  }));

  const [itemDetails, setItemDetails] = useState({});

  useEffect(() => {
    fetchItemDetails(selectedTestItem, setItemDetails);
  }, [selectedTestItem]);

  if (isLoading) {
    return <div style={{ color: "white" }}>{"is loading"}</div>;
  }

  // when user selected a test case from the left navigator
  if (itemDetails && itemDetails.node === "File") {
    return <TestCase testCase={itemDetails} />;
  }

  // when user selected a test suite from the left navigator or when nothing is selected
  if (
    selectedTestItem === [] ||
    selectedTestItem ||
    (itemDetails && itemDetails.node === "Folder") ||
    (selectedTestItem && selectedTestItem.hasOwnProperty("prefix"))
  ) {
    return <TestSuite testSuite={itemDetails} />;
  } else return <div>{console.log("should not go here")}</div>;
}

export default TestDetailsContainer;
