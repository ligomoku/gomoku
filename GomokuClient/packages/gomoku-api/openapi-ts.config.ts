import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  client: "@hey-api/client-fetch",
  input: {
    path: "schema.json",
    include: ".*",
  },
  output: {
    path: "client",
    format: "prettier",
    lint: "eslint",
  },
  plugins: [
    "@tanstack/react-query",
    {
      name: "@hey-api/typescript",
      enums: "javascript",
      style: "PascalCase",
    },
    {
      name: "@hey-api/transformers",
      dates: true,
    },
  ],
  experimentalParser: true,
});
