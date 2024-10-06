API_PROJECT = GomokuServer/src/GomokuServer.Api
CLIENT_DIR = GomokuClient

.PHONY: all dev server client clean

all: dev

dev: server client

server:
	@echo "Starting C# server..."
	@cd $(API_PROJECT) && dotnet run --configuration Release

client:
	@echo "Starting Node.js client..."
	@cd $(CLIENT_DIR) && yarn install && yarn dev

format:
	@echo "Formatting C# and Node.js code..."
	yarn format

clean:
	@echo "Cleaning build artifacts..."
	@cd GomokuServer && dotnet clean
	@cd $(CLIENT_DIR) && yarn clean

download:
	@echo "Downloading JSON schema from server..."
	@cd $(CLIENT_DIR) && yarn download

download-localhost:
	@echo "Download JSON schema from localhost..."
	@cd $(CLIENT_DIR) && yarn download:localhost

codegen:
	@echo "Generating API client..."
	@cd $(CLIENT_DIR) && yarn codegen

codegen-sever:
	@echo "Generating hub types..."
	yarn generate-hub-types:server
