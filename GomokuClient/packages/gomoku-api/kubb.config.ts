import { defineConfig } from "@kubb/core";
import { pluginOas } from "@kubb/plugin-oas";
import { pluginTs } from "@kubb/plugin-ts";
import { pluginReactQuery } from "@kubb/plugin-react-query";

export default defineConfig({
  input: {
    path: "./schema.json",
  },
  output: {
    path: "./client",
    clean: true,
    extension: {
      ".ts": ".ts",
      ".js": ".js",
      ".json": ".json",
    },
  },
  plugins: [
    pluginOas({
      validate: true,
      output: {
        path: "./json",
      },
      serverIndex: 0,
      contentType: "application/json",
    }),
    // pluginOas({
    //   output: {
    //     path: "./api",
    //   },
    //   validate: true,
    // }),
    // pluginTs({
    //   output: {
    //     path: "./models",
    //   },
    //   enumType: "enum",
    //   dateType: "date",
    // }),
    // pluginReactQuery({
    //   output: {
    //     path: "./hooks",
    //   },
    //   client: {
    //     importPath: "../../http",
    //   },
    // }),
  ],
});
