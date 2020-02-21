import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getTestCaseHelper } from "../../Redux/apiHelpers";

import TestCase from "./TestCase";
import TestSuiteContainer from "./TestSuiteContainer";

import { StyledTestDetail } from "../../Component/styles/StyledTestDetails";
import { Card } from "../../Component/styles/BodyStyles";

const TestDetailsContainer = () => {
  const [itemDetails, setItemDetails] = useState({});
  const { selectedTestItem, selectedProject } = useSelector(state => ({
    selectedTestItem: state.selectedTestItem
  }));

  useEffect(() => {
    fetchItemDetails(selectedTestItem, setItemDetails, selectedProject);
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
    const testCase = await getTestCaseHelper(selectedTestItem.id).catch(error =>
      console.log("catch error at getTestCase", error)
    );
    testCase.node = "File";
    setItemDetails(testCase);
  } else {
    setItemDetails(selectedTestItem);
  }
};

export default TestDetailsContainer;
