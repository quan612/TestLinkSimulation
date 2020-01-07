import TestLink from "../Library/testlink";

const testLink = new TestLink({
  host: "172.16.77.17", // 192.168.56.101   172.16.77.17  34.67.118.19
  secure: false,
  apiKey: "b87127af250124be10f6f245a03d0473"
  // global b87127af250124be10f6f245a03d0473
  // home   86fd2b13976b8ba4a35d6829a17b592b
  // cloud  2a64c27adb81157b9a5ed576a58c032e
});

const authorLogin = "Quan.Huynh";

export const getTestLinkVersion = async () => {
  return await testLink.testLinkVersion();
  // .then(version => {
  //   return version;
  // })
  // .catch(error => {
  //   console.log(error);
  // });
};

export const getTestSuiteByIdAsync = async item => {
  return await testLink.getTestSuiteByID({ testsuiteid: item.id });
};

export const reportResultApi = async result => {
  // console.log("testcaseid", result.testcase.id);
  // console.log("testplanid", result.testPlan.id);
  // console.log("status", result.status);
  // console.log("buildId", result.build.id);
  // console.log("buildName", result.build.name);
  // console.log("steps", result.testcase.steps);
  if (result.testcase.steps && result.testcase.steps.length > 0)
    result.testcase.steps.forEach(step => {
      step.result = result.status;
      step.notes = "";
    });
  //console.log("stepResult", stepResult);
  return await testLink.reportTCResult({
    testcaseid: result.testcase.testcase_id,
    testplanid: result.testPlan.id,
    status: result.status,
    steps: result.testcase.steps.length > 0 ? result.testcase.steps : [],
    buildid: result.build.id,
    buildname: result.build.name
  });
};

/********************************************************* TEST SUITE HELPER and API ******************************************/

export const addTestSuiteHelper = async (selectedProject, parentSuiteId, data) => {
  if (parentSuiteId === selectedProject.id) {
    // no need parent id for top level suite
    return await testLink.createTestSuite({
      testprojectid: selectedProject.id,
      testsuitename: data.name,
      details: data.details
    });
  } else {
    return await testLink.createTestSuite({
      testprojectid: selectedProject.id,
      testsuitename: data.name,
      details: data.details,
      parentid: parentSuiteId
    });
  }
};

/* 
+get first level suites - result is an array
+get rest of suites based on first level tree - result is an array, each array object contains a list of nested objects or nothing, then recursively go through nested object to find its children.
+append them into an array of objects and return 
 */
export const getTestSuitesOfTestProjectApi = async selectedProject => {
  let result = [];
  const firstLevelSuites = await testLink.getFirstLevelTestSuitesForTestProject({
    testprojectid: selectedProject.id
  });

  firstLevelSuites.forEach(suite => {
    suite.node = "Folder";
    result = [...result, suite];
  });

  await Promise.all(
    firstLevelSuites.map(async suite => {
      let suites = await getTestSuiteRecursively(suite);
      if (suites.length > 0) {
        suites.forEach(suite => {
          suite.node = "Folder";
          result = [...result, suite];
        });
      }
    })
  );
  return result;
};

/*
+ get children of current test suite, the result returned is an object with nested objects or null
+ loop through each object / nested object and recursively get its chilren
+ return the result if there is no child.
*/
export const getTestSuiteRecursively = async testSuite => {
  let result = [];
  let temp = [];

  const childSuites = await testLink.getTestSuitesForTestSuite({
    testsuiteid: testSuite.id
  });

  if (childSuites instanceof Object) {
    // this means that the parent has only 1 child, there is no nested object
    if (childSuites.hasOwnProperty("id")) {
      result = [...result, childSuites];
      temp = await getTestSuiteRecursively(childSuites);
    } else {
      await Promise.all(
        Object.values(childSuites).map(async suite => {
          result = [...result, suite]; //append to result to return, then recursively continue
          temp = await getTestSuiteRecursively(suite);
        })
      );
    }
  }

  if (temp instanceof Object || temp instanceof Array) {
    if (temp.length > 0) {
      temp.forEach(suite => (result = [...result, suite]));
    }
  }

  return result;
};

