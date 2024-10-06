name: Upload OpenAPI Specification

on:
  push:
    branches:
      - master

jobs:
  upload-openapi-spec:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Upload OpenAPI spec
        uses: hey-api/upload-openapi-spec@v1
        with:
          hey-api-token: ${{ secrets.HEY_API_TOKEN }}
          path-to-openapi: "GomokuClient/packages/gomoku-core/src/api/schema.json"
