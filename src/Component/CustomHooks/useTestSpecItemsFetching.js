/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Tree from "../../Utils/Tree";
import { getTestCasesOfTestSuitesHelper, getTestSuitesOfTestProjectApi } from "../../Redux/apiHelpers";

/*
this hook is used mostly for the left navigator in Test Specifications
the useEffect is run again in case:
+ the project is changed
+ the number of test suite is changed - when a new test suite is added
+ the number of test case is changed - when a new test case is added
+ a test case is updated - when user changes the name of the test case
*/

const useTestSpecItemsFetching = (selectedProject, testSuitesCount, testCasesCount, selectedTestItem) => {
  const [testItems, setTestItems] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTestSpecItems = async () => {
      if (selectedProject) {
        try {
          setIsLoading(true);
          console.log("isLoading", isLoading);
          const testSuites = await getTestSuitesOfTestProjectApi(selectedProject);
          const testCasesFromTestSuites = await getTestCasesOfTestSuitesHelper(testSuites);

          //put all test suites, and test cases into the list, in order to make a tree structure
          let listOfItems = [...testSuites, ...testCasesFromTestSuites];
          const itemInTreeStructure = handleItemsInTestSpecsInTreeStructure(listOfItems, selectedProject);

          setTestItems(itemInTreeStructure);
          setIsLoading(false);
          console.log("isLoading", isLoading);
        } catch (error) {
          console.log("Catch error at fetchTestSpecItems method: ", error);
        }
      }
    };
    fetchTestSpecItems();
    // }, [selectedProject, testSuitesCount, testCasesCount, selectedTestItem]);
  }, [selectedProject, testSuitesCount, testCasesCount]);
  return { isLoading, testItems };
};

export default useTestSpecItemsFetching;

const handleItemsInTestSpecsInTreeStructure = (listOfItems, selectedProject) => {
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
