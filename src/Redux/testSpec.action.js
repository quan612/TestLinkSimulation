export const SELECT_TEST_ITEM = "SELECT_TEST_ITEM";
export const LOAD_SPEC_ITEMS = "LOAD_SPEC_ITEMS";
export const LOAD_SPEC_ITEMS_SUCCESS = "LOAD_SPEC_ITEMS_SUCCESS";

export const isLoading = () => {
  return {
    type: "LOADING"
  };
};

export const selectTestItemAction = item => ({
  type: SELECT_TEST_ITEM,
  payload: item
});
