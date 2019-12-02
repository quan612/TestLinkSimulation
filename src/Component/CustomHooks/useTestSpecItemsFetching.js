/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Tree from "../../Utils/Tree";
import { getTestCasesOfTestSuitesHelper, getTestSuitesOfTestProjectApi } from "../../Redux/apiHelpers";

const useTestSpecItemsFetching = (selectedProject, testSuitesCount, testCasesCount) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchTestSpecItems = async () => {
      if (selectedProject) {
        try {
          const testSuites = await getTestSuitesOfTestProjectApi(selectedProject).catch(error =>
            console.log("Catch error at get test suite for project ", error)
          );
          //console.log("testSuites", testSuites);

          const testCasesFromTestSuites = await getTestCasesOfTestSuitesHelper(testSuites).catch(error =>
            console.log("Catch error at get test case for test suite ", error)
          );
          console.log("testCasesFromSuites", testCasesFromTestSuites);

          //put all test suites, and test cases into the list, in order to make a tree structure
          let listOfItems = [...testSuites, ...testCasesFromTestSuites];
          //console.log("listOfItems", listOfItems);

          const itemInTreeStructure = handleItemsInTestSpecsInTreeStructure(listOfItems, selectedProject);
          console.log("itemInTreeStructure", itemInTreeStructure);
          setData(itemInTreeStructure);
        } catch (error) {
          console.log("error", error);
        }
      }
    };
    fetchTestSpecItems();
  }, [selectedProject, testSuitesCount, testCasesCount]);

  return data;
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
