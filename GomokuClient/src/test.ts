// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import "zone.js/testing";
import { getTestBed } from "@angular/core/testing";
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from "@angular/platform-browser-dynamic/testing";

// Prevent Karma from running prematurely.
declare const __karma__: any;
__karma__.loaded = function () {};

// Initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
);

// Find all the test files included by Karma.
const allTestFiles = Object.keys(__karma__.files).filter((file) =>
  file.endsWith(".spec.js"),
);

// Load all test modules.
Promise.all(allTestFiles.map((moduleName) => import(moduleName)))
  .then(() => {
    // Start Karma to run the tests.
    __karma__.start();
  })
  .catch((error) => {
    // If loading any module fails, log the error.
    __karma__.error(error);
  });
