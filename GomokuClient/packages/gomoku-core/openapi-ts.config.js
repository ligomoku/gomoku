"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var openapi_ts_1 = require("@hey-api/openapi-ts");
exports.default = (0, openapi_ts_1.defineConfig)({
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
    },
});
