import { loadBuildsApi, addBuildApi } from "./apiHelpers";

export const SELECT_BUILD = "SELECT_BUILD";
export const ADD_BUILD = "ADD_BUILDS";
export const LOAD_BUILDS = "LOAD_BUILDS";
export const CLEAR_BUILD = "CLEAR_BUILD";
export const LOAD_BUILD_SUCCESS = "LOAD_BUILD_SUCCESS";
export const LOAD_BUILD_ERROR = "LOAD_BUILD_ERROR";

export const selectBuildAction = payload => ({
  type: SELECT_BUILD,
  payload
});

export const addBuildAction = data => {
  return async dispatch => {
    return addBuildApi(data)
      .then(message => {
        return Promise.resolve(message);
      })
      .catch(error => {
        return Promise.reject(error);
      });
  };
};

export const loadBuildsAsyncAction = testPlanId => {
  return async dispatch => {
    dispatch(loadingBuilds());
    return loadBuildsApi(testPlanId)
      .then(builds => {
        setTimeout(() => dispatch(loadBuildsSuccess(builds)), 1000);
      })
      .catch(error => console.log("Catch error at loadBuildsAsyncAction ", error));
  };
};

export const loadingBuilds = () => {
  return {
    type: LOAD_BUILDS
  };
};

export const loadBuildsSuccess = payload => {
  return {
    type: LOAD_BUILD_SUCCESS,
    payload
  };
};

export const loadBuildsError = payload => {
  return {
    type: LOAD_BUILD_ERROR,
    payload
  };
};

export const clearCurrentBuildsAction = () => {
  return {
    type: CLEAR_BUILD
  };
};
