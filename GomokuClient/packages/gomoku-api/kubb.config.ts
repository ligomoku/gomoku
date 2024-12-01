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

//TODO: on migrating v3 kubb
// pluginReactQuery({
//   output: {
//     path: './hooks',
//   },
//   client: {
//     importPath: '../../http',
//     dataReturnType: 'data',
//   },
//   paramsType: 'object',
//   pathParamsType: 'object',
//   query: {
//     methods: ['get'],
//     importPath: '@tanstack/react-query',
//   },
//   mutation: {
//     methods: ['post', 'put', 'delete'],
//     importPath: '@tanstack/react-query',
//   },
// }),
