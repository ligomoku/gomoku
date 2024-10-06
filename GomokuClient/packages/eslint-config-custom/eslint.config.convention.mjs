import globals from "globals";
import gomokuEslintConfig from "./index.mjs";

export default [
  ...gomokuEslintConfig,
  {
    files: ["**/*.{ts,tsx}"],
    ignores: ["dist"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      "custom/naming-convention-types-gen": ["error"],
    },
  },
];
