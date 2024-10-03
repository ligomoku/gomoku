import tseslint from "typescript-eslint";
import gomokuEslintConfig from "@gomoku/eslint-config-custom";

export default tseslint.config({
  extends: [...gomokuEslintConfig],
});
