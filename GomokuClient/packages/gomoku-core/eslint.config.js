import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
  },
);
