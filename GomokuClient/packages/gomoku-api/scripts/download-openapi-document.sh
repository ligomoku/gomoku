#!/usr/bin/env sh

set -o errexit

API_VERSION="$(node -e 'console.log(require(`${process.cwd()}/package.json`).apiVersion)')"

if [ "$1" = "localhost" ]; then
  API_URL="http://localhost:62411/swagger/v${API_VERSION}/swagger.json"
elif [ "$1" = "CI" ]; then
  API_URL="http://localhost:8080/swagger/v${API_VERSION}/swagger.json"
else
  API_URL="https://api.gomoku.app/swagger/v${API_VERSION}/swagger.json"
fi

curl -o '../gomoku-api/schema.json' "${API_URL}"

#prettier --write schema.json
