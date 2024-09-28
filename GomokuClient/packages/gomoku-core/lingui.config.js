"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config = {
  locales: ["en"],
  catalogs: [
    {
      path: "<rootDir>/src/locales/{locale}",
      include: ["src"],
    },
  ],
};
exports.default = config;
