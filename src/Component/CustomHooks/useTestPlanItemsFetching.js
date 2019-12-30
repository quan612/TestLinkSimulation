/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Tree from "../../Utils/Tree";
import {
  getTestCasesOfTestSuitesHelper,
  getTestCasesForCurrentTestPlanApi,
  getTestSuitesForCurrentTestPlanApi,
  getLastExecutionResultApi
} from "../../Redux/apiHelpers";

const useTestPlanItemsFetching = selectedBuild => {
  const { selectedProject, selectTestPlan } = useSelector(state => ({
    selectedProject: state.selectedProject,
    selectTestPlan: state.selectTestPlan
  }));

  const [dataItems, setDataItems] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTestPlanItems = async () => {
      console.log("current selected build", selectedBuild.name);

      if (selectedProject && selectedProject && selectedBuild) {
        try {
          setIsLoading(true);
          const testSuites = await getTestSuitesForCurrentTestPlanApi(selectTestPlan);
          const testCasesFromSuites = await getTestCasesOfTestSuitesHelper(testSuites);
          const testCasesForTestPlan = await getTestCasesForCurrentTestPlanApi(selectTestPlan);

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
            // console.log("trying to get result for build ", selectedBuild.name + " " + selectedBuild.id);
            let executionResult = await getLastExecutionResultApi(
              selectTestPlan,
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

          console.log("array of case", arrayOfTestCases);
          //put all test suites, and test cases into the list, in order to make a tree structure
          let listOfItems = [...testSuites];
          arrayOfTestCases.map(testCase => (listOfItems = [...listOfItems, testCase]));

          const itemInTreeStructure = handleItemsInTestPlansInTreeStructure(listOfItems, selectedProject);
          console.log("itemInTreeStructure", itemInTreeStructure);
          setDataItems(itemInTreeStructure);
          setIsLoading(false);
        } catch (error) {
          console.log("error", error);
        }
      }
    };
    fetchTestPlanItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBuild]);
  return { isLoading, dataItems };
  //return data;
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
