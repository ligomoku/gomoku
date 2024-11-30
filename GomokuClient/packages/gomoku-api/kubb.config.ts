import { defineConfig } from "@kubb/core";
import createSwagger from "@kubb/swagger";
import createSwaggerTS from "@kubb/swagger-ts";
import createSwaggerTanstackQuery from "@kubb/swagger-tanstack-query";

export default defineConfig({
  input: {
    path: "./schema.json",
  },
  output: {
    path: "./client",
    clean: true,
  },
  plugins: [
    createSwagger({
      output: false,
      validate: true,
    }),
    createSwaggerTS({
      output: {
        path: "./models",
      },
      enumType: "enum",
      dateType: "date",
    }),
    createSwaggerTanstackQuery({
      output: {
        path: "./hooks",
      },
      client: {
        importPath: "../../http",
      },
      queryOptions: {
        mutations: true,
        queries: true,
      },
    }),
  ],
});
