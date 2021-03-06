import { SELECT_BUILD, LOAD_BUILDS, LOAD_BUILD_SUCCESS, LOAD_BUILD_ERROR, CLEAR_BUILD } from "./build.action";
import { SELECT_TEST_PLAN, LOAD_TEST_PLANS, LOAD_TEST_PLANS_SUCCESS, LOAD_TEST_PLANS_ERROR } from "./testPlan.action";
import {
  SELECT_PROJECT,
  LOAD_PROJECTS,
  LOAD_PROJECTS_SUCCESS,
  LOAD_PROJECTS_ERROR,
  POST_SUITES_COUNT,
  POST_CASES_COUNT
} from "./testProject.action";

import { SELECT_TEST_ITEM, LOAD_SPEC_ITEMS, LOAD_SPEC_ITEMS_SUCCESS } from "./testSpec.action";

const initialState = {
  authorLogin: "Quan.Huynh",
  error: null,
  isTestPlanLoading: false,
  testProjects: [],
  testPlans: [],
  selectedTestPlan: [],
  buildsOfCurrentTestPlan: [],
  selectedBuild: [],
  selectedTestItem: {}
};

const asyncReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_TEST_ITEM:
      return { ...state, selectedTestItem: action.payload };
    case LOAD_SPEC_ITEMS:
      return { ...state, isSpecsItemLoading: true };
    case LOAD_SPEC_ITEMS_SUCCESS:
      return {
        ...state,
        testSpecsItems: action.testSpecsItems,
        isSpecsItemLoading: false
      };

    case POST_SUITES_COUNT:
      return { ...state, testSuitesCount: action.payload };

    case POST_CASES_COUNT:
      return { ...state, testCasesCount: action.payload };

    case SELECT_PROJECT:
      return {
        ...state,
        selectedProject: action.payload,
        testPlans: [],
        selectedTestPlan: {},
        buildsOfCurrentTestPlan: [],
        selectedBuild: {}
      };

    case LOAD_PROJECTS:
      return { ...state, isProjectLoading: true };

    case LOAD_PROJECTS_SUCCESS:
      return {
        ...state,
        testProjects: action.payload,
        isProjectLoading: false
      };

    case LOAD_PROJECTS_ERROR:
      return {
        ...state,
        isProjectLoading: false,
        error: action.payload
      };

    case SELECT_TEST_PLAN:
      return {
        ...state,
        selectedTestPlan: action.payload
      };

    case LOAD_TEST_PLANS:
      return { ...state, isTestPlanLoading: true };

    case LOAD_TEST_PLANS_SUCCESS:
      return {
        ...state,
        isTestPlanLoading: false,
        testPlans: action.payload
      };

    case LOAD_TEST_PLANS_ERROR:
      return {
        ...state,
        isTestPlanLoading: false,
        error: action.payload
      };

    case SELECT_BUILD:
      return {
        ...state,
        selectedBuild: action.payload
      };

    case LOAD_BUILDS:
      return {
        ...state,
        isLoading: true
      };

    case LOAD_BUILD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        buildsOfCurrentTestPlan: action.payload
      };

    case LOAD_BUILD_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    case CLEAR_BUILD:
      return {
        ...state,
        buildsOfCurrentTestPlan: []
      };

    default:
      return state;
  }
};

export default asyncReducer;
