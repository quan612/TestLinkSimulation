import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getTestCaseHelper } from "../../Redux/apiHelpers";

import TestCase from "./TestCase";
import TestSuiteContainer from "./TestSuiteContainer";

import { StyledTestDetail } from "../../Component/styles/StyledTestDetails";

const TestDetailsContainer = () => {
  const [itemDetails, setItemDetails] = useState({});
  const { selectedTestItem } = useSelector(state => ({
    selectedTestItem: state.selectedTestItem
  }));

  useEffect(() => {
    fetchItemDetails(selectedTestItem, setItemDetails);
  }, [selectedTestItem]);

  const renderTestDetails = (selectedTestItem, itemDetails) => {
    if (itemDetails && itemDetails.node === "File") {
      return <TestCase testCase={itemDetails} />;
    }

    if (
      selectedTestItem ||
      (itemDetails && itemDetails.node === "Folder") ||
      (selectedTestItem && selectedTestItem.hasOwnProperty("prefix"))
    ) {
      return <TestSuiteContainer testSuite={itemDetails} />;
    }
  };

  return <StyledTestDetail>{renderTestDetails(selectedTestItem, itemDetails)}</StyledTestDetail>;
};

const fetchItemDetails = async (selectedTestItem, setItemDetails) => {
  if (selectedTestItem && (selectedTestItem.node === "File" || selectedTestItem.hasOwnProperty("testcase_id"))) {
    const testCase = await getTestCaseHelper(
      selectedTestItem.id ? selectedTestItem.id : selectedTestItem.testcase_id
    ).catch(error => console.log("catch error at getTestCase", error));
    if (testCase) {
      testCase.node = "File";
      setItemDetails(testCase);
    }
  } else {
    setItemDetails(selectedTestItem);
  }
};

export default TestDetailsContainer;
