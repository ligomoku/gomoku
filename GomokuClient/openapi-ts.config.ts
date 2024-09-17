import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  client: "@hey-api/client-fetch",
  input: "src/api/schema.json",
  output: {
    path: "src/api/client",
    format: "prettier",
    lint: "eslint",
  },
  types: {
    enums: "javascript",
  },
  plugins: ["@tanstack/react-query"],
});
