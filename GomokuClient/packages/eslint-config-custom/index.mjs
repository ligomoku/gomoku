import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import pluginQuery from "@tanstack/eslint-plugin-query";
import pluginRouter from '@tanstack/eslint-plugin-router'

import namingConventionTypesGen from "./rules/naming-convention-types-gen.js";

export default tseslint.config(
  {
    ignores: ["dist", "**/*.gen.ts", "messages.ts"],
  },
  {
    // TODO: extend: "plugin:storybook/recommended"
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "@tanstack/query": pluginQuery,
      "@tanstack/router": pluginRouter,
      custom: {
        rules: {
          "naming-convention-types-gen": namingConventionTypesGen,
          "@tanstack/router/create-route-property-order": "error",
        },
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "@typescript-eslint/ban-ts-comment": "off",
      "react-refresh/only-export-components": [
        "off",
        { allowConstantExport: true },
      ],
    },
  },
);
