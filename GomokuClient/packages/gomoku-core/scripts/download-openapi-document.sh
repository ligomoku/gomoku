#!/usr/bin/env sh

set -o errexit

ls -la
API_VERSION="$(node -p 'require("./package.json").apiVersion')"

# TODO: pass from CLI to use localhost or published API URL
# TODO: align on versioning of the API to follow semver
curl -o 'src/api/schema.json' "https://gomoku-gi8o.onrender.com/swagger/v${API_VERSION}/swagger.json"
#curl -o 'src/api/schema.json' "http://localhost:62411/swagger/v1/swagger.json"

prettier --write src/api/schema.json
