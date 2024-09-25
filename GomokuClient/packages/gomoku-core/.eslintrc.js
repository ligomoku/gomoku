module.exports = {
  extends: ["@gomoku/eslint-config-custom"],
  rules: {
    "no-console": "warn",
    "react-hooks/rules-of-hooks": "error",
  },
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      rules: {
        "@typescript-eslint/no-unused-vars": ["error"],
        "@typescript-eslint/no-explicit-any": "warn",
      },
    },
  ],
};
