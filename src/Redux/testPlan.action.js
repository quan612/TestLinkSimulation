import { loadTestPlanApi, addTestPlanApi, deleteTestPlanApi } from "./apiHelpers";

export const SELECT_TEST_PLAN = "SELECT_PLAN";
export const LOAD_TEST_PLANS = "LOAD_TEST_PLANS";
export const LOAD_TEST_PLANS_SUCCESS = "LOAD_TEST_PLANS_SUCCESS";
export const LOAD_TEST_PLANS_ERROR = "LOAD_TEST_PLANS_ERROR";

export const selectTestPlanAction = payload => ({
  type: SELECT_TEST_PLAN,
  payload
});

export const addTestPlanAction = (testplan, selectedProject) => {
  return async dispatch => {
    return addTestPlanApi(testplan, selectedProject)
      .then(async () => {
        return Promise.resolve();
      })
      .catch(error => {
        return Promise.reject(error);
      });
  };
};

export const loadTestPlansAction = selectedProject => {
  return async dispatch => {
    dispatch(loadingTestPlans());
    return loadTestPlanApi(selectedProject)
      .then(testPlans => {
        // if (testPlans === null) testPlans = [];
        setTimeout(() => {
          dispatch(loadTestPlansSuccess(testPlans));
        }, 2000);
      })
      .catch(error => console.log("Catch error at get test plan action helper." + error));
  };
};

export const loadingTestPlans = () => {
  return {
    type: LOAD_TEST_PLANS
  };
};

export const loadTestPlansSuccess = payload => {
  return {
    type: LOAD_TEST_PLANS_SUCCESS,
    payload
  };
};

export const loadTestPlansError = payload => {
  return {
    type: LOAD_TEST_PLANS_ERROR,
    payload
  };
};

export const deleteTestPlanAction = testPlan => {
  return async dispatch => {
    return deleteTestPlanApi(testPlan)
      .then(async () => {
        return Promise.resolve();
      })
      .catch(error => console.log(error));
  };
};
