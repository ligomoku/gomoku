import tseslint from "typescript-eslint";
import gomokuEslintConfig from "@gomoku/eslint-config";

export default tseslint.config({
  extends: [...gomokuEslintConfig],
});
