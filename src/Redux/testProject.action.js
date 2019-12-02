import { loadTestProjectsApi, addTestProjectApi, deleteTestProjectsApi } from "./apiHelpers";

export const SELECT_PROJECT = "SELECT_PROJECT";
export const LOAD_PROJECTS = "LOAD_PROJECT";
export const LOAD_PROJECTS_SUCCESS = "LOAD_PROJECT_SUCCESS";
export const LOAD_PROJECTS_ERROR = "LOAD_PROJECT_ERROR";
export const POST_SUITES_COUNT = "POST_SUITES_COUNT";
export const POST_CASES_COUNT = "POST_CASES_COUNT";

export const selectTestProjectAction = payload => ({
  type: SELECT_PROJECT,
  payload
});

/** return a promise result so that we can run the validation or error handling on Form level */
export const addTestProjectAction = data => {
  return async dispatch => {
    return addTestProjectApi(data)
      .then(message => {
        return Promise.resolve(message);
      })
      .catch(error => {
        return Promise.reject(error);
      });
  };
};

export const loadTestProjectsAction = () => {
  return async dispatch => {
    dispatch(loadingTestProjects());
    return loadTestProjectsApi()
      .then(data => {
        setTimeout(() => {
          dispatch(loadTestProjectsSuccess(data));
        }, 1000);
      })
      .catch(error => console.log(error));
  };
};

export const loadingTestProjects = () => {
  return {
    type: LOAD_PROJECTS
  };
};

export const loadTestProjectsSuccess = payload => {
  return {
    type: LOAD_PROJECTS_SUCCESS,
    payload
  };
};

export const loadTestProjectsError = payload => {
  return {
    type: LOAD_PROJECTS_ERROR,
    payload
  };
};

export const deleteTestProjectAction = project => {
  return async dispatch => {
    return deleteTestProjectsApi(project)
      .then(async () => {
        return Promise.resolve();
      })
      .catch(error => console.log(error));
  };
};

export const postNumberOfTestSuitesAction = payload => {
  return {
    type: POST_SUITES_COUNT,
    payload
  };
};

export const postNumberOfTestCasesAction = payload => {
  return {
    type: POST_CASES_COUNT,
    payload
  };
};
