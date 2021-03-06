/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Tree from "../../Utils/Tree";
import {
  getTestCasesOfTestSuitesHelper,
  getTestCasesForCurrentTestPlanApi,
  getTestSuitesForCurrentTestPlanApi,
  getLastExecutionResultApi
} from "../../Redux/apiHelpers";

const useTestPlanItemsFetching = (selectedProject, selectedTestPlan, selectedBuild, selectedTestItem) => {
  const [dataItems, setDataItems] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTestPlanItems = async () => {
      if (selectedProject && selectedTestPlan && selectedBuild) {
        try {
          setIsLoading(true);
          let testSuites = await getTestSuitesForCurrentTestPlanApi(selectedTestPlan);
          if (!testSuites) {
            const itemInTreeStructure = handleItemsInTestPlansInTreeStructure([], selectedProject);
            setDataItems(itemInTreeStructure);
            setIsLoading(false);
          } else {
            const testCasesFromSuites = await getTestCasesOfTestSuitesHelper(testSuites);
            const testCasesForTestPlan = await getTestCasesForCurrentTestPlanApi(selectedTestPlan);

            //append the parentId of that test case in testSuite object into testPlan object
            let arrayOfTestCases = testCasesForTestPlan.map(casePlan => {
              let result = testCasesFromSuites.filter(caseSuite => {
                return casePlan.tcase_id === caseSuite.id;
              });
              result.map(async testCase => {
                casePlan.node = testCase.node;
                casePlan.id = casePlan.tcase_id;
                casePlan.parent_id = testCase.parent_id;
              });
              return casePlan;
            });

            //append the last execution result into test case object
            for (let testcase of arrayOfTestCases) {
              let executionResult = await getLastExecutionResultApi(
                selectedTestPlan,
                testcase,
                selectedBuild
              ).catch(error => console.log("Catch error at get execution result", error));

              if (executionResult) {
                executionResult.forEach(value => {
                  if (value.id !== -1) {
                    testcase.status = value.status;
                  } else {
                    testcase.status = "not run";
                  }
                });
              }
            }

            //put all test suites, and test cases into the list, in order to make a tree structure
            let listOfItems = [...testSuites];
            arrayOfTestCases.map(testCase => (listOfItems = [...listOfItems, testCase]));

            const itemInTreeStructure = handleItemsInTestPlansInTreeStructure(listOfItems, selectedProject);

            setDataItems(itemInTreeStructure);
            setIsLoading(false);
          }
        } catch (error) {
          console.log("error", error);
        }
      }
    };
    fetchTestPlanItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBuild, selectedTestItem ? selectedTestItem.exec_status : selectedTestItem]);
  return { isLoading, dataItems };
};

export default useTestPlanItemsFetching;

const handleItemsInTestPlansInTreeStructure = (listOfItems, selectedProject) => {
  let tree = new Tree(selectedProject);
  let currentLevelItems = [];

  //handle base item
  for (let item of listOfItems) {
    if (item.parent_id === selectedProject.id) {
      tree.addObjectBasedId(item, selectedProject, tree.traverseBF);
      currentLevelItems = [...currentLevelItems, item];
    }
  }
  listOfItems = listOfItems.filter(x => !currentLevelItems.includes(x));

  while (listOfItems.length > 0) {
    const parent = [...currentLevelItems];
    currentLevelItems = [];

    for (let item of listOfItems) {
      for (let child of parent) {
        if (item.parent_id === child.id) {
          tree.addObjectBasedId(item, child, tree.traverseBF);
          currentLevelItems = [...currentLevelItems, item];
        }
      }
    }

    // eslint-disable-next-line no-loop-func
    listOfItems = listOfItems.filter(x => !currentLevelItems.includes(x));
  }

  return tree._root;
};
