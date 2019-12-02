/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Tree from "../../Utils/Tree";
import { getTestSuitesOfTestProjectApi } from "../../Redux/apiHelpers";

const useTestSuitesFetching = selectedProject => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchTestSpecItems = async () => {
      if (selectedProject) {
        try {
          const testSuites = await getTestSuitesOfTestProjectApi(selectedProject).catch(error =>
            console.log("Catch error at get test suite for project ", error)
          );

          const itemInTreeStructure = handleItemsInTreeStructure(testSuites, selectedProject);
          setData(itemInTreeStructure);
        } catch (error) {
          console.log("error", error);
        }
      }
    };
    fetchTestSpecItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProject]);

  return data;
};

export default useTestSuitesFetching;

const handleItemsInTreeStructure = (listOfItems, selectedProject) => {
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
