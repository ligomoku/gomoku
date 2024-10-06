import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  client: "@hey-api/client-fetch",
  input: "src/api/schema.json",
  output: {
    format: "prettier",
    lint: "eslint",
    path: "src/api/client",
  },
  plugins: ["@tanstack/react-query"],

  types: {
    enums: "javascript",
    dates: "types+transform",
  },
});
