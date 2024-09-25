const path = require("path");

module.exports = {
  root: true,
  ignorePatterns: ["dist/", "node_modules/"],
  extends: ["@gomoku/eslint-config-custom"],
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      parserOptions: {
        project: path.resolve(__dirname, "./tsconfig.json"),
      },
    },
  ],
  settings: {
    jest: {
      version: "27.5.1",
    },
  },
};
