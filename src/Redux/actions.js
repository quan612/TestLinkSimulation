import { handleGetAllTestItems, handleGetProjects, getTestSuiteByIdAsync } from "./apiHelpers";

export const isLoading = () => {
  return {
    type: "LOADING"
  };
};

// // test project action

// export const getTestSuitesAndTestCasesOfProjectAction = (testLink, project) => {
//   return async dispatch => {
//     dispatch(fetchSpecsItemsLoading());
//     return handleGetAllTestItems(testLink, project)
//       .then(items => {
//         //console.log(items);
//         dispatch(fetchSpecsItemsSuccess(items));
//       })
//       .catch(error => console.log(error));
//   };
// };

export const fetchSpecsItemsLoading = () => ({
  type: "FETCH_SPECS_ITEMS_LOADING"
});

export const fetchSpecsItemsSuccess = items => ({
  type: "FETCH_SPECS_ITEMS_SUCCESS",
  testSpecsItems: items
});

export const selectTestItemAction = item => ({
  type: "SELECT_TEST_ITEM",
  payload: item
});

/* build actions*/
