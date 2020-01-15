export const isLoading = () => {
  return {
    type: "LOADING"
  };
};

// // test project action
export const selectTestItemAction = item => ({
  type: "SELECT_TEST_ITEM",
  payload: item
});
