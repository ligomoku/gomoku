import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  client: "@hey-api/client-fetch",
  input: "schema.json",
  output: {
    format: "prettier",
    lint: "eslint",
    path: "client",
  },
  plugins: ["@tanstack/react-query"],
  // @ts-ignore
  types: {
    enums: "javascript",
    name: "PascalCase",
    dates: "types+transform",
  },
});
