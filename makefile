DOTNET_PROJECT = GomokuAPI/GomokuAPI.sln
CLIENT_DIR = GomokuClient

.PHONY: all dev server client clean

all: dev

dev: server client

server:
	@echo "Starting C# server..."
	@cd GomokuAPI && dotnet run

client:
	@echo "Starting Node.js client..."
	@cd $(CLIENT_DIR) && yarn install && yarn start

clean:
	@echo "Cleaning build artifacts..."
	@cd GomokuAPI && dotnet clean
	@cd $(CLIENT_DIR) && yarn clean
