import { defineConfig } from "openapi-react-query";

export default defineConfig({
  schema: "./schema.json",
  output: {
    mode: "split",
    dir: "./client",
  },
  hooks: {
    enabled: true,
  },
  types: {
    outputFile: "./client/types.ts",
  },
});
