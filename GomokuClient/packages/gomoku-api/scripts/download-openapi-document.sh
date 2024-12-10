#!/usr/bin/env sh

set -o errexit

API_VERSION="$(node -e 'console.log(require(`${process.cwd()}/package.json`).apiVersion)')"

if [ "$1" = "localhost" ]; then
  API_URL="http://localhost:62411/swagger/v${API_VERSION}/swagger.json"
  API_URL_YAML="http://localhost:62411/swagger/v${API_VERSION}/swagger.yaml"
elif [ "$1" = "CI" ]; then
  API_URL="http://localhost:8080/swagger/v${API_VERSION}/swagger.json"
  API_URL_YAML="http://localhost:8080/swagger/v${API_VERSION}/swagger.yaml"
else
  API_URL="https://api.gomoku.app/swagger/v${API_VERSION}/swagger.json"
  API_URL_YAML="https://api.gomoku.app/swagger/v${API_VERSION}/swagger.yaml"
fi

curl -o '../gomoku-api/schema.json' "${API_URL}"
curl -o '../gomoku-api/schema.yaml' "${API_URL_YAML}"

#prettier --write schema.json
