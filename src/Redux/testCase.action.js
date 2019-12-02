import { addTestCaseToTestPlanApi } from "./apiHelpers";

export const addTestCaseToTestPlanAction = (selectedProject, selectTestPlan, tcExternalId, tc_version) => {
  return async dispatch => {
    return addTestCaseToTestPlanApi(selectedProject, selectTestPlan, tcExternalId, tc_version)
      .then(message => {
        return Promise.resolve(message);
      })
      .catch(error => {
        console.log("catch error at test case action", error);
        return Promise.reject(error);
      });
  };
};