export const updateTestSuiteHelper = (selectedProject, parentSuiteId, data) => {
  if (data.parent_id === selectedProject.id) {
    // this is the top level top suite, no need to pass in parent id
    return testLink
      .updateTestSuite({
        testprojectid: selectedProject.id,
        prefix: selectedProject.prefix,
        testsuitename: data.name,
        details: data.details
      })
      .then(message => {
        return Promise.resolve(message);
      })
      .catch(error => {
        return Promise.reject(error);
      });
  } else {
    return testLink
      .updateTestSuite({
        testprojectid: selectedProject.id,
        prefix: selectedProject.prefix,
        testsuitename: data.name,
        details: data.details,
        parentid: parentSuiteId
      })
      .then(message => {
        return Promise.resolve(message);
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }
};

/********************************************************* TEST CASES API ******************************************/
export const getTestCasesOfTestProjectHelper = async testProject => {
  const testSuites = await getTestSuitesOfTestProjectApi(testProject);
  const testCasesFromTestSuites = await getTestCasesOfTestSuitesHelper(testSuites);
  return testCasesFromTestSuites;
};

// get all test cases belong to selected test plan
// API returns an object with nested objects
// => converting this object into an array using Object.values
// then for each array item we are going to add to the end array testCases
// also need to filter out the empty array
export const getTestCasesForCurrentTestPlanApi = async testPlan => {
  try {
    let testCases = [];
    const listObj = await testLink.getTestCasesForTestPlan({
      testplanid: testPlan.id
    });

    if (listObj instanceof Object) {
      Object.values(listObj).forEach(arrayOfCases => {
        arrayOfCases.map(array =>
          array.length === 0 ? (testCases = [...testCases]) : (testCases = [...testCases, array])
        );
      });
    }
    return testCases;
  } catch (error) {
    console.log("Catch error at get Test Cases For TestPlan ", error);
  }
};

// temporary keep in case something mess up
// export const getTestCasesForTestPlan = async (testLink, testPlan) => {
//   let result = [];
//   let temp = await getTestCasesForTestPlanApi(testLink, testPlan);
//   //convert to array of objects, instead of object of nested objects with keys and values
//   //if (object instanceof Object) {
//   Object.values(temp).forEach(arrayOfCases => {
//     arrayOfCases.map(array =>
//       // add each test case array into the end result
//       array.length === 0 ? (result = [...result]) : (result = [...result, array])
//     );
//   });
//   //}
//   return result;
// };

export const getTestSuitesForCurrentTestPlanApi = async testPlan => {
  return await testLink.getTestSuitesForTestPlan({ testplanid: testPlan.id });
};

export const getLastExecutionResultApi = async (testPlan, testCase, build) => {
  return await testLink.getLastExecutionResult({
    tplanid: testPlan.id,
    testplanid: testPlan.id,
    testcaseid: testCase.id,
    buildid: build.id,
    buildname: build.name
  });
};

export const getTestCasesOfTestSuitesHelper = async testSuites => {
  let result = [];

  const arrayOfCases = await Promise.all(
    testSuites.map(async suite => {
      return await getTestCasesForCurrentTestSuiteApi(testLink, suite).catch(error =>
        console.log("Catch error at get test case for test suite", error)
      );
    })
  );

  arrayOfCases.map(array =>
    array.length === 0
      ? (result = [...result])
      : array.forEach(testCase => {
          testCase.node = "File";
          result = [...result, testCase];
        })
  );

  return result;
};

export const createTestCaseStepsApi = async (testcase, steps) => {
  return await testLink.createTestCaseSteps({
    testcaseid: testcase.testcase_id,
    action: "create",
    steps: steps
  });
};

export const addTestCaseToTestPlanApi = async (testProject, testPlan, testCaseExternalId, testCaseVersion) => {
  return await testLink.addTestCaseToTestPlan({
    testprojectid: testProject.id,
    testplanid: testPlan.id,
    testcaseexternalid: testProject.prefix + "-" + testCaseExternalId,
    version: parseInt(testCaseVersion)
  });
};

// get all test cases that are direct children of selected test suite
// as well as all descendants of children test suites
export const getTestCasesOfSelectedTestSuiteHelper = async selectedTestSuite => {
  let testSuites = [];
  testSuites = [...testSuites, selectedTestSuite];

  const suiteChildren = await getTestSuiteRecursively(selectedTestSuite);
  if (suiteChildren.length > 0) {
    suiteChildren.forEach(suite => {
      suite.node = "Folder";
      testSuites = [...testSuites, suite];
    });
  }

  const testCasesFromTestSuites = await getTestCasesOfTestSuitesHelper(testSuites).catch(error =>
    console.log("Catch error at get test case for test suite ", error)
  );
  return testCasesFromTestSuites;
};

/**
 * Gets Test Case object based on its id
 *
 * @param {object}  options Options
 * @param {string}  [options.testcaseid] Test Case id. If not present, testcaseexternalid must be present.
 *
 * @returns {object}  result Test Case object.
 */
export const getTestCaseHelper = async testCaseId => {
  console.log("testCaseId", testCaseId);
  return await testLink
    .getTestCase({
      testcaseid: testCaseId
    })
    .catch(error => console.log("Catch error at get test case helper function: ", error));
};

export const addTestCaseHelper = (selectedProject, selectedTestSuite, testCaseData) => {
  return testLink
    .createTestCase({
      testcasename: testCaseData.name,
      testsuiteid: selectedTestSuite.id,
      testprojectid: selectedProject.id,
      authorlogin: authorLogin,
      summary: testCaseData.summary,
      preconditions: testCaseData.preconditions,
      steps: [],
      status: testCaseData.status,
      executiontype: testCaseData.execution_type
    })
    .then(message => {
      console.log("Successfully adding Test Case: ", message);
      return Promise.resolve(message);
    })
    .catch(error => {
      console.log("Catch error at add test case helper: ", error);
      return Promise.reject(error);
    });
};

export const updateTestCaseWithoutStepsUpdateHelper = (selectedProject, testCaseData) => {
  return testLink
    .updateTestCase({
      testcasename: testCaseData.name,
      testcaseexternalid: selectedProject.prefix + "-" + testCaseData.tc_external_id,
      summary: testCaseData.summary,
      preconditions: testCaseData.preconditions,
      status: testCaseData.status,
      executiontype: testCaseData.execution_type,
      version: parseInt(testCaseData.version)
    })
    .then(message => {
      return Promise.resolve(message);
    })
    .catch(error => {
      return Promise.reject(error);
    });
};

/* private api in use for test cases*/
const getTestCasesForCurrentTestSuiteApi = async (testLink, testSuite) => {
  return await testLink.getTestCasesForTestSuite({
    testsuiteid: testSuite.id,
    deep: false,
    details: "full",
    getkeywords: false
  });
};

/********************************************************* BUILD API ******************************************/

export const loadBuildsApi = async selectedTestPlan => {
  return await testLink.getBuildsForTestPlan({ testplanid: selectedTestPlan.id });
};

export const addBuildApi = async (testLink, data) => {
  return await testLink.createBuild({
    testplanid: data.testPlanId,
    buildname: data.name,
    buildnotes: data.description,
    active: data.isActive,
    open: data.isOpen,
    releasedate: data.releaseDate
  });
};

/********************************************************* Test plan API ******************************************/

export const loadTestPlanApi = async selectedProject => {
  return await testLink.getProjectTestPlans({ testprojectid: selectedProject.id });
};

export const addTestPlanApi = async (testplan, selectedProject) => {
  return await testLink.createTestPlan({
    testplanname: testplan.name,
    testprojectname: selectedProject.name,
    notes: testplan.description,
    active: testplan.isActive,
    public: testplan.isPublic
  });
};

export const deleteTestPlanApi = async testPlan => {
  return await testLink.deleteTestPlan({
    tplanID: testPlan.id,
    testplanid: testPlan.id
  });
};

/********************************************************* Test project API ******************************************/

export const addTestProjectApi = async data => {
  return await testLink.createTestProject({
    testprojectname: data.name,
    testcaseprefix: data.prefix,
    notes: data.description,
    options: {
      requirementsEnabled: data.requirement,
      active: data.isActive,
      public: data.isPublic,
      itsname: false //issue tracker name, default as false
    }
  });
};

export const loadTestProjectsApi = async () => {
  return await testLink.getProjects();
};

export const deleteTestProjectsApi = async data => {
  return await testLink.deleteTestProject({ prefix: data.prefix });
};
